// pagination.js
let currentPage = 1;
let totalPages = 0;

export function getCurrentPage() {
  return currentPage;
}

export function getTotalPages() {
  return totalPages;
}

export function setTotalPages(pages) {
  totalPages = pages;
}

export { currentPage, totalPages };
