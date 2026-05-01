function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value;
    if (text === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="this.parentElement.classList.toggle('completed')">${text}</span>
        <button onclick="this.parentElement.remove()">삭제</button>
    `;
    document.getElementById('todoList').appendChild(li);
    input.value = '';
}
