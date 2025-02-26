import { getData } from './../utils/api.js'
import { hideLoader } from './../utils/display.js'
import { photographerTemplate } from './../templates/photographer.js'

async function getPhotographers() {
  let photographers = await getData('./data/photographers.json')
  return {
    photographers: [...photographers.photographers]
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach(photographer => {
    const photographerModel = photographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
  let firstArticle = photographersSection.querySelector('article')
  firstArticle.focus()
}

async function init() {
  // Get all photographers
  const { photographers } = await getPhotographers()
  displayData(photographers)
  // loading simulation
  setTimeout(() => {
    hideLoader()
  }, 2000)
}

init()
