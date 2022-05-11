export function baseItemFilter(items, filterOpt, pagination) {
  let newData = items
  let filteredData = []
  let newPagination = pagination
  let filter = ''

  if (filterOpt.search) {
    filter = filterOpt.search.toLowerCase()
    filteredData = newData.filter((item) => {
      return item.name.toLowerCase().includes(filter)
    })
    newData = filteredData
  }
  if (filterOpt.rarity) {
    filter = filterOpt.rarity.toLowerCase()
    filteredData = newData.filter((item) => {
      return item.rarity.name.toLowerCase() == filter
    })
    newData = filteredData
  }
  if (filterOpt.element) {
    filter = filterOpt.element.toLowerCase()
    filteredData = newData.filter((item) => {
      return item.element.name.toLowerCase() == filter
    })
    newData = filteredData
  }
  if (filterOpt.weaponType) {
    filter = filterOpt.weaponType.toLowerCase()
    filteredData = newData.filter((item) => {
      return item.weaponType.name.toLowerCase() == filter
    })
    newData = filteredData
  }
  if (filterOpt.style) {
    filter = filterOpt.style.toLowerCase()
    filteredData = newData.filter((item) => {
      return item.style.name.toLowerCase() == filter
    })
    newData = filteredData
  }
  if (filterOpt.race) {
    filter = filterOpt.race.toLowerCase()
    filteredData = newData.filter((item) => {
      return item.race.some((race) => {
        return race.name.toLowerCase() == filter
      })
    })
    newData = filteredData
  }

  if (!pagination.pageChanged) {
    newPagination.pageNumber = 0
    newPagination.pageMax = Math.ceil(newData.length / pagination.pageElements)
  }
  let initIndex =
    newPagination.pageNumber == 0
      ? 0
      : newPagination.pageNumber * newPagination.pageElements + 1
  let finalIndex = initIndex + newPagination.pageElements
  newPagination.pageChanged = false

  filteredData = newData.slice(initIndex, finalIndex)

  return [filteredData, newPagination]
}

export function inventoryItemFilter(items, filterOpt, pagination) {
  return items
}
