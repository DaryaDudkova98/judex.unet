// Функция для отображения таблицы
function renderTable(data, currentPage, rowsPerPage) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    if (currentData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6" style="text-align: center; padding: 40px;">Нет данных</td>';
        tableBody.appendChild(emptyRow);
    } else {
        currentData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.legal}</td>
                <td>${item.fio}</td>
                <td>${item.counterparty}</td>
                <td>${item.courtDecision}</td>
                <td>${item.stateFee}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}