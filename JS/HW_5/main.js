const log = console.log;
const randInt = (start = 0, end) => Math.floor(start + Math.random() * (end - start));

const randomHex = () => `#${Math.random().toString(16).slice(2, 8)}`;

const startGame = () => {
    clearPlayGround();
    let time_txt = document.querySelector("#time");
    let points_txt = document.querySelector("#points");
    let points = 0;
    let counter = 10;
    time_txt.innerText = counter + 's';
    let playground = document.querySelector("#playground");
    let span_window = document.querySelector("#window");
    span_window.style.display = "none";
    let state = true;
    let timeInterval = setInterval(() => {
        if (state) {
            if (counter > 0) {
                counter--;
                time_txt.innerText = counter + 's';
                checkPoints();
                state = true;
            } else {
                clearInterval(timeInterval);
                span_window.style.display = "flex";
                checkPoints();
                clearPlayGround();
                state = false;
                return;
            }
        };

    }, 1000);


    function checkPoints() {
        if (counter >= 0 && points > 9) {
            clearPlayGround();
            span_window.querySelector("span").innerText = "YOU WIN \n Play again"
            points_txt.innerText = counter = points = 0;
            span_window.style.display = "flex";
            clearInterval(timeInterval);
        } else if (counter <= 0 && points < 10) {
            clearPlayGround();
            span_window.querySelector("span").innerText = "YOU LOSE \n Play again"
            points_txt.innerText = counter = points = 0;
            span_window.style.display = "flex";
        };
    };

    for (let i = 0; i < randInt(10, 30); i++) {
        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        let size = randInt(50, 300)
        circle.style.width = circle.style.height = size + "px";
        circle.style.left = randInt(0, playground.clientWidth - size - 10) + "px";
        circle.style.top = randInt(0, playground.clientHeight - size - 10) + "px";
        circle.style.backgroundColor = randomHex();
        circle.addEventListener("click", () => {
            playground.removeChild(circle);
            points++;
            points_txt.innerText = points;
        });
        playground.appendChild(circle);
        playground.classList.remove("fade-in")
        setInterval(() => {
            if (circle.style.opacity < 1.1 && circle.style.opacity > 0) {
                circle.style.opacity += 0.1;
            } else { return };
        }, 200);
    };
};

const start_btn = document.querySelector("#start_btn");

start_btn.addEventListener("click", () => {

    // document.querySelector("#playground").classList.add("fade-in");
    // document.querySelectorAll(".circle").forEach((е) => { e.remove() });
    clearPlayGround();
    startGame();

    // log(start_btn)
});
function clearPlayGround() {
    document.querySelectorAll(".circle").forEach(element => {
        element.remove();
    });
};
clearPlayGround();