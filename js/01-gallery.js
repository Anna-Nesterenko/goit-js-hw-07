import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  galleryContainer: document.querySelector(".gallery"),
};

const cardsMarkup = createGalleryMarkup(galleryItems);

let getOpanModal;
let getCloseModal;

refs.galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
refs.galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                  <img
                    class="gallery__image"
                    src="${preview} "
                    data-source="${original} "
                    alt="${description} "
                  />
                </a>
              </div>`;
    })
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  const imgSource = e.target.dataset.source;

  createOpenModal(imgSource);
  openModal();
}

function createOpenModal(source) {
  const instance = basicLightbox.create(`
    <img src="${source}" width="800" height="600">
`);
  getOpanModal = instance.show;
  getCloseModal = instance.close;
}

function onCloseModalForEsc(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}

function closeModal() {
  window.removeEventListener("keydown", onCloseModalForEsc);
  getCloseModal();
}

function openModal() {
  window.addEventListener("keydown", onCloseModalForEsc);
  getOpanModal();
}
// console.log(galleryItems);
