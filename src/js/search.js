import axios from 'axios';
import Notiflix from 'notiflix';
import { openModal } from './cards.js';
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.header-form');
  const searchInput = searchForm.querySelector('.header-form__input');
  const gallery = document.querySelector('.galleryPopular');
  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const searchQuery = searchInput.value.trim();
    console.log('Search Query:', searchQuery); // Log the search query
    if (searchQuery === '') {
      return;
    }
    try {
      const API_KEY = '904cc36a32d92a605c14a646cc21fc67';
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        searchQuery
      )}`;
      const response = await axios.get(URL);
      const { results } = response.data;
      console.log('Search Results:', results); // Log the search results
      renderGallery(results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      Notiflix.Notify.failure(
        'Failed to fetch movies. Please try again later.'
      );
    }
  });
  function renderGallery(posters) {
    const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const markup = posters
      .map(({ id, poster_path, original_title, release_date }) => {
        return `
        <div class="div-poster">
          <a href="#" data-id="${id}" class="poster-link">
            <img class="poster-card" src="${
              BASE_IMG_URL + poster_path
            }" alt="${original_title}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-title">${original_title}</p>
            <p class="info-genre-year">${release_date}</p>
          </div>
        </div>
      `;
      })
      .join('');
    console.log('Generated Markup:', markup); // Log the generated HTML markup
    gallery.innerHTML = markup;
  }
  gallery.addEventListener('click', async event => {
    event.preventDefault();
    const posterLink = event.target.closest('.poster-link');
    if (posterLink) {
      const id = posterLink.dataset.id;
      openModal(id);
    }
  });
});
