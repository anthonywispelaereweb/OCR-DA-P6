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
  console.log("🚀 ~ getPhotographersAndMediaById ~ id:", id)
  console.log("🚀 ~ getPhotographersAndMediaById ~ url:", url)
  let photographers = await getData(url)
  console.log("🚀 ~ getPhotographersAndMediaById ~ photographers:", photographers)
  let info = {
    photographer: {},
    medias: []
  }
  if (photographers) {
    info.photographer = photographers.photographers.find(photographer => photographer.id == id)
    info.medias = photographers.media.filter(media => media.photographerId == id)
  }
  console.log("🚀 ~ getPhotographersAndMediaById ~ info:", info)
  return info
} 