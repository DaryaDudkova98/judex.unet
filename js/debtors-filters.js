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
    console.log('Filtering with selectedValue:', selectedValue);
    console.log('All data sample:', allData[0]);
    
    if (selectedValue === 'all') {
        console.log('Returning all data');
        return [...allData];
    } else {
        // Получаем short_name по ID из загруженных данных
        let providerName = null;
        
        if (window.legalEntityService && window.legalEntityService.legalEntities) {
            const entity = window.legalEntityService.legalEntities.find(e => e.id == selectedValue);
            providerName = entity ? entity.short_name : null;
            console.log('Found provider from service:', providerName);
        }
        
        // Если сервис еще не загружен или не нашли, используем fallback
        if (!providerName) {
            const legalMap = {
                '1': 'ОС',
                '2': 'ХИ',
                '3': 'ТРН'
            };
            providerName = legalMap[selectedValue];
            console.log('Using fallback provider:', providerName);
        }
        
        const filtered = allData.filter(item => {
            console.log(`Comparing item.provider: ${item.provider} with providerName: ${providerName}`);
            return item.provider === providerName;
        });
        
        console.log(`Filtered count: ${filtered.length}`);
        return filtered;
    }
}