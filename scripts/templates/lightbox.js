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
  const mediaTitleHTML = lightbox.querySelector('.titre-media-lightbox')
  let current = medias[indexElt].id
  mediaTitleHTML.textContent = medias[indexElt].title
  let currentMedia = list.querySelector(`[data-id="${current}"]`)
  currentMedia.classList.remove('hidden')
  currentMedia.classList.add('active')
  currentMedia.setAttribute('aria-hidden', false)
}
