const log = console.log;

function range(start = 0, end, step = 1) {
    let res = [];
    for (let i = start; i !== end; i += step) res.push(i);
    return res;
};

let tbody = document.body.querySelector("#calendar");

const getNotes = () => JSON.parse(localStorage.getItem("notes")) || [];
let notes = getNotes();
localStorage.setItem('notes', JSON.stringify(notes));

const getCalendar = (year = 2023, month = 1) => {

    const firstDay = new Date(year, month - 1, 1);
    const date = new Date(year, month - 1, 0);
    let arr1 = [...range(1, date.getDate() + 1)];
    arr1.splice(0, 0, ...range(1 - firstDay.getDay(), 0));
    let res = {
        year,
        month,
        calendarArr: []
    };
    for (let n = 0; n < arr1.length; n += 7) {
        res.calendarArr.push(arr1.slice(n, n + 7));
    };
    log(res);
    return res;
};


let monthForm = document.body.querySelector("#monthForm");

let noteEditor = document.body.querySelector("#note_editor");

let noteList = document.body.querySelector("#note_list");
log(noteList)

let modal = document.body.querySelector(".modal");

let modal_bg = modal.querySelector(".modal_bg");

modal_bg.addEventListener('click', () => modal.classList.remove('flex'))

let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


function noteListView(noteList, noteListArr) {
    // noteList.innerHTML = "";
    for (let note of noteListArr) {
        noteList.innerHTML += `
            <div class="note">
                <span class="note_date">${note.date}</span>
                <br>
                <br>
                <p>${note.note}</p>
            </div>`
    };
};

const paintCalendar = (calendarArr, tbody) => {


    tbody.innerHTML = "";
    document.body.querySelector("h1").innerHTML = monthNames[+this.month.value - 1];
    const today = new Date();

    for (let i of calendarArr.calendarArr) {
        let row = document.createElement("tr");
        row.innerHTML = "";
        tbody.appendChild(row);

        for (let j of i) {
            let td = document.createElement("td")
            if (j > 0) {
                if (j == today.getDate() && calendarArr.year == today.getFullYear() && calendarArr.month == today.getMonth() + 1) {
                    td.classList.add("today");
                };
                if (notes.find((e) => e.date == `${j}.${calendarArr.month}.${calendarArr.year}`)) {
                    td.classList.add('note_calendar');
                }
                td.innerText = j;
                td.addEventListener('dblclick', () => {
                    noteEditor.note_date.value = `${j}.${calendarArr.month}.${calendarArr.year}`;
                    noteEditor.note.value = "";

                    log(`${j}.${calendarArr.month}.${calendarArr.year}`);

                    // todo!
                    // log(notes.filter((e) => e.date == `${j}.${calendarArr.month}.${calendarArr.year}`) || false);
                    modal.classList.add('flex');
                })
                td.addEventListener('click', () => {
                    noteList.innerHTML = "";
                    noteListView(noteList, notes.filter((e) => e.date == `${j}.${calendarArr.month}.${calendarArr.year}` || false));

                })
                row.appendChild(td)
            } else {
                // row.innerHTML += "<td></td>";
                td.innerText = "";
                row.appendChild(td);
            };
        };
    };
};


monthForm.addEventListener("submit", (e) => {
    e.preventDefault();
    paintCalendar(getCalendar(+this.year.value, +this.month.value), tbody)
});

noteEditor.addEventListener('reset', (e) => {
    e.preventDefault();
    modal.classList.remove('flex');
});
noteEditor.addEventListener('submit', function (e) {
    e.preventDefault()
    notes.push({
        id: Date.now(),
        date: `${this.note_date.value}`,
        note: this.note.value,
    });
    localStorage.setItem('notes', JSON.stringify(notes))
    modal.classList.remove('flex');
    window.location.reload();
    // log(this.note_year.value)
})

paintCalendar(getCalendar(+monthForm.year.value, +monthForm.month.value), tbody)

noteListView(noteList, notes);