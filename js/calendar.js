// public/js/calendar.js

document.addEventListener('DOMContentLoaded', function() {
    let currentRange = null;
    
    const calendar = flatpickr("#calendar", {
        inline: true,
        mode: "range",
        locale: "ru",
        dateFormat: "d.m.Y",
        defaultDate: ["today", "today"],
        static: true,
        onChange: function(selectedDates, dateStr, instance) {
            const start = instance.selectedDates[0];
            const end = instance.selectedDates[1];
            const applyBtn = document.getElementById('apply-range');
            const rangeSpan = document.getElementById('selected-date-range');
            
            if (start && end) {
                const formatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                const startFormatted = start.toLocaleDateString('ru-RU', formatOptions);
                const endFormatted = end.toLocaleDateString('ru-RU', formatOptions);
                
                rangeSpan.innerHTML = `${startFormatted} — ${endFormatted}`;
                applyBtn.style.display = 'inline-block';
                
                currentRange = {
                    start: start.toISOString().split('T')[0],
                    end: end.toISOString().split('T')[0],
                    start_label: startFormatted,
                    end_label: endFormatted
                };
            } else if (start && !end) {
                const startFormatted = start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
                rangeSpan.innerHTML = `Начало: ${startFormatted}<br>Конец: выберите дату...`;
                applyBtn.style.display = 'none';
                currentRange = null;
            } else {
                rangeSpan.innerHTML = '—';
                applyBtn.style.display = 'none';
                currentRange = null;
            }
        }
    });
    
    document.getElementById('apply-range').addEventListener('click', function() {
        if (currentRange) {
            console.log('Отправляем диапазон на сервер:', currentRange);
            alert(`Выбран период:\n${currentRange.start_label} — ${currentRange.end_label}`);
        }
    });
});