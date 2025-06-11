function swapImage(selectedImage) {
  let bigImage = document.getElementById("big-image");

  let tempSrc = bigImage.src;
  bigImage.src = selectedImage.src;
  selectedImage.src = tempSrc;
}
