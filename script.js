// 페이지가 열릴 때 실행
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('todayDate').innerText = new Date().toLocaleDateString() + " 스케줄";
    loadTodos();
});

function addTodo() {
    const input = document.getElementById('todoInput');
    if (input.value === '') return;

    createTodoElement(input.value, false);
    input.value = '';
    saveTodos();
    updateProgress();
}

function createTodoElement(text, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    li.innerHTML = `
        <span onclick="toggleComplete(this)">${text}</span>
        <button class="delete-btn" onclick="deleteTodo(this)">삭제</button>
    `;
    document.getElementById('todoList').appendChild(li);
}

function toggleComplete(element) {
    element.parentElement.classList.toggle('completed');
    saveTodos();
    updateProgress();
}

function deleteTodo(element) {
    element.parentElement.remove();
    saveTodos();
    updateProgress();
}

function updateProgress() {
    const total = document.querySelectorAll('li').length;
    const completed = document.querySelectorAll('li.completed').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    document.getElementById('progressBar').style.width = percent + "%";
    document.getElementById('progressText').innerText = `오늘의 달성도: ${percent}%`;
}

// 브라우저에 저장하기
function saveTodos() {
    const todos = [];
    document.querySelectorAll('li').forEach(li => {
        todos.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTodos', JSON.stringify(todos));
}

// 저장된 내용 불러오기
function loadTodos() {
    const saved = JSON.parse(localStorage.getItem('myTodos')) || [];
    saved.forEach(todo => createTodoElement(todo.text, todo.completed));
    updateProgress();
}
