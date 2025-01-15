const changeSlide = (medias, list, direction = 'previous') => {
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

const initLightbox = (indexElt, medias, pictureBase) => {
  const lightbox = document.querySelector('.lightbox')
  const list = lightbox.querySelector('.container-slides')
  list.innerHTML = ''
  medias.forEach(elt => {
    if (elt.image) {
      const img = document.createElement('img')
      img.dataset.id = elt.id
      img.dataset.photographer = elt.photographerId
      img.src = `${pictureBase}${elt.image}`
      img.alt = elt.title
      img.classList.add('hidden')
      img.setAttribute('aria-hidden', true)

      list.appendChild(img)
    } else {
      const video = document.createElement('video')
      video.setAttribute('src', `${pictureBase}${elt.video}`)
      video.setAttribute('alt', elt.title)
      video.setAttribute('autoplay', true)
      video.setAttribute('controls', elt.title)
      video.setAttribute('aria-hidden', true)
      video.setAttribute('loop', true)

      video.classList.add('hidden')
      video.dataset.id = elt.id
      video.dataset.photographer = elt.photographerId
      list.appendChild(video)
    }
  })
  const previous = lightbox.querySelector('.left')
  previous.focus()
  const next = lightbox.querySelector('.right')
  const close = lightbox.querySelector('.close-lightbox-media')
  const mediaTitleHTML = lightbox.querySelector('.titre-media-lightbox')
  let current = medias[indexElt].id
  mediaTitleHTML.textContent = medias[indexElt].title
  let currentMedia = list.querySelector(`[data-id="${current}"]`)
  currentMedia.classList.remove('hidden')
  currentMedia.classList.add('active')
  currentMedia.setAttribute('aria-hidden', false)

  previous.addEventListener('click', () => {
    changeSlide(medias, list)
  })

  lightbox.addEventListener("keydown", (e) => { 
    switch (e.code) {
      case "ArrowLeft":
      case "ArrowDown":
        changeSlide(medias, list)
        break;
      case "ArrowRight":
      case "ArrowUp"  :
        changeSlide(medias, list, 'next')
        break;
      case "Escape":
        lightbox.classList.add('hidden')
        list.innerHTML = ''
        break;
      default:
        break;
    }
  })
  next.addEventListener('click', () => {
    changeSlide(medias, list, 'next')
  })
  close.addEventListener('click', () => {
    lightbox.classList.add('hidden')
    list.innerHTML = ''
  })

}
