const log = console.log;
const randInt = (start=0, end) => Math.floor(start + Math.random() * (end - start));

// 1. ունենք օգտվողների զանգված, ամեն էջի թարմացման ժամանակ, էկրանին ցույց տալ պատահակա օգտվողի տվյալներ

let users = [
    {name: "John", age: 18},
    {name: "Tom", age:25},
    {name: "Natali", age:20},
    {name: "Henry", age:30},
    {name: "Lola", age:17}
]

const h1 = document.createElement("h1");
let randomUser = users[randInt(0, users.length)];
h1.innerText = `My name is ${randomUser.name}, im ${randomUser.age} years old.`;
document.body.appendChild(h1);