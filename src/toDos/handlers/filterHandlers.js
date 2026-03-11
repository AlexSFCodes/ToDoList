import store, { Filters } from '../../store/store.js';

/**
 * Configura los botones de filtro del footer.
 * @param {Function} refreshCallback  async function that re-renders the list
 */
export const setupFilterButtons = (refreshCallback) => {
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach((button, index) => {
        button.addEventListener('click', async () => {
            const filter = [Filters.Completed, Filters.Pending, Filters.All][index] ?? Filters.All;
            store.setFilter(filter);
            await refreshCallback();

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Mark current active filter on load
    const current = store.getCurrentFilter();
    const activeIndex = current === Filters.Completed ? 0 : current === Filters.Pending ? 1 : 2;
    filterButtons[activeIndex]?.classList.add('active');
};
