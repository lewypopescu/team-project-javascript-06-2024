const loaderContainer = document.querySelector('.loader-container');

loaderContainer.style.display = 'flex';
loaderContainer.style.justifyContent = 'center';

window.addEventListener('load', function () {
  setTimeout(function () {
    loaderContainer.style.display = 'none';
  }, 500);
});
