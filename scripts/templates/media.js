function mediaTemplate(data, name, indexElt, medias) {
  

  const getMediaCardDOM = () => {
    const { image, likes, id, photographerId, video } = data
    const card = document.createElement('article')
    card.classList.add('galery-item')
    card.dataset.id = id
    card.dataset.photographer = photographerId

    const linkButton = document.createElement('a')
    linkButton.classList.add('galery-item-link')
    linkButton.role ="button"
    linkButton.title = data.title
    linkButton.ariaLabel = data.title
    linkButton.setAttribute('tabindex',   1)     
    const pictureBase = `./assets/images/${name}/`

    if (image) {
      const img = document.createElement('img')
      img.alt = `${name} - ${data.title}`
      img.src = `${pictureBase}${image}`
      img.classList.add('galery-item-img')
      linkButton.appendChild(img)
    }
    if (video) {
      const videoElt = document.createElement('video')
      videoElt.src = `${pictureBase}${video}`
      videoElt.alt = `${name} - ${data.title}`
      videoElt.classList.add('galery-item-img')
      linkButton.appendChild(videoElt)
    }
    linkButton.addEventListener('click', () => {
      const lightbox = document.querySelector('.lightbox')
      lightbox.classList.toggle('hidden')
      initLightbox(indexElt, medias, pictureBase)
    })

    const cardFooter = document.createElement('div')

    const title = document.createElement('h3')
    cardFooter.classList.add('galery-item-footer')
    title.classList.add('galery-item-title')
    title.textContent = data.title

    const likesContainer = document.createElement('div')
    likesContainer.classList.add('galery-item-likes')
    likesContainer.dataset.likes = false
    const likesIcon = document.createElement('i')
    likesIcon.classList.add('far', 'fa-heart')
    likesIcon.setAttribute('aria-label', 'likes')
    const likesNumber = document.createElement('span')
    likesNumber.textContent = likes
    likesContainer.appendChild(likesNumber)
    likesContainer.appendChild(likesIcon)
    likesContainer.addEventListener('click', () => {
      const globalLikesCounter = document.querySelector('.counter-likes')
      likesContainer.dataset.likes = likesContainer.dataset.likes === 'true' ? 'false' : 'true'
      likesIcon.classList = likesContainer.dataset.likes === 'true' ? 'fas fa-heart' : 'far fa-heart'
      if (likesContainer.dataset.likes === 'true') {
        globalLikesCounter.textContent = parseInt(globalLikesCounter.textContent) + 1
        likesNumber.textContent = parseInt(likesNumber.textContent) + 1
      } else {
        globalLikesCounter.textContent = parseInt(globalLikesCounter.textContent) - 1
        likesNumber.textContent = parseInt(likesNumber.textContent) - 1
      }   
    })

    card.appendChild(linkButton)
    cardFooter.appendChild(title)
    cardFooter.appendChild(likesContainer)
    card.appendChild(cardFooter)

    return card
  }

  const getCounterLikes = (price) => {
    const likes = medias.reduce((acc, media) => acc + media.likes, 0)
    const counter = document.createElement('div')
    counter.classList.add('counter-ctn')
    counter.innerHTML = `<div>
      <span class="counter-likes">${likes}</span> 
      <i class="fas fa-heart"></i>
     </div>
     <span>${price}€/jour` 
    return counter
  }
  

  return { getMediaCardDOM, getCounterLikes }
}
