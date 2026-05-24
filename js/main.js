// Главный файл инициализации
let currentPage = 1;
let rowsPerPage = 10;
let filteredData = [...tableData];

// Функция обновления всей таблицы
function updateTable() {
    renderTable(filteredData, currentPage, rowsPerPage);
    renderPagination(filteredData, currentPage, rowsPerPage, handlePageChange, handleRowsPerPageChange);
}

// Обработчик смены страницы
function handlePageChange(page) {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        updateTable();
    }
}

// Обработчик изменения количества строк на странице
function handleRowsPerPageChange(newRowsPerPage) {
    rowsPerPage = newRowsPerPage;
    currentPage = 1;
    updateTable();
}

// Обработчик поиска
function handleSearch(e) {
    const searchText = e.target.value;
    filteredData = searchData(searchText, tableData);
    currentPage = 1;
    updateTable();
}

// Обработчик фильтра по юрлицу
function handleLegalEntityChange(e) {
    const selectedValue = e.target.value;
    filteredData = filterByLegalEntity(selectedValue, tableData);
    currentPage = 1;
    updateTable();
}

// Обработчик кнопки добавить
function handleAddButton() {
    const searchValue = document.querySelector('.search-input').value;
    console.log('Поиск:', searchValue);
    // Здесь будет логика добавления
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Назначаем обработчики событий
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    const legalEntitySelect = document.getElementById('legal-entity');
    if (legalEntitySelect) {
        legalEntitySelect.addEventListener('change', handleLegalEntityChange);
    }
    
    const addButton = document.getElementById('add-button');
    if (addButton) {
        addButton.addEventListener('click', handleAddButton);
    }
    
    // Инициализируем таблицу
    updateTable();
});