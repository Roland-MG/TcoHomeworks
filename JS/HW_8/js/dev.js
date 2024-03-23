const log = console.log;

const getDeveloperList = () => JSON.parse(localStorage.getItem('developers')) || [];
let developers = getDeveloperList();

const getTaskList = () => JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = getTaskList();
const getObjIndex = (id, arr) => {
    let index = arr.indexOf(arr.find(value => value.id == id));
    return index >= 0 ? index : false;
};

let cookies = {};
document.cookie.replace(/;/g, '')
    .split(' ')
    .map((e) => e.split('='))
    .map((e) => { cookies[e[0]] = e[1] });

jQuery(document).ready(function ($) {


    const modal = $('#login_modal');

    const loginForm = $("#login_form");

    const taskList = $("#task_list");

    const showPassBtn = $(".show_pass_btn");

    const logOutBtn = $('#logout_btn');

    logOutBtn.click(() => {
        document.cookie = "id=; expires = Thu, 18 Dec 2013 12:00:00 UTC";
        document.location.reload()
    })


    if (cookies.id) {
        taskListView(tasks, cookies.id);
        log(cookies.id)
    } else {
        modal.css({ display: 'block' });
        log("log in")
    }

    async function Login(id) {

    };


    function taskListView(tasks, id) {
        $(modal).css({ display: 'none' });
        taskList.css({ display: 'flex' })
        for (let task of tasks.filter(e => e.dev_id == id)) {
            log(task)
            let developer = developers.find(dev => `${dev.id}` == task.dev_id);
            log(task);
            let taskDiv = $('<div>')
            taskDiv.addClass('task');
            taskDiv.attr('data-id', task.id);
            let delBtn = document.createElement('button');

            log(taskDiv);
            taskDiv.html(`
                <div><strong>${developer.name}</strong> <span>${new Date(task.dedline).toUTCString()}</span></div>
                <hr>
                <p>${task.task}</p>
                <br>
                <span class="status">status</span>`)

            taskList.append(taskDiv);
        };
    };

    showPassBtn.on('click', function () {
        if (this.innerHTML === "🫣") {
            this.innerHTML = "🫢";
            $('#pass').attr('type', 'text')
        } else {
            this.innerHTML = "🫣";
            $('#pass').attr('type', 'password')
        };

    });

    $(loginForm).submit(async function (event) {
        event.preventDefault();
        let dev = developers[developers.indexOf(developers.find(val => val.login === this.login.value))];
        log(Date.now().toString())
        if (dev && await hashPass(this.pass.value) == dev.pass) {
            document.cookie = `id=${dev.id}`
            localStorage.setItem('developers', JSON.stringify(developers));
            document.location.reload()
        } else {
            alert('Incorrect login or password')

        }

    });


    async function hashPass(pass) {
        let response = await fetch('https://api.hashify.net/hash/md5/hex?value=' + pass);
        let jsn = await response.json();
        return jsn.Digest
    };

});