import store from '../../store/store';
import { Filters } from '../../store/store';

/**
 * Configura los botones de filtro del footer
 */
export const setupFilterButtons = (refreshCallback) => {
    const filterButtons = document.querySelectorAll(".filter-button");
    
    filterButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let filter;
            
            switch(index) {
                case 0: // Completadas
                    filter = Filters.Completed;
                    break;
                case 1: // Pendientes
                    filter = Filters.Pending;
                    break;
                case 2: // Todas
                default:
                    filter = Filters.All;
                    break;
            }
            
            store.setFilter(filter);
            refreshCallback();
            
            // Resalta el botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Marca el filtro actual como activo
    const currentFilter = store.getCurrentFilter();
    if (currentFilter === Filters.Completed) filterButtons[0].classList.add('active');
    else if (currentFilter === Filters.Pending) filterButtons[1].classList.add('active');
    else filterButtons[2].classList.add('active');
};