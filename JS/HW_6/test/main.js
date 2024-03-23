const log = console.log;
const dir = console.dir;


let old = new Date(1996, 8, 22);

const getAge = (date) => Math.floor(((Date.now() - Date.parse(date)) / (1000 * 60 * 60 * 24)) / 365);

let form = document.body.querySelector("#myForm");
form.addEventListener('submit', (e) => {
    e.preventDefault();

    log(getAge(form.date.value));
});

log(getAge('1996-8-22'));
log((1000 * 60 * 60 * 24 * 365.25));
log(Date());