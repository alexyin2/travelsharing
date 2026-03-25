import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanityClient'
import { ALL_ATTRACTIONS_QUERY, ALL_REGIONS_QUERY } from '../lib/queries'

export function useSanityData() {
  const [attractions, setAttractions] = useState([])
  const [regions, setRegions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const [attractionsData, regionsData] = await Promise.all([
          sanityClient.fetch(ALL_ATTRACTIONS_QUERY),
          sanityClient.fetch(ALL_REGIONS_QUERY),
        ])

        setAttractions(attractionsData)
        setRegions(regionsData)
      } catch (err) {
        console.error('Failed to fetch data from Sanity:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { attractions, regions, loading, error }
}
