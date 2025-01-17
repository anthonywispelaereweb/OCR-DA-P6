const displayModal = () => {
  const modal = document.querySelector('.contact_modal')
  const namePhotographerModal = document.querySelector('.name-photographer')
  const namePhotographer = document.querySelector('.div-left h2').textContent
  namePhotographerModal.innerHTML = namePhotographer
  modal.classList.remove('hidden')
  modal.classList.add('active')
}

const closeModal = () => {
  const modal = document.querySelector('.contact_modal')
  modal.classList.add('hidden')
  modal.classList.remove('active')
}

const form = document.querySelector('#contact')
const formSend = document.querySelector('.contact_button')

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
    console.log('🚀 ~ displayErrorForm ~ itemError:', itemError)
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
    console.log('🚀 ~ valid:', valid)
    if (valid) {
      displayErrorForm(val.name, false)
      formData.append(val.name, val.value)
      countValues++
    } else {
      displayErrorForm(val.name, true)
    }
  })
  if (values.length === countValues) {
    let sended = await postInfo()
    if (sended) {
      displayMessage('Message envoyé avec succès', '#contact', false, 'success-message')
      form.reset()
      setTimeout(() => {
        closeModal()
        document.querySelector('.success-message').classList.add('hidden')
      } , 2000)
    }
  } else {
    console.log('error')
  }
})
