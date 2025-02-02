let lightboxElt = null
const initLightbox = (indexElt, medias, pictureBase) => {
  const lightbox = document.querySelector('.lightbox')
  const list = lightbox.querySelector('.container-slides')
  list.innerHTML = ''
  lightboxElt = lightbox
  medias.forEach(elt => {
    const supportMediaLigthbox = document.createElement( elt.image ? 'img' : 'video')
    supportMediaLigthbox.dataset.id = elt.id
    supportMediaLigthbox.dataset.photographer = elt.photographerId
    supportMediaLigthbox.src = `${pictureBase}${elt.image ? elt.image : elt.video}`
    if(elt.video) supportMediaLigthbox.setAttribute('autoplay', true)
    supportMediaLigthbox.alt = elt.title
    supportMediaLigthbox.classList.add('hidden')
    supportMediaLigthbox.setAttribute('aria-hidden', true)
    supportMediaLigthbox.setAttribute('tabindex', -1)
    list.appendChild(supportMediaLigthbox)
  })
  const previous = lightbox.querySelector('.left')
  previous.focus()
  const mediaTitleHTML = lightbox.querySelector('.titre-media-lightbox')
  let current = medias[indexElt].id
  mediaTitleHTML.textContent = medias[indexElt].title
  let currentMedia = list.querySelector(`[data-id="${current}"]`)
  currentMedia.classList.remove('hidden')
  currentMedia.classList.add('active')
  currentMedia.setAttribute('tabindex', 0)
  currentMedia.setAttribute('aria-hidden', false)
}
let focusableSelectorLightbox = 'button'
let focusablesLightbox = []
const initFocusLightbox = (e) => {
  
  focusablesLightbox = Array.from(lightboxElt.querySelectorAll(focusableSelectorLightbox))
  let index = focusablesLightbox.findIndex(f => f === lightboxElt.querySelector(':focus'))
  if(e.shiftKey) index--
  else index++
  
  if (index >= focusablesLightbox.length) index = 0
  if (index > 0) index = focusablesLightbox.length -1
  focusablesLightbox[index].focus()
}