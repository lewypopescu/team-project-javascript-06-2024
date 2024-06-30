const openModal = document.querySelector('.students-link');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const modalContainer = document.querySelector('.modal-content');

modal.style.display = 'none';
openModal.addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'flex';
});
closeModal.addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'none';
});
modal.addEventListener('click', e => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});
