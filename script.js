const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '4kZ7iOBFqMJqdHBaM5N5hZ2W-s3e65A58SH7QYS8088';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// DRY Code Fixer
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
// Check if all images loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Create Elements for Links and Photos and Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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
        });
        // Event Listener, Check if finished loading
        img.addEventListener('load', imageLoaded)
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


// If Scrolling to bottom add more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


// On Load
getPhotos()