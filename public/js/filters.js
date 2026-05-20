// Функция поиска
function searchData(searchText, allData) {
    if (!searchText) {
        return [...allData];
    } else {
        return allData.filter(item => 
            item.fio.toLowerCase().includes(searchText.toLowerCase()) ||
            item.counterparty.toLowerCase().includes(searchText.toLowerCase())
        );
    }
}

// Функция фильтрации по юрлицу
function filterByLegalEntity(selectedValue, allData) {
    if (selectedValue === 'all') {
        return [...allData];
    } else {
        const legalMap = {
            'os': 'ОС',
            'hi': 'ХИ',
            'terranet': 'Терранэт'
        };
        return allData.filter(item => item.legal === legalMap[selectedValue]);
    }
}