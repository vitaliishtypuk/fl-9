const rootNode = document.getElementById('root');
let constants = {
    zero: 0, 
    one: 1,
    ten: 10,
    eleven: 11
}
let htmlElem = `<div class="inp-form">
                    <h1>TODO Cat List</h1>
                    <p id="allert"></p>
                    <form class="form">
                        <input id="taskInput" placeholder="Add New Action" required>
                        <button id="addTaskButton"><i class="material-icons">add</i></button>
                    </form>
                </div>
                <div id="list"></div>
                <div id="footer">
                    <img src="assets/img/cat.png">
                </div>`;

const divCont = document.createElement('div');
divCont.className = 'container';
divCont.innerHTML = htmlElem;

let tasks = [];

function addTask(e) {
    e.preventDefault();
    let inputElem = document.querySelector('#taskInput');

    if(!inputElem.checkValidity()) {
        return;
    }
    if (tasks.length < constants.ten) {
        tasks.push({task: inputElem.value, completed: false});
        inputElem.value = '';
        
        updateList();
    } else {   
        let header = document.getElementById('allert');
        header.innerHTML = 'Maximum item per list are created';
        
        let button = document.getElementById('addTaskButton');
        let inputForm = document.getElementById('taskInput');
        button.disabled = true;
        inputForm.disabled = true;
        
        updateList();
    }
}

function deleteTask(index) {
    tasks.splice(index, constants.one);
    
    let header = document.getElementById('allert');
    header.innerHTML = '';
    
    let button = document.getElementById('addTaskButton');
    let inputForm = document.getElementById('taskInput');
    button.disabled = false;
    inputForm.disabled = false;
    
    updateList();
}

function completedTask(index) {
    tasks[index].completed = true;
    updateList();
}

function init() {
    document.querySelector('.form').addEventListener('submit',addTask);
    updateList();
}

function updateList() {

    let listElem = document.getElementById('list');
    let html = '';

    for(let t in tasks) {
        if(t < constants.eleven) {
        html += `<div class="task" data-task-index="${t}" draggable="true">
                    <div class="action">
                        <div class="checkbox">
                            <i class="material-icons hidden">check_box_outline_blank</i>
                            <i class="material-icons">check_box</i>
                        </div> 
                        <div class='text'>`
                            + tasks[t].task + 
                        `</div>
                    </div>
                    <div class="buttons">
                        <button class="btn-delete" type="button">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>`;
        }
    }

    listElem.innerHTML = html;

    listElem.querySelectorAll('.btn-delete').forEach((btn, index) => {
        btn.addEventListener(`click`, function() {
            deleteTask(index);
        });
    });

    listElem.querySelectorAll('.action').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            completedTask(index);
        });
    });

    let summ = tasks.length;
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].completed) {
            let crtCompl = document.getElementsByClassName('action')[i];
            crtCompl.className = 'action checked';
        }
    }

    let dragSrcEl = null;
    
    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        
        let newInd = +e.target.getAttribute('data-task-index')+constants.one;
        let oldIndex = +e.target.getAttribute('data-task-index');

    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move'; 
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }
        let oldInd = +e.target.getAttribute('data-task-index')+constants.one;
        let newInd = +e.target.getAttribute('data-task-index');
        tasks.splice(newInd, constants.zero, tasks.splice(oldInd, constants.one)[constants.zero]);
        return false;
    }
    
    function handleDragEnd(e) {
        [].forEach.call(allTasks, function (col) {
            col.classList.remove('over');
        });
    }

    let allTasks = document.querySelectorAll('.task');
    [].forEach.call(allTasks, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false)
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });
}

rootNode.appendChild(divCont);
init();