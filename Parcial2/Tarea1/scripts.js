document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const clearAllTasksButton = document.getElementById('clearAllTasks');
    const searchTask = document.getElementById('searchTask');
    const filterExpiredButton = document.getElementById('filterExpired');
    const filterCompletedButton = document.getElementById('filterCompleted');
    const clearFiltersButton = document.getElementById('clearFilters');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const taskResponsible = document.getElementById('taskResponsible').value;

        if (new Date(endDate) < new Date(startDate)) {
            alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
            return;
        }

        const task = {
            id: Date.now(),
            name: taskName,
            startDate: startDate,
            endDate: endDate,
            responsible: taskResponsible,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskForm.reset();
    });

    clearAllTasksButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de eliminar todas las tareas?')) {
            localStorage.removeItem('tasks');
            tasks = [];
            renderTasks();
        }
    });

    searchTask.addEventListener('input', () => {
        renderTasks();
    });

    filterExpiredButton.addEventListener('click', () => {
        renderTasks('expired');
    });

    filterCompletedButton.addEventListener('click', () => {
        renderTasks('completed');
    });

    clearFiltersButton.addEventListener('click', () => {
        renderTasks();
    });

    function renderTasks(filter = '') {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            if (filter === 'expired' && !(new Date(task.endDate) < new Date() && !task.completed)) return;
            if (filter === 'completed' && !task.completed) return;
            if (searchTask.value && !task.name.toLowerCase().includes(searchTask.value.toLowerCase())) return;

            const li = document.createElement('li');
            li.className = 'list-group-item';

            if (task.completed) {
                li.classList.add('completed');
            } else if (new Date(task.endDate) < new Date()) {
                li.classList.add('expired');
            } else {
                li.classList.add('pending');
            }

            li.dataset.id = task.id;

            li.innerHTML = `
                ${task.name} - ${task.startDate} - ${task.endDate} - ${task.responsible}
                <button class="btn btn-success btn-sm float-right ml-2 complete-task">Resolver</button>
                <button class="btn btn-warning btn-sm float-right ml-2 uncomplete-task">Desmarcar</button>
                <button class="btn btn-danger btn-sm float-right delete-task">Eliminar</button>
            `;

            const completeButton = li.querySelector('.complete-task');
            const uncompleteButton = li.querySelector('.uncomplete-task');
            const deleteButton = li.querySelector('.delete-task');

            if (task.completed) {
                completeButton.style.display = 'none';
            } else {
                uncompleteButton.style.display = 'none';
            }

            if (new Date(task.endDate) < new Date() && !task.completed) {
                completeButton.style.display = 'none';
            }

            completeButton.addEventListener('click', () => {
                task.completed = true;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            uncompleteButton.addEventListener('click', () => {
                task.completed = false;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            deleteButton.addEventListener('click', () => {
                if (confirm('¿Estás seguro de eliminar esta tarea?')) {
                    tasks = tasks.filter(t => t.id !== task.id);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                }
            });

            taskList.appendChild(li);
        });
    }

    renderTasks();
});
