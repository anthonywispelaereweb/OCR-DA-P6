const urlApi = 'https://restapi.fr/api/OCR-test-tonio-fisheye'
// Add the max value for the birthdate input
const formatedDateDay = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${year}-${month}-${day}`
}
export { urlApi, formatedDateDay }