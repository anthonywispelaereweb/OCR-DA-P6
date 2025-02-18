import { postData } from './api.js'
import { displayMessage } from './display.js'
import { urlApi, formatedDateDay } from "./../config.js"

let modalElement = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []

const displayModal = () => {
  const modal = document.querySelector('.contact_modal')
  const dialogBox = modal.querySelector('dialog')
  focusables = Array.from(modal.querySelectorAll(focusableSelector))
  dialogBox.setAttribute('aria-hidden', false)
  dialogBox.setAttribute('aria-modal', true)
  const namePhotographerModal = document.querySelector('#namePhotographer')
  const namePhotographer = document.querySelector('.div-left h1').textContent
  dialogBox.setAttribute('aria-labelledBy', 'namePhotographer')
  namePhotographerModal.innerHTML = namePhotographer
  modal.classList.remove('hidden')
  modal.classList.add('active')
  modalElement = modal
  // Add focus in first input in form
  let firstInputFocus = document.querySelector('#contact input')
  if (firstInputFocus) firstInputFocus.focus()
}

const closeModal = () => {
  const modal = document.querySelector('.contact_modal')
  const dialogBox = modal.querySelector('dialog')
  dialogBox.setAttribute('aria-hidden', true)
  dialogBox.setAttribute('aria-modal', false)
  modal.classList.add('hidden')
  modal.classList.remove('active')
  form.reset()
  modalElement = null

  // Add focus on first article
  const firstArticles = document.querySelector('.galery .galery-item-link')
  if (firstArticles) firstArticles.focus()
}

const form = document.querySelector('#contact')
const formSend = document.querySelector('.contact_button')
const closeBtn = document.querySelector('#closeModal')
closeBtn.addEventListener('click', closeModal)

form.addEventListener('keydown', e => {
  if (e.code === 'Escape') closeModal()
  if (e.code === 'Tab' && modalElement !== null) focusModal(e)
})

const focusModal = e => {
  e.preventDefault()
  let index = focusables.findIndex(f => f === modalElement.querySelector(':focus'))
  if (e.shiftKey) index--
  else index++

  if (index >= focusables.length) index = 0
  if (index < 0) index = focusables.length - 1
  focusables[index].focus()
}

const isValidInput = (name, value) => {
  let isValid = false
  switch (name) {
    case 'email':
      // https://regexr.com/8autj
      isValid = String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

      break
    case 'first-name':
    case 'last-name':
    case 'message':
      isValid = value.length >= 2
      break

    default:
      break
  }
  return isValid
}

const displayErrorForm = (name, error) => {
  if (error) {
    let itemError = document.querySelector(`.${name}-error`)
    itemError.classList.add('show')
  } else {
    let itemError = document.querySelector(`.${name}-error`)
    itemError.classList.remove('show')
  }
}

formSend.addEventListener('click', async e => {
  e.preventDefault()
  const values = form.querySelectorAll('[aria-required="true"]')
  let formData = new FormData()
  let countValues = 0
  values.forEach(val => {
    let valid = isValidInput(val.name, val.value)
    if (valid) {
      displayErrorForm(val.name, false)
      formData.append(val.name, val.value)
      countValues++
    } else {
      displayErrorForm(val.name, true)
    }
  })
  if (values.length === countValues) {
    let sended = await postData()
    if (sended) {
      displayMessage(`<p>Message envoyé avec succès. Consultable <a href="${urlApi}-${formatedDateDay()}">ici</a></p>`, '#contact', false, 'success-message')
      form.reset()
      setTimeout(() => {
        closeModal()
        document.querySelector('.success-message').classList.add('hidden')
      }, 10000)
    }
  } else {
    console.log('error')
  }
})
export { displayModal, closeModal, focusModal }