import { mediaTemplate } from "./media.js"
import { displayModal } from './../utils/contactForm.js'
const descriptionPhotographerTemplate = data => {
  if (!data.photographer) return
  const { name, portrait, city, country, tagline, price } = data.photographer
  const { medias } = data

  const picture = `assets/photographers/${portrait}`

  const getDescriptionPhotographerCardDOM = () => {
    const globalSection = document.createElement('section')

    const divLeft = document.createElement('div')
    divLeft.classList.add('div-left')
    const namePhotographer = document.createElement('h1')
    namePhotographer.textContent = name

    const adressP = document.createElement('p')
    adressP.classList.add('adress')
    adressP.textContent = `${city}, ${country}`
    const taglineP = document.createElement('p')
    taglineP.textContent = tagline
    taglineP.classList.add('tagline')
    divLeft.appendChild(namePhotographer)
    divLeft.appendChild(adressP)
    divLeft.appendChild(taglineP)

    globalSection.appendChild(divLeft)

    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)

    const contactButton = document.createElement('button')
    globalSection.classList.add('global-section')
    contactButton.classList.add('contact_button')
    contactButton.textContent = 'Contactez-moi'
    contactButton.addEventListener('click', () => {
      displayModal()
    })
    globalSection.appendChild(contactButton)

    const divRight = document.createElement('div')
    divRight.classList.add('div-right')
    divRight.appendChild(img)
    globalSection.appendChild(divRight)

    return globalSection
  }

  const getMediaPhotographerCardDom = () => {
    const mediaSection = document.createElement('section')
    mediaSection.classList.add('galery')

    medias.forEach((media, idx) => {
      const mediaModel = mediaTemplate(media, name, idx, medias)
      const mediaCardDOM = mediaModel.getMediaCardDOM()
      mediaSection.appendChild(mediaCardDOM)
    })

    return mediaSection
  }

  const changeSlide = async (medias, direction = 'previous') => {
    let newSlideId = null
    const lightbox = document.querySelector('.lightbox')
    const list = lightbox.querySelector('.container-slides')
    const mediaTitleHTML = lightbox.querySelector('.titre-media-lightbox')
    let currentMediaHTMLElement = list.querySelector(`.active`)
    let currentMediaHTMLElementId = currentMediaHTMLElement.getAttribute('data-id')
    let currentActiveSlide = medias.find(el => el.id === parseInt(currentMediaHTMLElementId))
    let indexElt = medias.indexOf(currentActiveSlide)
    currentMediaHTMLElement.classList.remove('active')
    currentMediaHTMLElement.classList.add('hidden')
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

  const switchEvent = (infosP, e) => {
    const lightbox = document.querySelector('.lightbox'),
      list = lightbox.querySelector('.container-slides')
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowDown':
        changeSlide(infosP)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        changeSlide(infosP, 'next')
        break
      case 'Escape':
        lightbox.classList.add('hidden')
        list.innerHTML = ''
        // Add focus on first article
        if (document.querySelector('.galery .galery-item-link')) document.querySelector('.galery .galery-item-link').focus()
        break
      default:
        break
    }
  }

  const initEventLightBox = infosP => {
    const lightbox = document.querySelector('.lightbox'),
      previous = lightbox.querySelector('.left'),
      next = lightbox.querySelector('.right'),
      list = lightbox.querySelector('.container-slides'),
      close = lightbox.querySelector('.close-lightbox-media')

    previous.addEventListener('click', () => {
      changeSlide(infosP.medias)
    })

    next.addEventListener('click', () => {
      changeSlide(infosP.medias, 'next')
    })

    close.addEventListener('click', () => {
      lightbox.classList.add('hidden')
      list.innerHTML = ''
      // Add focus on first article
      const firstArticles = document.querySelector('.galery .galery-item-link')
      if (firstArticles) firstArticles.focus()
    })

    lightbox.addEventListener('keydown', e => {
      switchEvent(infosP.medias, e)
    })
  }
  const getCounterMediaCardDom = () => {
    const counterSection = document.createElement('section')
    counterSection.classList.add('counter-ctn')
    const mediaCounterModel = mediaTemplate(null, null, null, medias)
    const counterMedia = mediaCounterModel.getCounterLikes(price, name)
    counterSection.appendChild(counterMedia)
    return counterSection
  }

  return { getDescriptionPhotographerCardDOM, getMediaPhotographerCardDom, getCounterMediaCardDom, initEventLightBox }
}

export { descriptionPhotographerTemplate }