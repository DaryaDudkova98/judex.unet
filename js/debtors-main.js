// Главный файл для страницы списка должников
let currentPage = 1;
let rowsPerPage = 10;
let filteredData = [...debtorsData];

// Функция для обновления таблицы
function updateDebtorsTable() {
    renderDebtorsTable(filteredData, currentPage, rowsPerPage);
    renderPagination(filteredData, currentPage, rowsPerPage, handleDebtorsPageChange, handleDebtorsRowsPerPageChange);
}

// Обработчик смены страницы
function handleDebtorsPageChange(page) {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        updateDebtorsTable();
    }
}

// Обработчик изменения количества строк на странице
function handleDebtorsRowsPerPageChange(newRowsPerPage) {
    rowsPerPage = newRowsPerPage;
    currentPage = 1;
    updateDebtorsTable();
}

// Обработчик поиска
function handleDebtorsSearch(e) {
    const searchText = e.target.value;
    const legalValue = document.getElementById('legal-entity').value;
    
    let tempData = searchDebtors(searchText, debtorsData);
    if (legalValue !== 'all') {
        tempData = filterDebtorsByLegalEntity(legalValue, tempData);
    }
    
    filteredData = tempData;
    currentPage = 1;
    updateDebtorsTable();
}

// Обработчик фильтра по юрлицу
function handleDebtorsLegalEntityChange(e) {
    const selectedValue = e.target.value;
    const searchText = document.getElementById('search-input').value;
    
    let tempData = filterDebtorsByLegalEntity(selectedValue, debtorsData);
    if (searchText) {
        tempData = searchDebtors(searchText, tempData);
    }
    
    filteredData = tempData;
    currentPage = 1;
    updateDebtorsTable();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleDebtorsSearch);
    }
    
    const legalEntitySelect = document.getElementById('legal-entity');
    if (legalEntitySelect) {
        legalEntitySelect.addEventListener('change', handleDebtorsLegalEntityChange);
    }
    
    updateDebtorsTable();
});