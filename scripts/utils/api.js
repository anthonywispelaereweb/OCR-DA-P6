import { urlApi, formatedDateDay } from "./../config.js"

const getData = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    } else {
      return await response.json()
    }
  } catch (error) {
      console.log('error', error)
  }
}

const getPhotographersAndMediaById = async (url, id) => {
  try {
    let photographers = await getData(url)
    let info = {
      photographer: {},
      medias: []
    }
    if (photographers) {
      info.photographer = photographers.photographers.find(photographer => photographer.id == id)
      info.medias = photographers.media.filter(media => media.photographerId == id)
    } else {
      throw new Error('Not found photographer')
    }
    return info
  } catch(error) {
    console.log('error', error)
    return error
  }
} 
const postData = async() => {
  let isSuccess= false
  const formHTML = document.querySelector('#contact')
  const formData = new FormData(formHTML)
  const data = {}
  formData.forEach((value, key) => {
    data[key] = value
  }) 
  data.to = document.querySelector('#namePhotographer').textContent
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    const dateDay = formatedDateDay()
    const response = await fetch(`${urlApi}-${dateDay}`, options)
    if (response.ok) {
      console.log('🚀 ~ postData ~ response:', response)
      isSuccess = response.ok
    }
  } catch (error) {
    console.log('error', error)
  }
  
  return isSuccess
}

export { getData, getPhotographersAndMediaById, postData }