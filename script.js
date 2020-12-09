
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let count = 5;

function loadedImage() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// setAttributes a helper function
function setAttributes(element, attributes) {
    for( const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display images function
function displayImage() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // iterate over photos and append to container
    photosArray.forEach((photo) => {
        // create a <a> element for image
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });

        // create a img element for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        
        img.addEventListener('load', loadedImage);
        // Append images to <a> and append <a> to imagecontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Random photos
async function getRandomPhotos() {
    const apiKey = '_uqgAOc2uY8nnFYPgvwr3BZaezVQJeXHNc_47axSbLE';
    const unsplashURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

    try {
        const response = await fetch(unsplashURL);
        photosArray = await response.json();
        displayImage();
    } catch(err) {
        console.log(err);
    }
}

// check to see when scroll reached the end of screen, load more photos
window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight-100 && ready) {
        getRandomPhotos();
        ready = false;
    }
})

// Load
getRandomPhotos();