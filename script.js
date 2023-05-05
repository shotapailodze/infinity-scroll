const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'P22fm8cPv78SXzrnCIBYSlvVpwpEeH7uOKzRiqUN0Yc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// DRY Code Fixer
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links and Photos and Add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Put img inside a tag and then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
};

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const responce = await fetch(apiUrl);
        photosArray = await responce.json();
        displayPhotos();
    } catch (err) {
        // Catch Error
    }
}


// On Load
getPhotos()