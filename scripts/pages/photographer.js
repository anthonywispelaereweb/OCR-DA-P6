//Mettre le code JavaScript lié à la page photographer.html

// Get info of current photographer by Id
const getDescriptionPhotographer = async id => await getPhotographersAndMediaById('./data/photographers.json', id)

const initSortEvent = async (infoGlobal) => {
  const selector = document.querySelector('.dropdownMenu-header-select')
  const panel = document.querySelector('.dropdownMenu-panel')
  const dropdownHeader = document.querySelector('.dropdownMenu-header')
  const options = document.querySelectorAll('.dropdownMenu-panel-option')
  
  // Add event to update the selection
  selector.addEventListener('click', e => {
    e.preventDefault()
    panel.classList.toggle('open')
    dropdownHeader.classList.toggle('open')
    if (panel.getAttribute('aria-expanded') === 'true') {
      panel.setAttribute('aria-expanded', false)
    } else {
      panel.setAttribute('aria-expanded', true)
    }
    // Fix width of panel
    panel.style.width = `${dropdownHeader.getBoundingClientRect().width}px`

    // Add event option to set new filter
    options.forEach(option => {
      option.addEventListener('click', e => {
        e.preventDefault()
        let sortByValue = e.target.getAttribute('data-value')
        selector.querySelector('span').textContent = e.target.textContent
        panel.setAttribute('aria-expanded', false)
        dropdownHeader.classList.remove('open')
        panel.classList.remove('open')

        const newSortedMadias = sortMedias(infoGlobal, sortByValue)
        updateMedias(newSortedMadias)
      })
    })
  })
}

const updateMedias = medias => {
  const mediaSection = document.querySelector('.photograph-galery')
  mediaSection.innerHTML = ''
  const newPhotographerDesriptionModel = descriptionPhotographerTemplate(medias)
  const newMediaCardDOM = newPhotographerDesriptionModel.getMediaPhotographerCardDom()
  mediaSection.appendChild(newMediaCardDOM)
}

const displayDataDescription = (photographerInfo, idUser) => {
  const photographersHeader = document.querySelector('.photograph-header')
  const mediaSection = document.querySelector('.photograph-galery')

  const photographerDesriptionModel = descriptionPhotographerTemplate(photographerInfo)
  if (!photographerDesriptionModel) {
    displayMessage('Aucun photographe trouvé', '#main')
    return
  } 
  const userDescriptionCardDOM = photographerDesriptionModel.getDescriptionPhotographerCardDOM()
  const mediaCardDOM = photographerDesriptionModel.getMediaPhotographerCardDom()
  const counter = photographerDesriptionModel.getCounterMediaCardDom()
  photographersHeader.appendChild(userDescriptionCardDOM)
  mediaSection.appendChild(mediaCardDOM)
  document.body.appendChild(counter)
  mediaSection.firstChild.focus()

  photographerDesriptionModel.initEventLightBox(photographerInfo)
  initSortEvent(photographerInfo)
}

const sortMedias = (infos, sortedBy = 'likes') => {
  return {
    ...infos,
    medias: infos.medias.sort((a, b) => (a[sortedBy] > b[sortedBy] ? 1 : -1))
  }
}

const init = async () => {
  // Get photograph id
  const idPhotographer = new URLSearchParams(window.location.search).get('id')
  const globalInfo = await getDescriptionPhotographer(idPhotographer)
  if(globalInfo) {
    const sortedMadias = sortMedias(globalInfo)
    await displayDataDescription(sortedMadias, idPhotographer)

    hideLoader()
  } else {
    console.log("🚀 ~ init error ~ globalInfo:", globalInfo)
  }
}

init()
