const log = console.log;
const randInt = (start = 0, end) =>
    Math.floor(start + Math.random() * (end - start));

const randomHex = () => `#${Math.random().toString(16).slice(2, 8)}`;

// 4. էջում տպել պատահական քանակությամբ, պատահական չափերի, պատահական տեղերում, պատահական գույների շրջանակներ, շրջանակների մեջ դնել պատահական թվեր, եթե շրջանականերից մեկում հայտնվի 44 թիվը, շրջանակը ներկել կապույտ գույնով

for (let i = 0; i < randInt(10, 100); i++) {
    let circle = document.createElement("div");
    circle.innerText = randInt(40, 50);
    circle.style.display = "flex";
    circle.style.justifyContent = "center";
    circle.style.alignItems = "center";
    circle.style.textTransform = "";
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.width = randInt(10, 500) + "px";
    circle.style.height = randInt(10, 500) + "px";
    circle.style.left = randInt(0, window.innerWidth) + "px";
    circle.style.top = randInt(0, window.innerHeight) + "px";
    circle.style.backgroundColor =
        circle.innerText == 44 ? "blue" : randomHex();
    document.body.appendChild(circle);
}
