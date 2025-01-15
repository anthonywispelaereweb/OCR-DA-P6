const displayModal = () => {
    const modal = document.querySelector(".contact_modal");
    const namePhotographerModal = document.querySelector(".name-photographer");
    const namePhotographer = document.querySelector(".div-left h2").textContent;
    namePhotographerModal.innerHTML = namePhotographer
    modal.classList.remove('hidden')
    modal.classList.add('active')
}

const closeModal = () => {
    const modal = document.querySelector(".contact_modal");
    modal.classList.add('hidden')
    modal.classList.remove('active')
}
