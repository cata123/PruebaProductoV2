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

//get elements of colors section
const colorsElement = document.querySelector('.colors');
const colorsItems = colorsElement.querySelector('.colors__name');
const colorsDescription = colorsElement.querySelector('.colors__description')

let productImages = [];
let productDetails = [];
//let productColors = [];

// Initial function
async function init() {
  try {
    // fetch data
    const response = await fetch(
      'https://frontend-interview-api-sepia.vercel.app/api/items'
    );
    // convert data to json
    const data = await response.json();

    //get details from api data
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
    //mapping features images and text 
    const technical_details = data?.[0]?.technical_details;
    if (technical_details) {
      technical_details.forEach((value, index) => {
        console.log(value)
        const newitem = 
        `<li class="features__item">
        <img src="${value.images.x1}" alt="${value.name}">
        <p>${value.name}</p>
        </li>`;
        document.querySelector('.features').innerHTML+=newitem;  
    });
    }

    //mapping choose colors
    const colors = data?.[0]?.colors;
    
    /*if (colors) {
      colors.forEach((value, index) => {
        const newitem = 
        `<li class="colors__name">
        <span>${value.name}</span>
        <p>${value.description}</p>
        </li>`;
        document.querySelector('.colors').innerHTML+=newitem;  
    });
    }*/
    if (colors) {
      colors.forEach((value) => {
        const li = document.createElement("li");
        li.classList.add("color__element");
        li.onclick = selectColor(value.id);
        li.innerHTML = `
          <p>${value.name}</p>
          <p>${value.description}</p>
        `;
        colorsElement.appendChild(li);
      });
    }
    //mapping product info
    const title = data?.[0]?.title;
    if(title) {
      document.querySelector('.name-product').innerText = title
      }

    const description = data?.[0]?.description;
    if(description) {
      document.querySelector('.name2-product').innerText = description
      }

    const price = data?.[0]?.price;
    if(price) {
      document.querySelector('.price-product').innerText = price
      } 

  } catch (error) {
    console.error(error);
  }
}

init();

//Hightlight selected image of carousel
function highlightImage(currentImage) {
  const image = document.createElement('img');
  image.src = currentImage.x3;
  image.alt = 'Selected preview';

  highlightedElement.innerHTML = '';
  highlightedElement.append(image);
}

//Select Description of detail
function selectDetail(e) {
  const currentTarget = e.currentTarget;
  const activeClass = 'details__titles_element--active';

  const id =Number(currentTarget.dataset.id);
  const currentActiveElement = document.querySelector(`.${activeClass}`);

  currentActiveElement.classList.remove(activeClass);
  currentTarget.classList.add(activeClass);

  const result = productDetails.find((detail) => detail.id === id);
  if (result) {
    detailsDescription.textContent = result.description;
  }
}

//Button click event color
function selectColor(id) {
  return function (e) {
    const highlighClass = "color__element__highlighted";
    const currentHighlighted = document.querySelector(`.${highlighClass}`);
    const currentTarget = e.currentTarget;

    if (currentTarget) {
      selectedElement = id;
      if (currentHighlighted) {
        currentHighlighted.classList.remove(highlighClass);
      }
      currentTarget.classList.add(highlighClass);
    }
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




