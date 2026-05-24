// Функция поиска по ФИО и логину для должников
function searchDebtors(searchText, allData) {
    if (!searchText) {
        return [...allData];
    } else {
        return allData.filter(item => 
            item.fio.toLowerCase().includes(searchText.toLowerCase()) ||
            item.login.toLowerCase().includes(searchText.toLowerCase())
        );
    }
}

// Функция фильтрации по юрлицу для должников
function filterDebtorsByLegalEntity(selectedValue, allData) {
    if (selectedValue === 'all') {
        return [...allData];
    } else {
        const legalMap = {
            'os': 'ОС',
            'hi': 'ХИ',
            'terranet': 'Терранэт'
        };
        return allData.filter(item => item.provider === legalMap[selectedValue]);
    }
}