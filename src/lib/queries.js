// 取得所有景點，同時展開 region reference
export const ALL_ATTRACTIONS_QUERY = `
  *[_type == "attraction"] | order(nameEn asc) {
    _id,
    nameZh,
    nameEn,
    "slug": slug.current,
    "region": region->{
      _id,
      nameZh,
      nameEn,
      "slug": slug.current,
      country
    },
    subRegion,
    type,
    tags,
    coordinates,
    address,
    descriptionZh,
    descriptionEn,
    suggestedDuration,
    bestTimeOfDay,
    difficulty,
    feeNote,
    openingHours,
    bookingNote,
    winterNoteZh,
    winterNoteEn,
    auroraSuitable,
    lightPollution,
    insiderTipZh,
    insiderTipEn,
    "cardImageUrl": cardImage.asset->url
  }
`

// 取得所有地區
export const ALL_REGIONS_QUERY = `
  *[_type == "region"] | order(nameEn asc) {
    _id,
    nameZh,
    nameEn,
    "slug": slug.current,
    country
  }
`

// 取得所有交通路線
export const ALL_ROUTES_QUERY = `
  *[_type == "transportRoute"] | order(from asc) {
    _id,
    from,
    to,
    method,
    duration,
    distance,
    route,
    noteZh,
    noteEn
  }
`

// 取得指定國家的所有行程
export const ITINERARIES_BY_COUNTRY_QUERY = `
  *[_type == "itinerary" && country == $country] | order(durationDays asc) {
    _id,
    titleZh,
    titleEn,
    "slug": slug.current,
    descriptionZh,
    descriptionEn,
    country,
    purpose,
    transportMode,
    pace,
    budget,
    seasons,
    arrivalTime,
    departureTime,
    durationDays,
    featured,
    "coverImageUrl": coverImage.asset->url,
    days[] {
      dayNumber,
      titleZh,
      titleEn,
      summaryZh,
      summaryEn,
      stops[] {
        time,
        "attraction": attraction->{
          _id, nameZh, nameEn, type,
          "cardImageUrl": cardImage.asset->url,
          "region": region->{ nameZh, nameEn, "slug": slug.current }
        },
        labelZh,
        labelEn,
        noteZh,
        noteEn,
        durationMinutes,
        photoTipZh,
        photoTipEn,
        mealAdviceZh,
        mealAdviceEn,
        hotelAdviceZh,
        hotelAdviceEn,
        personalAdviceZh,
        personalAdviceEn
      }
    }
  }
`

// 取得精選行程（首頁用）
export const FEATURED_ITINERARIES_QUERY = `
  *[_type == "itinerary" && featured == true] | order(country asc) [0...4] {
    _id,
    titleZh,
    titleEn,
    "slug": slug.current,
    descriptionZh,
    descriptionEn,
    country,
    durationDays,
    purpose,
    "coverImageUrl": coverImage.asset->url,
    "stopCount": count(days[].stops[])
  }
`
