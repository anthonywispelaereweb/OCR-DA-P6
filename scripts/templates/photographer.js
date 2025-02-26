function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const article = document.createElement('article')
    article.setAttribute('tabindex', 0)
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.alt = `Eouvres de ${name}`
    const namePhotographer = document.createElement('h2')
    namePhotographer.textContent = name
    const adressP = document.createElement('p')
    adressP.classList.add('adress')
    adressP.textContent = `${city}, ${country}`
    const taglineP = document.createElement('p')
    taglineP.textContent = tagline
    taglineP.classList.add('tagline')
    const priceP = document.createElement('p')
    priceP.textContent = `${price}€/jour`
    priceP.classList.add('price')
    article.appendChild(img)
    article.appendChild(namePhotographer)
    article.appendChild(adressP)
    article.appendChild(taglineP)
    article.appendChild(priceP)
    article.addEventListener('click', () => {
      window.location.href = `photographer.html?id=${data.id}`
    })
    article.addEventListener('keydown', (e) => {
      if(e.code === 'Enter') {
        window.location.href = `photographer.html?id=${data.id}`
      }
    })
    return article
  }
  return { name, picture, getUserCardDOM }
}

export { photographerTemplate }