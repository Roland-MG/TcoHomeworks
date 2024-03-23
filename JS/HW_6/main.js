const log = console.log;
const dir = console.dir;

// todo ստեղծել հեռախոսային գրքույկ հետևյալ պայմաններով
// todo* 1․ էջում ցույց տալ բոլոր կոնտակտների անունները, որոնց վրա սեխմելիս պետք է ցույց տալ տվյալ կոնտակտի հեռաոսահամարը,
// todo* 2․ կոնտակտ որոնելու հնարավորություն, ըստ անվան,
// todo* 3․ կոնտակտների խմբագրելու հնարավորություն,
// todo* 4․ ունիկալ տվյալների ապահովում, ըստ անվան կամ հեռախոսահամար,
// todo* 5․ կոնտակտը հեռացնելու հնարավորություն, ջնջելու կոճակի վրա սեխմելիս մոդալ պատուհան բացել և հառցնել <<Արդյոք ուզում եք հեռացնել կոնտակտը>> Ok սեխմելու ժամանակ, նոր կատարել այն,
// todo* 6․ կոնտակտների ցուցակի վերևի մասում դնել <<Ստեղծել նոր կոնտակտ>> կոճակ, որի վրա սեխմելու ժամանակ բացվում է  մոդալ պատուհան՝ ֆորմայով(երկու դաշտ՝ անվան և հեռախոսահամարի համար)

// TODO* 1․ գրել ֆունկցիա, որը կստանա օգտվողի ծննդյան ամսաթիվը և կվերադարձնի նրա տարիքը, հաշվի առնելով ամիսը և օրը
// TODO* 2. ՀԵՌԱԽՈՍԱՀԱՄԱՐՆԵՐԻ MASK` +374, +478


const getContacts = () => JSON.parse(localStorage.getItem("contacts")) || [];
let contacts = getContacts();



// const getAge = date => Math.floor(((Date.now() - Date.parse(date)) / (1000 * 60 * 60 * 24)) / 365);
function getAge() {
    let [day, month, year] = [this.getDate(), this.getMonth(), this.getFullYear()];
    let current_date = new Date();
    let [current_day, current_month, current_year] = [current_date.getDate(), current_date.getMonth(), current_date.getFullYear()];
    let res_year = current_year - year;
    if (current_day > day) month--;
    if (current_month < month) res_year--;
    return res_year;
};

Date.prototype.getAge = getAge;

const getObjIndex = id => {
    let index = contacts.indexOf(contacts.filter(value => value.id == id)[0]);
    return index >= 0 ? index : false;
};
const getObj = id => contacts[getObjIndex(id)] || false;


const uniqueObj = (name, num) => !(contacts.some(value => value.name == name || value.num == num));

let modal_window = document.body.querySelector(".modal_window");
let edit_window = modal_window.querySelector(".edit_contact");
let modal_bg = modal_window.querySelector(".modal_bg");
let edit_form = modal_window.querySelector("#con_edit_form");


let today = new Date();
edit_form.date.max = today.toISOString().split('T')[0];
document.body.querySelector("#add_contact").addEventListener("click", () => {
    modal_window.classList.add("flex");
    edit_form.querySelector("#modal_title").innerHTML = "Add contact";
    modalForm();
});

edit_form.addEventListener("reset", (e) => {
    e.preventDefault();
    modal_window.classList.remove("flex")
    modal_window.querySelector("p").style.display = "none";

});


function closeModalSave() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    modal_window.classList.remove("flex")
    contactsList(contacts);
};


edit_form.addEventListener('submit', function (e) {
    e.preventDefault();
    let obj = contacts[getObjIndex(this.id.value)] || {};

    [obj.id, obj.name, obj.code, obj.num, obj.b_day] = [this.id.value, this.name.value.replace(' ', ''), this.codes.value, this.num.value, this.date.value];
    if (getObjIndex(this.id.value) && uniqueObj(obj.name, obj.name)) {
        closeModalSave();
    } else if (!getObjIndex(this.id.value) && uniqueObj(obj.name, obj.name)) {
        contacts.push(obj);
        closeModalSave();
    } else {
        this.querySelector("p").style.display = "block";
    };
});

modal_bg.addEventListener("click", () => {
    modal_window.classList.remove("flex")
    modal_window.querySelector("p").style.display = "none";

});


function modalForm(name = "", code = "374", num = "", b_day = "", id) {
    let pk = id || Date.now();
    edit_form.elements.id.value = pk;
    edit_form.elements.name.value = name;
    edit_form.elements.codes.value = code;
    edit_form.elements.num.value = num;
    edit_form.elements.date.value = b_day;
};

function contactsList(contacts) {
    const container = document.body.querySelector("#container");
    container.innerHTML = contacts.length === 0 ? "<h2>No results found</h2>" : "";

    setTimeout(() => {
        let i = 1;
        for (let e of contacts) {
            let b_day = new Date(e.b_day);
            let contact = document.createElement("div");
            let edit_btn = document.createElement("button");
            let del_btn = document.createElement("button");
            edit_btn.textContent = "📝";
            edit_btn.setAttribute("title", "Edit contact");
            del_btn.textContent = "🗑️";
            del_btn.setAttribute("title", "Delete contact");
            edit_btn.classList.add("btn");
            del_btn.classList.add("btn", "del_btn");
            contact.style.width = "50px";
            contact.classList.add("contact");
            contact.addEventListener("mousedown", () => {
                contact.querySelector(".name").style.display = "none";
                contact.querySelector(".num").style.display = "flex";
            });
            contact.addEventListener("mouseleave", () => {
                contact.querySelector(".name").style.display = "flex";
                contact.querySelector(".num").style.display = "none";
            });
            edit_btn.addEventListener("click", () => {
                modal_window.classList.add("flex");
                edit_form.querySelector("#modal_title").innerHTML = "Edit contact";
                modalForm(e.name, e.code, e.num, e.b_day, e.id);
            });
            del_btn.addEventListener("click", () => {
                if (confirm("Are you sure to delete this contact?")) {
                    contacts.splice(contacts.indexOf(e), contacts.indexOf(e) + 1);
                    closeModalSave();
                };
            });
            setTimeout(() => {
                contact.innerHTML = `
            <span class="name">${e.name} ${b_day.getAge()}</span>
            <span class="num"><a href="tel:${e.code}${e.num}">+${e.code} ${e.num}</a></span>
            <span class="con_btns"></span>`;

                contact.querySelector(".con_btns").append(edit_btn, del_btn);
                container.appendChild(contact);
                for (let n = 50; n <= 501; n++) {
                    setTimeout(() => {
                        contact.style.width = n <= 500 ? n + 'px' : '100%';
                    }, n)
                };
            }, i * 30);
            i++;
        };
    }, 500)

};


contactsList(contacts);

const find_form = document.body.querySelector("#find_form");
find_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let obj = contacts.filter((e) => e.name.toLowerCase().includes(this.elements.find_text.value.toLowerCase()));

    contactsList(obj);

});
const search = (v) => {
    find_form.submit();
    // log(v);
};


