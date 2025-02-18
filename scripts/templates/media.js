import { initLightbox, initFocusLightbox } from './../templates/lightbox.js'

function mediaTemplate(data, name, indexElt, medias) {
  const getMediaCardDOM = () => {
    const { image, likes, id, photographerId, video } = data
    const card = document.createElement('article')
    card.classList.add('galery-item')
    card.dataset.id = id
    card.dataset.photographer = photographerId

    const linkButton = document.createElement('a')
    linkButton.classList.add('galery-item-link')
    linkButton.role = 'button'
    linkButton.title = data.title
    linkButton.ariaLabel = data.title
    const pictureBase = `./assets/images/${name}/`

    const supportMedia = document.createElement(image ? 'img' : 'video')
    supportMedia.src = `${pictureBase}${image ?? video}`
    supportMedia.alt = `${name} - ${data.title}`
    supportMedia.classList.add('galery-item-img')
    linkButton.appendChild(supportMedia)
    linkButton.setAttribute('tabindex', 0)

    linkButton.addEventListener('click', () => {
      const lightbox = document.querySelector('.lightbox')
      lightbox.classList.toggle('hidden')
      initLightbox(indexElt, medias, pictureBase)
      lightbox.addEventListener('keydown', e => {
        if (e.code === 'Tab') initFocusLightbox(e)
      })
    })
    linkButton.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        const lightbox = document.querySelector('.lightbox')
        lightbox.classList.toggle('hidden')
        initLightbox(indexElt, medias, pictureBase)
      }
    })

    const cardFooter = document.createElement('div')

    const title = document.createElement('h3')
    cardFooter.classList.add('galery-item-footer')
    title.classList.add('galery-item-title')
    title.textContent = data.title

    const likesContainer = document.createElement('div')
    likesContainer.classList.add('galery-item-likes')
    likesContainer.setAttribute('tabindex', 0)

    likesContainer.dataset.likes = false
    const likesIcon = document.createElement('i')
    let localSessionLikes = JSON.parse(localStorage.getItem('likes')) ?? []
    let isExist = localSessionLikes.find(el => el?.name === name && el?.id.includes(id))
    likesContainer.dataset.likes = isExist ? 'true' : 'false'
    likesContainer.dataset.likes === 'false' ? likesIcon.classList.add('far', 'fa-heart') : likesIcon.classList.add('fas', 'fa-heart')

    likesIcon.setAttribute('aria-label', 'likes')
    const likesNumber = document.createElement('span')
    likesNumber.textContent = !isExist ? likes : likes + 1
    likesContainer.appendChild(likesNumber)
    likesContainer.appendChild(likesIcon)
    const managerLike = () => {
      const globalLikesCounter = document.querySelector('.counter-likes')
      likesContainer.dataset.likes = likesContainer.dataset.likes === 'true' ? 'false' : 'true'
      likesIcon.classList = likesContainer.dataset.likes === 'true' ? 'fas fa-heart' : 'far fa-heart'
      // Get liked items
      let localSessionLikes = JSON.parse(localStorage.getItem('likes')) ?? []
      if (likesContainer.dataset.likes === 'true') {
        globalLikesCounter.textContent = parseInt(globalLikesCounter.textContent) + 1
        likesNumber.textContent = parseInt(likesNumber.textContent) + 1
        // Update liked items by autor
        localSessionLikes.find(el => el.name === name)
          ? localSessionLikes.find(el => el.name === name).id.push(id)
          : localSessionLikes.push({ name, id: [id] })
        localStorage.setItem('likes', JSON.stringify(localSessionLikes))
      } else {
        globalLikesCounter.textContent = parseInt(globalLikesCounter.textContent) - 1
        likesNumber.textContent = parseInt(likesNumber.textContent) - 1
        let isExist = localSessionLikes.find(el => el.name === name && el.id.includes(id))
        if (isExist) {
          localSessionLikes.map(el => {
            if (el.name === name) el.id.splice(el.id.indexOf(id), 1)
          })
        }
        localStorage.setItem('likes', JSON.stringify(localSessionLikes))
      }
    }
    likesContainer.addEventListener('click', () => {
      managerLike()
    })
    likesContainer.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        managerLike()
      }
    })

    card.appendChild(linkButton)
    cardFooter.appendChild(title)
    cardFooter.appendChild(likesContainer)
    card.appendChild(cardFooter)

    return card
  }

  const getCounterLikes = (price, name) => {
    const likes = medias.reduce((acc, media) => acc + media.likes, 0)
    const counter = document.createElement('div')
    counter.classList.add('counter-ctn')
    let localSessionLikes = JSON.parse(localStorage.getItem('likes')) ?? []
    let isExist = localSessionLikes.find(el => el.name === name)
    let countLocalSessionLikes = isExist?.id.length ?? 0
    counter.innerHTML = `<div>
      <span class="counter-likes">${likes + countLocalSessionLikes}</span> 
      <i class="fas fa-heart"></i>
     </div>
     <span>${price}€/jour`
    return counter
  }

  return { getMediaCardDOM, getCounterLikes }
}

export { mediaTemplate }