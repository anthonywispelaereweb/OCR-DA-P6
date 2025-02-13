import { getPhotographersAndMediaById } from './../utils/api.js'
import { hideLoader, displayMessage } from './../utils/display.js'
import { descriptionPhotographerTemplate } from './../templates/descriptionPhotographer.js'
// Get info of current photographer by Id
const getDescriptionPhotographer = async id => await getPhotographersAndMediaById('./data/photographers.json', id)

const initFocusFilter = e => {
  if (e.code === 'Enter') e.target.click()
}

const initSortEvent = async infoGlobal => {
  const selector = document.querySelector('.dropdownMenu-header-select'),
    panel = document.querySelector('.dropdownMenu-panel'),
    dropdownHeader = document.querySelector('.dropdownMenu-header'),
    options = document.querySelectorAll('.dropdownMenu-panel-option')

  // Add event to update the selection
  selector.addEventListener('click', e => {
    e.preventDefault()
    panel.classList.toggle('open')
    dropdownHeader.classList.toggle('open')
    if (panel.getAttribute('aria-expanded') === 'true') {
      panel.setAttribute('aria-expanded', false)
    } else {
      panel.setAttribute('aria-expanded', true)
    }
    // Fix width of panel
    panel.style.width = `${dropdownHeader.getBoundingClientRect().width}px`

    // Add event option to set new filter
    options.forEach(option => {
      option.addEventListener('click', e => {
        e.preventDefault()
        let sortByValue = e.target.getAttribute('data-value')
        // update selector
        selector.querySelector('span').textContent = e.target.textContent
        // update aria-selected
        let currentSelectedOption = panel.querySelector('[aria-selected="true"]')
        currentSelectedOption.setAttribute('aria-selected', false)
        e.target.setAttribute('aria-selected', true)
        // update aria-expanded
        panel.setAttribute('aria-expanded', false)
        dropdownHeader.classList.remove('open')
        panel.classList.remove('open')

        const newSortedMadias = sortMedias(infoGlobal, sortByValue)
        updateMedias(newSortedMadias)
      })
    })

    panel.addEventListener('keydown', e => {
      if (e.code === 'Tab' || e.code === 'Enter') initFocusFilter(e)
    })
  })
}

const updateMedias = medias => {
  const mediaSection = document.querySelector('.photograph-galery')
  mediaSection.innerHTML = ''
  const newPhotographerDesriptionModel = descriptionPhotographerTemplate(medias)
  const newMediaCardDOM = newPhotographerDesriptionModel.getMediaPhotographerCardDom()
  mediaSection.appendChild(newMediaCardDOM)
}

const displayDataDescription = (photographerInfo) => {
  const photographersHeader = document.querySelector('.photograph-header')
  const mediaSection = document.querySelector('.photograph-galery')

  const photographerDesriptionModel = descriptionPhotographerTemplate(photographerInfo)
  if (!photographerDesriptionModel) {
    displayMessage('Aucun photographe trouvé', '#main')
    return
  }
  const userDescriptionCardDOM = photographerDesriptionModel.getDescriptionPhotographerCardDOM()
  const mediaCardDOM = photographerDesriptionModel.getMediaPhotographerCardDom()
  const counter = photographerDesriptionModel.getCounterMediaCardDom()
  photographersHeader.appendChild(userDescriptionCardDOM)
  mediaSection.appendChild(mediaCardDOM)
  document.body.appendChild(counter)
  mediaSection.firstChild.focus()

  photographerDesriptionModel.initEventLightBox(photographerInfo)
  initSortEvent(photographerInfo)
}

const sortMedias = (infos, sortedBy = 'likes') => {
  return {
    ...infos,
    medias: infos.medias.sort((a, b) => (a[sortedBy] > b[sortedBy] ? 1 : -1))
  }
}

const init = async () => {
  // Get photograph id
  const idPhotographer = new URLSearchParams(window.location.search).get('id')
  const globalInfo = await getDescriptionPhotographer(idPhotographer)
  if (globalInfo) {
    const sortedMadias = sortMedias(globalInfo)
    displayDataDescription(sortedMadias)

    hideLoader()
    // Add focus on first article
    const firstArticles = document.querySelector('.galery .galery-item-link')
    if (firstArticles) firstArticles.focus()
  } else {
    console.log('🚀 ~ init error ~ globalInfo:', globalInfo)
  }
}

init()
