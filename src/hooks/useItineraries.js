import { useState, useEffect, useMemo } from "react";
import { sanityClient } from "../lib/sanityClient";
import { ITINERARIES_BY_COUNTRY_QUERY, FEATURED_ITINERARIES_QUERY } from "../lib/queries";
import { getMockItinerariesByCountry, MOCK_FEATURED_ITINERARIES } from "../lib/mockItineraries";
import { shouldUseMockData } from "../lib/mockMode";

function scoreItinerary(itinerary, filters) {
  let score = 0;
  if (filters.purpose && itinerary.purpose === filters.purpose) score += 3;
  if (filters.transport && itinerary.transportMode === filters.transport) score += 2;
  if (filters.pace && itinerary.pace === filters.pace) score += 2;
  if (filters.budget && itinerary.budget === filters.budget) score += 1;
  if (filters.season && itinerary.seasons?.includes(filters.season)) score += 2;
  if (filters.arrivalTime && itinerary.arrivalTime === filters.arrivalTime) score += 1;
  if (filters.departureTime && itinerary.departureTime === filters.departureTime) score += 1;
  if (filters.duration) {
    const days = itinerary.durationDays;
    if (days >= filters.duration.min && days <= filters.duration.max) score += 2;
  }
  return score;
}

function matchesFilters(itinerary, filters) {
  if (filters.purpose && itinerary.purpose !== filters.purpose) return false;
  if (filters.transport && itinerary.transportMode !== filters.transport) return false;
  if (filters.pace && itinerary.pace !== filters.pace) return false;
  if (filters.budget && itinerary.budget !== filters.budget) return false;
  if (filters.season && !itinerary.seasons?.includes(filters.season)) return false;
  if (filters.arrivalTime && itinerary.arrivalTime !== filters.arrivalTime) return false;
  if (filters.departureTime && itinerary.departureTime !== filters.departureTime) return false;
  if (filters.duration) {
    const days = itinerary.durationDays;
    if (days < filters.duration.min || days > filters.duration.max) return false;
  }
  return true;
}

export function useItineraries(country) {
  const [allItineraries, setAllItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) {
      setAllItineraries([]);
      return;
    }

    if (shouldUseMockData()) {
      setAllItineraries(getMockItinerariesByCountry(country));
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetchItineraries() {
      try {
        setLoading(true);
        setError(null);
        const data = await sanityClient.fetch(ITINERARIES_BY_COUNTRY_QUERY, { country });
        if (!cancelled) {
          setAllItineraries(data.length > 0 ? data : getMockItinerariesByCountry(country));
        }
      } catch (err) {
        console.error("Failed to fetch itineraries:", err);
        if (!cancelled) {
          setAllItineraries(getMockItinerariesByCountry(country));
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchItineraries();
    return () => { cancelled = true; };
  }, [country]);

  return { allItineraries, loading, error };
}

export function useFilteredItineraries(allItineraries, filters) {
  const hasAnyFilter = Object.values(filters).some((v) => v != null);

  const matched = useMemo(() => {
    if (!hasAnyFilter) return allItineraries;
    return allItineraries.filter((it) => matchesFilters(it, filters));
  }, [allItineraries, filters, hasAnyFilter]);

  const bestMatch = useMemo(() => {
    if (matched.length === 0) return null;
    if (!hasAnyFilter) return matched[0];
    return [...matched].sort((a, b) => scoreItinerary(b, filters) - scoreItinerary(a, filters))[0];
  }, [matched, filters, hasAnyFilter]);

  return { matched, bestMatch };
}

export function useFeaturedItineraries() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shouldUseMockData()) {
      setFeatured(MOCK_FEATURED_ITINERARIES);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchFeatured() {
      try {
        const data = await sanityClient.fetch(FEATURED_ITINERARIES_QUERY);
        if (!cancelled) setFeatured(data.length > 0 ? data : MOCK_FEATURED_ITINERARIES);
      } catch (err) {
        console.error("Failed to fetch featured itineraries:", err);
        if (!cancelled) setFeatured(MOCK_FEATURED_ITINERARIES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFeatured();
    return () => { cancelled = true; };
  }, []);

  return { featured, loading };
}
