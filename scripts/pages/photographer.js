//Mettre le code JavaScript lié à la page photographer.html
const getDescriptionPhotographer = async id => await getPhotographersAndMediaById('./data/photographers.json', id)

const changeSlide = async (infosP, list, direction = 'previous') => {
  const medias = infosP.medias
  const lightbox = document.querySelector('.lightbox')
  const mediaTitleHTML = lightbox.querySelector('.titre-media-lightbox')
  let currentMediaHTMLElement = list.querySelector(`.active`)
  let currentMediaHTMLElementId = currentMediaHTMLElement.getAttribute('data-id')
  let currentActiveSlide = medias.find(el => el.id === parseInt(currentMediaHTMLElementId))
  let indexElt = medias.indexOf(currentActiveSlide)
  currentMediaHTMLElement.classList.remove('active')
  currentMediaHTMLElement.classList.add('hidden')
  let newSlideId = null
  if (indexElt === 0 && direction === 'previous') {
    indexElt = medias.length - 1
    newSlideId = medias[indexElt].id
  } else if (indexElt !== 0 && direction === 'previous') {
    indexElt--
    newSlideId = medias[indexElt].id
  } else if (indexElt === medias.length - 1 && direction !== 'previous') {
    indexElt = 0
    newSlideId = medias[indexElt].id
  } else {
    indexElt++
    newSlideId = medias[indexElt].id
  }

  let newSlide = list.querySelector(`[data-id="${newSlideId}"]`)
  mediaTitleHTML.textContent = medias[indexElt].title
  newSlide.classList.remove('hidden')
  newSlide.classList.add('active')
  if (newSlide.tagName === 'VIDEO') {
    newSlide.play()
  }
}

const initSortEvent = async (infoGlobal, idPhotographer) => {
  const selector = document.querySelector('.dropdownMenu-header-select')
  const panel = document.querySelector('.dropdownMenu-panel')
  const dropdownHeader = document.querySelector('.dropdownMenu-header')
  const options = document.querySelectorAll('.dropdownMenu-panel-option')

  selector.addEventListener('click', e => {
    panel.classList.toggle('open')
    dropdownHeader.classList.toggle('open')
    if (panel.getAttribute('aria-expanded') === 'true') {
      panel.setAttribute('aria-expanded', false)
    } else {
      panel.setAttribute('aria-expanded', true)
    }

    panel.style.width = `${dropdownHeader.getBoundingClientRect().width}px`
    options.forEach(option => {
      option.addEventListener('click', e => {
        let sortByValue = e.target.getAttribute('data-value')
        selector.querySelector('span').textContent = e.target.textContent
        panel.setAttribute('aria-expanded', false)
        dropdownHeader.classList.remove('open')
        panel.classList.remove('open')

        const newSortedMadias = sortMediasBy(infoGlobal, sortByValue)
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

const initEventLightBox = (infosP, idP) => {
  const lightbox = document.querySelector('.lightbox')

  const previous = lightbox.querySelector('.left')
  const next = lightbox.querySelector('.right')
  const list = lightbox.querySelector('.container-slides')
  const close = lightbox.querySelector('.close-lightbox-media')

  previous.addEventListener('click', () => {
    changeSlide(infosP, list)
  })
  next.addEventListener('click', () => {
    changeSlide(infosP, list, 'next')
  })
  close.addEventListener('click', () => {
    lightbox.classList.add('hidden')
    list.innerHTML = ''
  })

  const switchEvent = (infosP, e) => {
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowDown':
        changeSlide(infosP, list)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        changeSlide(infosP, list, 'next')
        break
      case 'Escape':
        lightbox.classList.add('hidden')
        list.innerHTML = ''
        break
      default:
        break
    }
  }
  lightbox.addEventListener('keydown', e => {
    switchEvent(infosP, e)
  })
}

const displayDataDescription = (photographerInfo, idUser) => {
  const photographersHeader = document.querySelector('.photograph-header')
  const mediaSection = document.querySelector('.photograph-galery')

  const photographerDesriptionModel = descriptionPhotographerTemplate(photographerInfo)
  const userDescriptionCardDOM = photographerDesriptionModel.getDescriptionPhotographerCardDOM()
  const mediaCardDOM = photographerDesriptionModel.getMediaPhotographerCardDom()
  const counter = photographerDesriptionModel.getCounterMediaCardDom()
  photographersHeader.appendChild(userDescriptionCardDOM)
  mediaSection.appendChild(mediaCardDOM)
  document.body.appendChild(counter)
  mediaSection.firstChild.focus()

  initEventLightBox(photographerInfo, idUser)
  initSortEvent(photographerInfo, idUser)
}

const sortMediasBy = (infos, sortedBy = 'likes') => {
  return {
    ...infos,
    medias: infos.medias.sort((a, b) => (a[sortedBy] > b[sortedBy] ? 1 : -1))
  }
}

const init = async () => {
  // Récupère l'id du photographe
  const idPhotographer = new URLSearchParams(window.location.search).get('id')
  const globalInfo = await getDescriptionPhotographer(idPhotographer)
  const sortedMadias = sortMediasBy(globalInfo)

  await displayDataDescription(sortedMadias, idPhotographer)
}

init()
