function mediaTemplate(data, name, indexElt, medias) {
  const { image, likes, date, id, photographerId } = data

  function getMediaCardDOM() {
    const card = document.createElement('article')
    card.classList.add('galery-item')
    card.dataset.id = id
    card.dataset.photographer = photographerId

    const linkButton = document.createElement('a')
    linkButton.classList.add('galery-item-link')
    linkButton.role ="button"
    linkButton.setAttribute('title', data.title)

    if (image) {
      const img = document.createElement('img')
      img.alt = `${name} - ${data.title}`
      img.src = `/assets/images/${name}/${image}`
      img.classList.add('galery-item-img')
      linkButton.appendChild(img)
    }
    if (data.video) {
      const video = document.createElement('video')
      video.src = `/assets/images/${name}/${data.video}`
      video.alt = `${name} - ${data.title}`
      video.classList.add('galery-item-img')
      linkButton.appendChild(video)
    }
    linkButton.addEventListener('click', () => {
      console.log("🚀 ~ getMediaCardDOM ~ data:", data)
      console.log("🚀 ~ getMediaCardDOM ~ indexElt:", indexElt)
      console.log("🚀 ~ getMediaCardDOM ~ medias:", medias)
      console.log("🚀 ~ getMediaCardDOM ~ mediasIdx:", medias[indexElt])
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
      likesContainer.dataset.likes = likesContainer.dataset.likes === 'true' ? 'false' : 'true'
      likesIcon.classList = likesContainer.dataset.likes === 'true' ? 'fas fa-heart' : 'far fa-heart'
      if (likesContainer.dataset.likes === 'true') {
        likesNumber.textContent = parseInt(likesNumber.textContent) + 1
      } else {
        likesNumber.textContent = parseInt(likesNumber.textContent) - 1
      }   
    })

    card.appendChild(linkButton)
    cardFooter.appendChild(title)
    cardFooter.appendChild(likesContainer)
    card.appendChild(cardFooter)

    return card
  }

  return { getMediaCardDOM }
}
