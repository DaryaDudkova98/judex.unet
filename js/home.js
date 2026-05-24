// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Бургер меню
    const burgerMenu = document.getElementById('burgerMenu');
    const sidebar = document.getElementById('sidebar');
    const profileBtn = document.getElementById('profileBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    // Бургер меню логика
    if (burgerMenu && sidebar) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('closed');
        });
    }
    
    // Profile dropdown логика
    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Закрытие dropdown при клике вне
        document.addEventListener('click', function(event) {
            if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // Тема
    const themeItems = document.querySelectorAll('.theme-switch');
    
    // Проверка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    themeItems.forEach(item => {
        item.addEventListener('click', function() {
            const isDark = this.querySelector('.fa-moon') !== null;
            
            if (isDark) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
            
            // Закрыть dropdown после выбора темы
            dropdownMenu.classList.remove('show');
        });
    });
    
    // Закрытие сайдбара при клике на main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent && sidebar) {
        mainContent.addEventListener('click', function() {
            if (!sidebar.classList.contains('closed')) {
                sidebar.classList.add('closed');
            }
        });
    }
});