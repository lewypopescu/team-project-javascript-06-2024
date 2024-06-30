import axios from 'axios';
import Notiflix from 'notiflix';
let currentPage = 1;
let totalPages = 1;
const gallery = document.querySelector('.galleryPopular');
// Verificare dacă suntem pe pagina corectă pentru a apela fetchPosters
const isValidPage = () => {
  const validPaths = ['/index.html', '/', '/team6/', '/team6/index.html'];
  return validPaths.some(
    path =>
      window.location.pathname === path ||
      window.location.pathname.startsWith(path + '/')
  );
};
if (isValidPage() && !window.location.pathname.includes('/my-library.html')) {
  fetchPosters(currentPage);
}
async function fetchPosters(page = 1) {
  const API_KEY = '904cc36a32d92a605c14a646cc21fc67';
  const URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    const { results, total_pages } = response.data;
    totalPages = total_pages;
    renderGallery(results);
    updatePaginationButtons(page);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    Notiflix.Notify.failure(
      'Failed to fetch popular movies. Please try again later.'
    );
  }
}
const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
export function renderGallery(posters) {
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const markup = posters
    .map(({ id, poster_path, original_title, genre_ids, release_date }) => {
      const formattedGenres = genre_ids.map(id => genreMap[id]).join(', ');
      const releaseYear = release_date ? release_date.split('-')[0] : '';
      return `
      <div class="div-poster">
        <a href="#" data-id="${id}" class="poster-link">
          <img class="poster-card" src="${
            BASE_IMG_URL + poster_path
          }" alt="${original_title}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-title">${original_title}</p>
          <p class="info-genre-year">${formattedGenres} | ${releaseYear}</p>
        </div>
      </div>
    `;
    })
    .join('');
  gallery.innerHTML = markup;
  // Adăugare event listener pentru fiecare poster-link
  document.querySelectorAll('.poster-link').forEach(poster => {
    poster.addEventListener('click', async event => {
      event.preventDefault();
      const id = event.currentTarget.getAttribute('data-id');
      await openModal(id);
    });
  });
}
export function updatePaginationButtons(page) {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const pageButtons = document.querySelectorAll('.page-btn');
  prevButton.disabled = page === 1;
  nextButton.disabled = page === totalPages;
  pageButtons.forEach(button => {
    if (button.dataset.shown) return; // Skip step buttons
    const pageNum = parseInt(button.id.split('-')[1], 10);
    button.classList.toggle('active', pageNum === page);
  });
}
document.querySelector('.prev').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPosters(currentPage);
  }
});
document.querySelector('.next').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchPosters(currentPage);
  }
});
document.querySelectorAll('.page-btn').forEach(button => {
  if (button.dataset.shown) return; // Skip step buttons
  button.addEventListener('click', () => {
    const page = parseInt(button.id.split('-')[1], 10);
    currentPage = page;
    fetchPosters(currentPage);
  });
});
// Funcția pentru deschiderea modalului
export async function openModal(id) {
  const API_KEY = '904cc36a32d92a605c14a646cc21fc67';
  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    const movieData = response.data;
    const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const modalContent = `
      <div class="cards-modal-content">
        <span class="cards-modal-close-button">&times;</span>
        <img class="cards-modal-poster-card" src="${
          BASE_IMG_URL + movieData.poster_path
        }" alt="${movieData.title}" loading="lazy" />
        <div class="cards-modal-div-info">
          <h2 class="cards-modal-title">${movieData.title}</h2>
          <div class="cards-modal-details">
            <span class="label">Vote / Votes</span>
            <span class="value">${movieData.vote_average} / ${
      movieData.vote_count
    }</span>
          </div>
          <div class="cards-modal-details">
            <span class="label">Popularity</span>
            <span class="value">${movieData.popularity}</span>
          </div>
          <div class="cards-modal-details">
            <span class="label">Original Title</span>
            <span class="value">${movieData.original_title}</span>
          </div>
          <div class="cards-modal-details">
            <span class="label">Genre</span>
            <span class="value">${movieData.genres
              .map(genre => genre.name)
              .join(', ')}</span>
          </div>
          <div class="cards-modal-about">
            <span class="label">About</span>
            <span class="value">${movieData.overview}</span>
          </div>
          <div class="cards-modal-buttons">
            <button id="toggle-watched" class="cards-modal-button watch">Loading...</button>
            <button id="toggle-queue" class="cards-modal-button queue">Loading...</button>
          </div>
        </div>
      </div>
    `;
  let modal = document.querySelector('.cards-modal-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.classList.add('cards-modal-modal');
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = modalContent;
    modal.style.display = 'block';
    function closeModal() {
      modal.style.display = 'none';
    }
    modal
      .querySelector('.cards-modal-close-button')
      .addEventListener('click', closeModal);
    window.addEventListener('click', event => {
      if (event.target === modal) {
        closeModal();
      }
    });
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
    updateButtonState('watched', movieData.id, 'toggle-watched');
    updateButtonState('queue', movieData.id, 'toggle-queue');
    document.getElementById('toggle-watched').addEventListener('click', () => {
      toggleMovieInLibrary('watched', movieData);
      updateButtonState('watched', movieData.id, 'toggle-watched');
    });
    document.getElementById('toggle-queue').addEventListener('click', () => {
      toggleMovieInLibrary('queue', movieData);
      updateButtonState('queue', movieData.id, 'toggle-queue');
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    Notiflix.Notify.failure(
      'Failed to fetch movie details. Please try again later.'
    );
  }
}
function toggleMovieInLibrary(section, movie) {
  let movies = JSON.parse(localStorage.getItem(section)) || [];
  const movieIndex = movies.findIndex(m => m.id === movie.id);
  if (movieIndex === -1) {
    movies.push(movie);
    Notiflix.Notify.info(
      `The movie has been added to ${section.toUpperCase()}`
    );
  } else {
    movies.splice(movieIndex, 1);
    Notiflix.Notify.info(
      `The movie has been removed from ${section.toUpperCase()}`
    );
  }
  localStorage.setItem(section, JSON.stringify(movies));
}
function checkMovieInLibrary(section, id) {
  const movies = JSON.parse(localStorage.getItem(section)) || [];
  return movies.some(movie => movie.id === id);
}
function updateButtonState(section, id, buttonId) {
  const isInLibrary = checkMovieInLibrary(section, id);
  const button = document.getElementById(buttonId);
  if (isInLibrary) {
    button.textContent = `Remove from ${section.toUpperCase()}`;
  } else {
    button.textContent = `Add to ${section.toUpperCase()}`;
  }
}
