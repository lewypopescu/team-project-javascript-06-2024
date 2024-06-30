import axios from 'axios';
import Notiflix from 'notiflix';
let currentPage = 1;
let totalPages = 1;
const API_KEY = '904cc36a32d92a605c14a646cc21fc67';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const gallery = document.querySelector('.galleryPopular');
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
