// apifetch.js
import { renderGallery, updatePaginationButtons } from './cards.js';
import { setTotalPages } from './pagination.js'; // Import the setter function

export async function fetchPosters(page = 1) {
  const API_KEY = '904cc36a32d92a605c14a646cc21fc67';
  const URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    const { results, total_pages } = response.data;
    setTotalPages(total_pages); // Use the setter function to update totalPages
    renderGallery(results);
    updatePaginationButtons();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// Definim funcția setupPagination
export function setupPagination() {
  // Adăugăm event listener pentru butonul "Previous"
  document.querySelector('.prev').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPosters(currentPage); // Apelăm fetchPosters cu pagina anterioară
    }
  });
  // Adăugăm event listener pentru butonul "Next"
  document.querySelector('.next').addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchPosters(currentPage); // Apelăm fetchPosters cu pagina următoare
    }
  });
  // Adăugăm event listener pentru fiecare buton de paginare
  document.querySelectorAll('.page-btn').forEach(button => {
    if (button.dataset.shown) return; // Omitere butoanele de pas
    button.addEventListener('click', () => {
      const page = parseInt(button.id.split('-')[1], 10);
      currentPage = 'page';
      fetchPosters(currentPage); // Apelăm fetchPosters cu pagina selectată
    });
  });
  // Funcția pentru verificarea paginilor valide
  const isValidPage = () => {
    const validPaths = ['/index.html', '/', '/team6/', '/team6/index.html'];
    return validPaths.some(
      path =>
        window.location.pathname === path ||
        window.location.pathname.startsWith(path + '/')
    );
  };
  // Verificăm dacă suntem pe o pagină validă și nu pe pagina "my-library.html"
  if (isValidPage() && !window.location.pathname.includes('/my-library.html')) {
    fetchPosters(currentPage); // Apelăm fetchPosters pentru pagina curentă
  }
}
