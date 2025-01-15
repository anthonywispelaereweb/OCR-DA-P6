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
  let photographers = await getData(url)
  let info = {
    photographer: {},
    medias: []
  }
  if (photographers) {
    info.photographer = photographers.photographers.find(photographer => photographer.id == id)
    info.medias = photographers.media.filter(media => media.photographerId == id)
  }
  return info
} 