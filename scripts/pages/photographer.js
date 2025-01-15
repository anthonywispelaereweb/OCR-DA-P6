//Mettre le code JavaScript lié à la page photographer.html
async function getDescriptionPhotographer(id) {
  let infoPhotographer = await getPhotographersAndMediaById('./data/photographers.json', id)
  return infoPhotographer
}

async function displayDataDescription(photographerInfo) {
  const photographersHeader = document.querySelector('.photograph-header')
  const mediaSection = document.querySelector('.photograph-galery')

  const photographerDesriptionModel = descriptionPhotographerTemplate(photographerInfo)
  const userCardDOM = photographerDesriptionModel.getDescriptionPhotographerCardDOM()
  const mediaCardDOM = photographerDesriptionModel.getMediaPhotographerCardDom()
    
  photographersHeader.appendChild(userCardDOM)
  mediaSection.appendChild(mediaCardDOM)
}

async function init() {
  // Récupère l'id du photographe
  const idPhotographer = new URLSearchParams(window.location.search).get('id')
  const globalInfo = await getDescriptionPhotographer(idPhotographer)
  displayDataDescription(globalInfo)
}

init()
