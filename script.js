document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const submitBtn = document.getElementById('submitBtn');
    const filterCategorySelect = document.getElementById('filterCategory');
    const filterBtn = document.getElementById('filterBtn');
    const taskList = document.getElementById('taskList');

   
    const tasksByCategory = {};

    submitBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const categoryValue = categorySelect.value;

        if (taskText !== '' && categoryValue !== '') {
            if (!tasksByCategory[categoryValue]) {
                tasksByCategory[categoryValue] = [];
            }

            tasksByCategory[categoryValue].unshift({
                text: taskText,
                completed: false,
            });

            renderTasks(); 
            taskInput.value = '';
            categorySelect.value = '';
        }
    });

    filterBtn.addEventListener('click', function () {
        renderTasks(); 
    });

    function renderTasks() {
        
        taskList.innerHTML = '';

        const selectedCategory = filterCategorySelect.value;

        
        for (const category in tasksByCategory) {
            if (tasksByCategory.hasOwnProperty(category)) {
                const tasks = tasksByCategory[category];

                if (selectedCategory !== '' && selectedCategory !== category) {
                    continue;
                }

                
                tasks.forEach((task, index) => {
                    const taskItem = document.createElement('li');
                    taskItem.innerHTML = `
                        <input type="checkbox" class="task-checkbox" data-category="${category}" data-index="${index}" ${task.completed ? 'checked' : ''}>
                        <span>${task.text} - ${category}</span>
                        <button class="edit-btn" data-category="${category}" data-index="${index}">Edit</button>
                        <button class="important-btn" data-category="${category}" data-index="${index}">Important</button>
                        <button class="delete-btn" data-category="${category}" data-index="${index}">Delete</button>
                    `;

                    
                    const checkbox = taskItem.querySelector('.task-checkbox');
                    checkbox.addEventListener('change', function () {
                        const dataIndex = checkbox.getAttribute('data-index');
                        const category = checkbox.getAttribute('data-category');
                        tasksByCategory[category][dataIndex].completed = checkbox.checked;
                        renderTasks();
                    });

                    
                    const deleteButton = taskItem.querySelector('.delete-btn');
                    deleteButton.addEventListener('click', function () {
                        const dataIndex = deleteButton.getAttribute('data-index');
                        const category = deleteButton.getAttribute('data-category');
                        tasksByCategory[category].splice(dataIndex, 1);
                        renderTasks(); 
                    });

                    
                    const editButton = taskItem.querySelector('.edit-btn');
                    editButton.addEventListener('click', function () {
                        const dataIndex = editButton.getAttribute('data-index');
                        const category = editButton.getAttribute('data-category');
                        const newText = prompt('Edit task:', tasksByCategory[category][dataIndex].text);
                        if (newText !== null) {
                            tasksByCategory[category][dataIndex].text = newText.trim();
                            renderTasks(); 
                        }
                    });

                    
                    const importantButton = taskItem.querySelector('.important-btn');
                    importantButton.addEventListener('click', function () {
                        const dataIndex = importantButton.getAttribute('data-index');
                        const category = importantButton.getAttribute('data-category');
                        tasksByCategory[category][dataIndex].important = !tasksByCategory[category][dataIndex].important;
                        renderTasks(); 
                    });

                   
                    if (task.completed) {
                        taskItem.querySelector('span').classList.add('completed-task');
                    }

                    
                    if (task.important) {
                        taskItem.classList.add('task-important');
                    }

                    taskList.appendChild(taskItem);
                });
            }
        }
    }
});
