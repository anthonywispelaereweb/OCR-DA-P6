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
const postInfo = async() => {
  let isSuccess= false
  const formHTML = document.querySelector('#contact')
  const formData = new FormData(formHTML)
  const data = {}
  formData.forEach((value, key) => {
    data[key] = value
  }) 
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(`https://restapi.fr/api/OCR-test-tonio-fisheye`, options)
  if (response.ok) {
    console.log('🚀 ~ postInfo ~ response:', response)
    isSuccess = true
  }
  return isSuccess
}

export { getData, getPhotographersAndMediaById, postInfo }