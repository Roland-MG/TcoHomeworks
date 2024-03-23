const log = console.log;

// ? ունենք առաջանդրանքների ցուցակը, որտեղ յուրաքանչյուր առաջադրանքի կատարման պրթոցեսին պետք է հետևենք, հետևյալ ռեժիմներով՝  ընթացքի մեջ է, ստուգվում է, կատարված է
// * մենեջերը նոր ծրագրավորող ստեղծելիս, պետք է ավելացնի նաև էլ․ հասցե և ծածկագիր
// *ունենալ առանձին ծրագրավորողների էջ որտեղ լոգինի ֆորմայում, ծրագրավորողը պետք է հավաքի իր էլ հասցեն և ծածկագիրը, եթե ճիշտ է հավաքում ցույց տալ իրեն կցված թասքերը, եթե ոչ ցույց տալ հաղորդագրություն,
//  *ճիշտ հավաքելու դեպքում լոգինի ֆորման պետք է անհետանա և պետք է ցույց տրվի Դուրս գալու կոճակ

const getDeveloperList = () => JSON.parse(localStorage.getItem('developers')) || [];
let developers = getDeveloperList();

const getTaskList = () => JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = getTaskList();
const getObjIndex = (id, arr) => {
    let index = arr.indexOf(arr.find(value => value.id == id));
    return index >= 0 ? index : false;
};

const addDevForm = document.body.querySelector("#add_dev");
const addTaskForm = document.body.querySelector("#add_task");

const taskList = document.body.querySelector("#task_list");

const showPassBtn = document.body.querySelector(".show_pass_btn");

showPassBtn.addEventListener('click', function () {
    if (this.innerHTML === "🫣") {
        this.innerHTML = "🫢";
        addDevForm.pass.type = 'text'
    } else {
        this.innerHTML = "🫣";
        addDevForm.pass.type = 'password'
    };
});

async function hashPass(pass) {
    let response = await fetch('https://api.hashify.net/hash/md5/hex?value=' + pass);
    let jsn = await response.json();
    return jsn.Digest
};

addDevForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    developers.push({
        id: Date.now(),
        name: this.name.value,
        login: this.login.value,
        pass: await hashPass(this.pass.value)
    });
    log('l')
    localStorage.setItem('developers', JSON.stringify(developers));
});

addTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let obj = tasks[getObjIndex(this.id.value, tasks)] || {};

    [obj.id, obj.dev_id, obj.task, obj.dedline] = [this.task_id.value || Date.now(), this.dev_name.value, this.task_text.value, this.dedline.value]
    if (!getObjIndex(obj.id, tasks)) {
        tasks.push(obj);
    }
    log(new Date(this.dedline.value).toUTCString());
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.location.reload();
});

function devList(list) {
    let selectList = addTaskForm.querySelector("#dev_name")
    selectList.innerHTML = "";
    for (let dev of list) {
        selectList.innerHTML += `<option value="${dev.id}">${dev.name}</option>`;
    };
};

devList(developers);

function taskListView(tasks) {
    for (let task of tasks) {
        let developer = developers.find(function (dev) { return `${dev.id}` == task.dev_id });
        log(task);
        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task');
        taskDiv.setAttribute('data-id', task.id);
        let delBtn = document.createElement('button');
        delBtn.innerText = "🗑️";
        delBtn.addEventListener('click', () => {
            if (confirm("Are you sure to delete this contact?")) {
                tasks.splice(getObjIndex(task.id, tasks), getObjIndex(task.id, tasks) + 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            document.location.reload();
        });
        log(taskDiv);
        taskDiv.innerHTML = `
                <div><strong>${developer.name}</strong> <span>${new Date(task.dedline).toUTCString()}</span></div>
                <hr>
                <p>${task.task}</p>
                <br>
                <span class="status">status</span>`;
        taskDiv.append(delBtn);

        taskDiv.addEventListener('click', function () {
            addTaskForm.task_id.value = task.id;
            addTaskForm.dev_name.value = developer.id;
            addTaskForm.task_text.value = task.task;
            addTaskForm.dedline.value = task.dedline;
        });
        taskList.appendChild(taskDiv);
    };
};

taskListView(tasks);

// function sayHi() {
//     console.log('hi');
// };
// export {
//     log,
//     developers,
//     tasks,
//     taskList,
//     getObjIndex,
//     hashPass
// };