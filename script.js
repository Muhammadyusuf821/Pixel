document.getElementById('fileInput').addEventListener('change', handleImageUpload);
document.getElementById('resizeButton').addEventListener('click', handleResize);
document.getElementById('saveButton').addEventListener('click', handleSave);
document.getElementById('closeButton').addEventListener('click', handleClose);

let image = null;
let resizedImage = null;
let gallery = [];

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    image = reader.result;
    document.getElementById('uploadedImage').src = image;
    toggleSection('image-edit-section', true);
    toggleSection('image-upload-section', false);
  };
  reader.readAsDataURL(file);
}

function handleResize() {
  const width = document.getElementById('widthInput').value;
  const height = document.getElementById('heightInput').value;

  const img = new Image();
  img.src = image;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    resizedImage = canvas.toDataURL('image/png');
    document.getElementById('resizedImage').src = resizedImage;
    toggleSection('resized-section', true);
  };
}

function handleSave() {
  if (resizedImage) {
    gallery.push(resizedImage);
    displayGallery();
    handleClose();
  }
}

function handleClose() {
  document.getElementById('uploadedImage').src = '';
  document.getElementById('resizedImage').src = '';
  toggleSection('image-edit-section', false);
  toggleSection('image-upload-section', true);
  toggleSection('resized-section', false);
}

function displayGallery() {
  const gallerySection = document.getElementById('gallery-section');
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';
  gallery.forEach((img, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = img;
    imgElement.alt = `gallery-${index}`;
    imgElement.classList.add('uploaded-image');
    galleryContainer.appendChild(imgElement);
  });
  toggleSection('gallery-section', gallery.length > 0);
}

function toggleSection(sectionId, show) {
  document.getElementById(sectionId).classList.toggle('hidden', !show);
}
