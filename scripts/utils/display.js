const displayMessage = (message, querySelectorTarget, withLink = true, customClass = 'error-message') => {
  const target = document.querySelector(querySelectorTarget)
  let sectionMessage = document.createElement('section')
  sectionMessage.classList.add(customClass)

  sectionMessage.innerHTML = `<span>${message}</span>`
  if (withLink) {
    let link = document.createElement('a')
    link.href = './index.html'
    link.textContent = "Retour à l'accueil"
    sectionMessage.appendChild(link)
  }
  target.appendChild(sectionMessage)
}

const showLoader = () => {
  const loader = document.querySelector('.loader-ctn')
  loader.classList.remove('hidden')
}

const hideLoader = () => {
  const loader = document.querySelector('.loader-ctn')
  loader.classList.add('hidden')
}
