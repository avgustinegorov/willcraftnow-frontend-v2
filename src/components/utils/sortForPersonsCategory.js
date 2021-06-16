export const sortForPersonsCategory = (orderData, personsCategoryNameArray) => {
  if (!orderData) {
    return null
  }
  const sortedPersonsDict = {}
  personsCategoryNameArray.forEach(personCategoryName => {
    sortedPersonsDict[personCategoryName] = orderData.persons.filter(el => {
      return el.entity_roles.includes(personCategoryName)
    })
  })
  return sortedPersonsDict
}
