function descriptionPhotographerTemplate(data) {
  console.log("🚀 ~ descriptionPhotographerTemplate ~ data:", data)
  const { name, portrait, city, country, tagline } = data.photographer
  const { medias } = data
  console.log("🚀 ~ descriptionPhotographerTemplate ~ medias:", medias)

  const picture = `assets/photographers/${portrait}`

  function getDescriptionPhotographerCardDOM() {
    const globalSection = document.createElement('section')

    const divLeft = document.createElement('div')
    divLeft.classList.add('div-left')
    const namePhotographer = document.createElement('h2')
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

  function getMediaPhotographerCardDom() {
    const mediaSection = document.createElement('section')
    mediaSection.classList.add('galery')
    
    medias.forEach((media, idx) => {
      const mediaModel = mediaTemplate(media, name, idx, medias)
      const mediaCardDOM = mediaModel.getMediaCardDOM()
      mediaSection.appendChild(mediaCardDOM)
    })
    return mediaSection
  }
  return { getDescriptionPhotographerCardDOM, getMediaPhotographerCardDom }
}
