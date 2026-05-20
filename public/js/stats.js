// Функция для обновления статистики
function updateStats(data) {
    document.getElementById('total-debt').textContent = data.totalDebt || 0;
    document.getElementById('total-debtors').textContent = data.totalDebtors || 0;
    document.getElementById('new-debtors').textContent = data.newDebtors || 0;
    document.getElementById('closed-debtors').textContent = data.closedDebtors || 0;
}

// Пример использования
// updateStats({
//     totalDebt: 1250000,
//     totalDebtors: 45,
//     newDebtors: 12,
//     closedDebtors: 8
// });