const log = console.log;
const randInt = (start = 0, end) => Math.floor(start + Math.random() * (end - start));

const randomHex = () => `#${Math.random().toString(16).slice(2, 8)}`;


// 2. էջում տպել պատահական քանակությամբ, պատահական չափերի, պատահական տեղերում, պատահական գույների շրջանակներ,

for (let i = 0; i < randInt(100, 1000); i++) {
    let circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.width = randInt(0, 500) + "px";
    circle.style.height = randInt(0, 500) + "px";
    circle.style.left = randInt(0, window.innerWidth) + "px";
    circle.style.top = randInt(0, window.innerHeight) + "px";
    circle.style.backgroundColor = randomHex();
    document.body.appendChild(circle);
};