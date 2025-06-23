document.addEventListener('DOMContentLoaded', function() {
    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;
    let totalPages = 2; 
    
    const menuList = document.querySelector('.menu-list');
    const allItems = Array.from(document.querySelectorAll('.menu-item-link'));
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');
    const pagesContainer = document.querySelector('.pagination-pages');
    const searchInput = document.querySelector('.search-box input');
    const sortButtons = document.querySelectorAll('.sort-btn');
    
    let currentSort = 'default';
    let sortDirection = 1;
    let filteredItems = [...allItems];
    
    init();
    
    function init() {
        renderItems();
        renderPagination();
        setupEventListeners();
    }
    
    function setupEventListeners() {
        prevBtn.addEventListener('click', goToPrevPage);
        nextBtn.addEventListener('click', goToNextPage);
        
        searchInput.addEventListener('input', applyFilters);
        
        sortButtons.forEach(btn => {
            btn.addEventListener('click', () => handleSortClick(btn));
        });
    }
    
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        
        filteredItems = allItems.filter(item => {
            const card = item.querySelector('.menu-item');
            const name = card.dataset.name.toLowerCase();
            const desc = card.querySelector('.menu-item-desc').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            
            return searchTerm === '' || name.includes(searchTerm) || desc.includes(searchTerm) || category.includes(searchTerm);});
        
        totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
        currentPage = 1;
        sortItems();
        renderItems();
        renderPagination();
    }
    
    function handleSortClick(clickedBtn) {
        const sortType = clickedBtn.dataset.sort;
        
        if (currentSort === sortType) {
            sortDirection *= -1;
        } else {
            currentSort = sortType;
            sortDirection = 1;
        }
        
        updateSortButtons(clickedBtn);
        sortItems();
        renderItems();
    }
    
    function updateSortButtons(activeBtn) {
        sortButtons.forEach(btn => {
            btn.classList.remove('active');
            
            if (btn === activeBtn) {
                btn.classList.add('active');
                
                const arrow = sortDirection === 1 ? '↑' : '↓';
                btn.textContent = `По ${getSortName(btn.dataset.sort)} ${arrow}`;
            } else {
                btn.textContent = `По ${getSortName(btn.dataset.sort)}`;
            }
        });
    }
    
    function getSortName(sortType) {
        switch(sortType) {
            case 'price': return 'цене';
            case 'name': return 'названию';
            case 'category': return 'категории';
            default: return '';
        }
    }
    
    function sortItems() {
        if (currentSort === 'default') return;
        
        filteredItems.sort((a, b) => {
            const aCard = a.querySelector('.menu-item');
            const bCard = b.querySelector('.menu-item');
            const aValue = getSortValue(aCard);
            const bValue = getSortValue(bCard);
            
            if (typeof aValue === 'number') {
                return (aValue - bValue) * sortDirection;
            } else {
                return aValue.localeCompare(bValue) * sortDirection;
            }
        });
    }
    
    function getSortValue(card) {
        switch(currentSort) {
            case 'price': return parseFloat(card.dataset.price);
            case 'name': return card.dataset.name.toLowerCase();
            case 'category': return card.dataset.category.toLowerCase();
            default: return 0;
        }
    }
    
    function renderItems() {
        allItems.forEach(item => item.classList.add('hidden'));

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const itemsToShow = filteredItems.slice(start, end);
        
        itemsToShow.forEach(item => {
            item.classList.remove('hidden');
            menuList.appendChild(item);
        });
    }
    
    function renderPagination() {
        pagesContainer.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => goToPage(i));
            pagesContainer.appendChild(btn);
        }
        
        updatePaginationButtons();
    }
    
    function updatePaginationButtons() {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
    
    function goToPage(page) {
        currentPage = page;
        renderItems();
        renderPagination();
        scrollToTop();
    }
    
    function goToPrevPage() {
        if (currentPage > 1) goToPage(currentPage - 1);
    }
    
    function goToNextPage() {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: menuList.offsetTop - 100,
            behavior: 'smooth'
        });
    }
});