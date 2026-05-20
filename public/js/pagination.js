// Функция для отображения пагинации
function renderPagination(filteredData, currentPage, rowsPerPage, onPageChange, onRowsPerPageChange) {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginationContainer = document.getElementById('pagination-container');
    
    if (totalPages <= 1 && filteredData.length <= rowsPerPage) {
        paginationContainer.innerHTML = `
            <div class="pagination-container">
                <div class="pagination-info">
                    Показано ${filteredData.length} из ${filteredData.length} записей
                </div>
                <ul class="pagination">
                    <li class="disabled"><span>«</span></li>
                    <li class="active"><span>1</span></li>
                    <li class="disabled"><span>»</span></li>
                </ul>
                <div class="per-page-selector">
                    <span>Показывать:</span>
                    <select id="rows-per-page">
                        <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
                        <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
                        <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
                    </select>
                </div>
            </div>
        `;
    } else {
        let paginationHtml = `
            <div class="pagination-container">
                <div class="pagination-info">
                    Показано ${Math.min(filteredData.length, currentPage * rowsPerPage)} из ${filteredData.length} записей
                </div>
                <ul class="pagination">
                    <li class="${currentPage === 1 ? 'disabled' : ''}">
                        <a onclick="${currentPage === 1 ? 'return false' : `changePage(${currentPage - 1})`}">«</a>
                    </li>
        `;
        
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHtml += `
                <li class="${i === currentPage ? 'active' : ''}">
                    <a onclick="changePage(${i})">${i}</a>
                </li>
            `;
        }
        
        paginationHtml += `
                    <li class="${currentPage === totalPages ? 'disabled' : ''}">
                        <a onclick="${currentPage === totalPages ? 'return false' : `changePage(${currentPage + 1})`}">»</a>
                    </li>
                </ul>
                <div class="per-page-selector">
                    <span>Показывать:</span>
                    <select id="rows-per-page">
                        <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
                        <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
                        <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
                    </select>
                </div>
            </div>
        `;
        
        paginationContainer.innerHTML = paginationHtml;
    }
    
    const perPageSelect = document.getElementById('rows-per-page');
    if (perPageSelect) {
        perPageSelect.addEventListener('change', function(e) {
            const newRowsPerPage = parseInt(e.target.value);
            onRowsPerPageChange(newRowsPerPage);
        });
    }
    
    // Сохраняем функции в глобальную область для доступа из onclick
    window.changePage = onPageChange;
}