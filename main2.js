// Get elements from gallery
const highlightedElement = document.querySelector(
  '.gallery__item--highlighted'
);
const galleryElement = document.querySelector('.gallery');
const galleryItems = galleryElement.lastElementChild;

// get elements of details section
const detailsElement = document.querySelector('.details');
const detailsItems = detailsElement.querySelector('.details__titles');
const detailsDescription = detailsElement.querySelector(
  '.details__description'
);

let productImages = [];
let productDetails = [];

// Initial function
async function init() {
  try {
    // fetch data
    const response = await fetch(
      'https://frontend-interview-api-sepia.vercel.app/api/items'
    );
    // convert data to json
    const data = await response.json();

    // get details from api data
    const details = data?.[0]?.details;

    if (details) {
      productDetails = details;
      details.map((detail, index) => {
        const li = document.createElement('li');
        li.classList.add('details__titles_element');
        li.dataset.id = detail.id;
        li.textContent = detail.name;
        li.onclick = selectDetail;
        detailsItems.appendChild(li);
        if (index === 0) {
          li.classList.add('details__titles_element--active');
          detailsDescription.textContent = detail.description;
        }
      });
    }

    // get images from api data
    const images = data?.[0]?.images;
    if (images) {
      productImages = images;
      // mapping images data
      images.forEach((value, index) => {
        // create image element
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', value.x2);
        imgElement.alt = value.id;

        // create button element
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('gallery__item');
        buttonElement.dataset.id = value.id;
        buttonElement.appendChild(imgElement); // Add image element to button child
        if (index === 0) {
          buttonElement.classList.add('gallery__item--active');
          highlightImage(value);
        }

        // Add event listener to button and detect who is clicked
        buttonElement.addEventListener('click', selectItem);

        // add button to gallery items wrapper
        galleryItems.appendChild(buttonElement);
      });
    }
  } catch (error) {
    console.error(error);
  }
}
init();

// Hightlight selected image of carousel
function highlightImage(currentImage) {
  const image = document.createElement('img');
  image.src = currentImage.x3;
  image.alt = 'Selected preview';

  highlightedElement.innerHTML = '';
  highlightedElement.append(image);
}

function selectDetail(e) {
  const currentTarget = e.currentTarget;
  const activeClass = 'details__titles_element--active';

  const id = Number(currentTarget.dataset.id);
  const currentActiveElement = document.querySelector(`.${activeClass}`);

  currentActiveElement.classList.remove(activeClass);
  currentTarget.classList.add(activeClass);

  const result = productDetails.find((detail) => detail.id === id);
  if (result) {
    detailsDescription.textContent = result.description;
  }
}

// Button click event
function selectItem(e) {
  const button = e.currentTarget;
  const activeClass = 'gallery__item--active';

  const id = button.dataset.id;
  const currentActiveElement = document.querySelector(`.${activeClass}`);
  currentActiveElement.classList.remove(activeClass);
  button.classList.add(activeClass);

  // Array methods to find images
  const currentImage = productImages.find((image) => image.id === Number(id));

  if (currentImage) {
    highlightImage(currentImage);
  }
}

