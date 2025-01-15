//Mettre le code JavaScript lié à la page photographer.html
const getDescriptionPhotographer = async (id)=> await getPhotographersAndMediaById('./data/photographers.json', id)

const displayDataDescription = async photographerInfo => {
  const photographersHeader = document.querySelector('.photograph-header')
  const mediaSection = document.querySelector('.photograph-galery')

  const photographerDesriptionModel = descriptionPhotographerTemplate(photographerInfo)
  const userCardDOM = photographerDesriptionModel.getDescriptionPhotographerCardDOM()
  const mediaCardDOM = photographerDesriptionModel.getMediaPhotographerCardDom()
  const counter = photographerDesriptionModel.getCounterMediaCardDom()
  photographersHeader.appendChild(userCardDOM)
  mediaSection.appendChild(mediaCardDOM)
  document.body.appendChild(counter)
  mediaSection.firstChild.focus()     
}

const init = async () => {
  // Récupère l'id du photographe
  const idPhotographer = new URLSearchParams(window.location.search).get('id')
  const globalInfo = await getDescriptionPhotographer(idPhotographer)
  displayDataDescription(globalInfo)
}

init()
