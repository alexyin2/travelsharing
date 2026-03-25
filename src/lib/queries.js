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
