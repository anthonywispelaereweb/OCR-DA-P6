async function getPhotographers() {
  let photographers = await  getData('./data/photographers.json')
  return {
    photographers: [ ...photographers.photographers ]
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach(photographer => {
    const photographerModel = photographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)

  setTimeout(() => {
    hideLoader()
  }, 2000)
}

init()
