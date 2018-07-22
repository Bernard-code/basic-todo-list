// ikony svg
var doneIcon = '<svg class="check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> ';
var removeIcon = '<svg class="remove" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> ';

// pozwol na dublowanie zadan
options = {
    duplicate: true
}

// pobierz zadania z local storage
if( localStorage.getItem('tasks') ){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    getAllTasks(tasks.todo, "tasks");
    getAllTasks(tasks.done, "doneTasks");
}else{
    tasks = {
        todo:[],
        done:[]
    }
}

// pokaz zadania
function getAllTasks(item, list){
    item.forEach(function(element){
        createTask(element, list);
    });
}

// przypisz listenery do przycisku dodawania zadan
document.getElementById('addButton').addEventListener('click', addTask);

document.getElementById('addTask').addEventListener('keydown', function (e) {
  if (e.code === 'Enter') addTask();
});

// dodaj zadanie
function addTask(e){
    var task = document.getElementById('addTask').value;

    if(task){
        if(options.duplicate){
            tasks.todo.forEach(function(element){
                if(task == element){
                    console.log('duplicate');
                }
            });
        }

        tasks.todo.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTask(task, "tasks");
    }

    e.preventDefault();
}

// stworz nowe zadanie i pokaz na liscie
function createTask(item, list){
    // stworz wezly
    let listItem = document.createElement("li");
    let itemButtons = document.createElement("div");
    let removeButton = document.createElement("button");
    let doneButton = document.createElement("button");

    // dodaj ikony do wezlow i umiesc tresc zadania w elemencie listy
    doneButton.innerHTML = doneIcon;
    removeButton.innerHTML = removeIcon;
    listItem.innerHTML = item;
    listItem = document.getElementById(list).appendChild(listItem);

    // dodaj przyciski usuwania i zaznaczania do elementu listy
    listItem.appendChild(itemButtons);
    itemButtons.appendChild(doneButton);
    itemButtons.appendChild(removeButton);

    // dodaj klasy do utworzonych wezlow
    itemButtons.classList.add('buttons');
    removeButton.classList.add('remove');
    doneButton.classList.add('check');

    // dodaj listenery do przyciskow
    removeButton.addEventListener('click', removeTask);
    doneButton.addEventListener('click', taskDone);

}


function removeTask(item){
    var el = item.target.parentNode.parentNode;
    var value = el.innerText;
    var listId = el.parentNode.id;

    if(listId == 'tasks'){
        tasks.todo.forEach(function(task){
            if (value == task){
                tasks.todo.splice(tasks.todo.indexOf(task), 1);
            }
        });
        document.getElementById('tasks').removeChild(el);
    }else{
        tasks.done.forEach(function(task){
            if (value == task){
                tasks.done.splice(tasks.done.indexOf(task), 1);
            }
        });
        document.getElementById('doneTasks').removeChild(el);

    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function taskDone(item){
    var el = item.target.parentNode.parentNode;
    var value = el.innerText;
    var listId = el.parentNode.id;

    console.log(el, value, listId);

    if(listId == 'tasks'){
        tasks.todo.forEach(function(task){
            if (value == task){
                tasks.todo.splice(tasks.todo.indexOf(task), 1);
            }
        });
        document.getElementById('tasks').removeChild(el);

        tasks.done.push(value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTask(value, "doneTasks");

    }else{
        tasks.done.forEach(function(task){
            if (value == task){
                tasks.done.splice(tasks.done.indexOf(task), 1);
            }
        });
        document.getElementById('doneTasks').removeChild(el);

        tasks.todo.push(value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTask(value, "tasks");

    }

}
