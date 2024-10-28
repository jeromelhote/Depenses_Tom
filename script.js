const calendarElement = document.getElementById('calendar');
const years = [2024, 2025];

function createForm(weekDate) {
    const formContainer = document.createElement('div');
    formContainer.className = 'form';
    
    const title = document.createElement('h3');
    title.textContent = `Lundi ${weekDate.toLocaleDateString()}`;
    formContainer.appendChild(title);

    // Checkbox pour nourriture
    const foodLabel = document.createElement('label');
    const foodCheckbox = document.createElement('input');
    foodCheckbox.type = 'checkbox';
    foodCheckbox.id = `food-${weekDate.toISOString()}`;
    foodCheckbox.checked = loadData(`food-${weekDate.toISOString()}`);
    foodCheckbox.addEventListener('change', () => saveData(`food-${weekDate.toISOString()}`, foodCheckbox.checked));
    foodLabel.textContent = "50€ nourriture retiré";
    foodLabel.appendChild(foodCheckbox);
    formContainer.appendChild(foodLabel);

    // Checkbox pour loisir
    const leisureLabel = document.createElement('label');
    const leisureCheckbox = document.createElement('input');
    leisureCheckbox.type = 'checkbox';
    leisureCheckbox.id = `leisure-${weekDate.toISOString()}`;
    leisureCheckbox.checked = loadData(`leisure-${weekDate.toISOString()}`);
    leisureCheckbox.addEventListener('change', () => saveData(`leisure-${weekDate.toISOString()}`, leisureCheckbox.checked));
    leisureLabel.textContent = "20€ loisir retiré";
    leisureLabel.appendChild(leisureCheckbox);
    formContainer.appendChild(leisureLabel);

    // Champ de saisie pour dépenses nourriture
    const foodInput = document.createElement('input');
    foodInput.type = 'text';
    foodInput.placeholder = 'Dépenses nourriture';
    foodInput.value = loadData(`food-expense-${weekDate.toISOString()}`) || '';
    foodInput.addEventListener('input', () => saveData(`food-expense-${weekDate.toISOString()}`, foodInput.value));
    formContainer.appendChild(foodInput);

    // Champ de saisie pour dépenses loisir
    const leisureInput = document.createElement('input');
    leisureInput.type = 'text';
    leisureInput.placeholder = 'Dépenses loisir';
    leisureInput.value = loadData(`leisure-expense-${weekDate.toISOString()}`) || '';
    leisureInput.addEventListener('input', () => saveData(`leisure-expense-${weekDate.toISOString()}`, leisureInput.value));
    formContainer.appendChild(leisureInput);

    return formContainer;
}

function createCalendar() {
    years.forEach(year => {
        const container = document.createElement('div');
        container.className = 'container';
        
        const yearTitle = document.createElement('h2');
        yearTitle.textContent = `Année ${year}`;
        container.appendChild(yearTitle);

        // Créer des lundis pour chaque semaine de l'année
        for (let month = 0; month < 12; month++) {
            for (let day = 1; day <= 31; day++) {
                const date = new Date(year, month, day);
                if (date.getDay() === 1 && date.getMonth() === month) { // Si c'est un lundi
                    const form = createForm(date);
                    container.appendChild(form);
                }
            }
        }
        calendarElement.appendChild(container);
    });
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Initialiser le calendrier
createCalendar();
