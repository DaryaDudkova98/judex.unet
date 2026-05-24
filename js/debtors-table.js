// Функция для отображения таблицы должников
function renderDebtorsTable(filteredData, currentPage, rowsPerPage) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
    
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    if (currentData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="5" style="text-align: center; padding: 40px;">Нет данных<\/td>';
        tableBody.appendChild(emptyRow);
    } else {
        currentData.forEach(item => {
            const row = document.createElement('tr');
            const statusClass = item.status === 'Активный' ? 'status-active' : 'status-inactive';
            
            // ИСПРАВЛЕНО: используем /debtors/ (с 's') как в контроллере
            const fioLink = document.createElement('a');
            fioLink.href = `/debtors/${item.id}`;  // ← ИЗМЕНЕНО: /debtors/ вместо /debtor/
            fioLink.className = 'debtor-link';
            fioLink.innerHTML = `${item.fio} <span class="link-icon">🔗</span>`;
            fioLink.style.textDecoration = 'none';
            
            // Создаем ссылку на внешний ресурс
            const loginLink = document.createElement('a');
            loginLink.href = item.externalUrl;
            loginLink.className = 'external-link';
            loginLink.target = '_blank';
            loginLink.rel = 'noopener noreferrer';
            loginLink.innerHTML = `${item.login} <span class="external-icon">↗</span>`;
            loginLink.style.textDecoration = 'none';
            
            row.innerHTML = `
                <td>${item.id}<\/td>
                <td>${item.provider}<\/td>
                <td><\/td>
                <td><\/td>
                <td class="${statusClass}">${item.status}<\/td>
            `;
            
            row.cells[2].appendChild(fioLink);
            row.cells[3].appendChild(loginLink);
            
            tableBody.appendChild(row);
        });
    }
}