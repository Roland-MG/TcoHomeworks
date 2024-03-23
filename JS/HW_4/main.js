const log = console.log;
const dir = console.dir;

const apiData =
    JSON.parse('[{"id":"rec1JZlfCIBOPdcT2","title":"Samsung Galaxy S8","price":"399.99","img":"https://www.course-api.com/images/cart/phone-1.png","amount":1},{"id":"recB6qcHPxb62YJ75","title":"google pixel","price":"499.99","img":"https://www.course-api.com/images/cart/phone-2.png","amount":1},{"id":"recdRxBsE14Rr2VuJ","title":"Xiaomi Redmi Note 2","price":"699.99","img":"https://www.course-api.com/images/cart/phone-3.png","amount":1},{"id":"recwTo160XST3PIoW","title":"Samsung Galaxy S7","price":"599.99 ","img":"https://www.course-api.com/images/cart/phone-4.png","amount":1}]');



let cart = JSON.parse(localStorage.getItem("cart")) || {};

let products = document.querySelector("#products");

for (data of apiData) {
    let productCard = `<article id="${data.id}" class="border border-solid border-black rounded w-48 h-72 flex flex-col items-center gap-2 m-4 p-2">
        <img class="w-[148px]" src="${data.img}" alt="${data.title}" >
            <hr>
                <h2 class="font-bold">${data.title}</h2>
                <p>${data.price * data.amount}</p>
                <a data="${data.id}" href="#" class="bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white rounded px-2 py-1">🛒 Add to cart</a>
            </article>`;
    products.innerHTML += (productCard);
};

let productList = products.querySelectorAll("article");
productList.forEach(product => {
    let btn = product.querySelector("a")
    let id = btn.getAttribute("data")
    btn.addEventListener("click", () => {
        cart[id] == null ? cart[id] = 1 : cart[id] += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        viewCartList();
    });
});


let cartBlock = document.querySelector("#cart");


function viewCartList() {
    cartBlock.innerHTML = "";
    for (itemId in cart) {
        let index = apiData.findIndex(item => item.id === itemId);
        cartBlock.innerHTML += `<article data-id="${itemId}" class="border border-solid border-black rounded w-96 flex flex-row items-center gap-3 m-4 p-2">
        <img class="w-14" src="${apiData[index].img}" alt="${apiData[index].title}">
        <hr>
        <div class="w-full">
            <h3 class="font-bold w-full">${apiData[index].title}</h3>
            <div class="flex justify-between items-center "><span data-price="${itemId}_price">${apiData[index].price * cart[itemId]}</span>
            <span class="inline-flex">
                    <button type="button" data-button-id="${itemId}_minus"
                        class="bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-l-lg text-purple-400 text-center m-0">➖
                    </button>
                    <span data-count="${itemId}_count" class="bg-gray-200 border p-1 m-0">${cart[itemId]}</span>
                    <button type="button" data-button-id="${itemId}_plus"
                        class="bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-r-lg text-purple-400 text-center ">➕
                    </button>
                    <button type="button" data-button-id="${itemId}_del"
                    class="bg-red-400 hover:bg-red-500 py-1 px-2 rounded-lg text-purple-400 text-center ml-1">🗑️
                </button>
                </span></div>
        </div>

    </article>`;
        // addEventListeners();
    };
    addEventListeners();
};

viewCartList();


function addEventListeners() {
    let cartProducts = cartBlock.querySelectorAll("article");
    cartProducts.forEach(product => {
        let id = product.getAttribute("data-id");
        let index = apiData.findIndex(item => item.id === id);
        let counter = product.querySelector(`span[data-count="${id}_count"]`);
        let price = product.querySelector(`span[data-price="${id}_price"]`);
        let minusBtn = product.querySelector(`button[data-button-id="${id}_minus"]`);
        let plusBtn = product.querySelector(`button[data-button-id="${id}_plus"]`);
        let delBtn = product.querySelector(`button[data-button-id="${id}_del"]`);


        const __dataUpdate = () => {
            localStorage.setItem('cart', JSON.stringify(cart));
            counter.innerHTML = cart[id];
            price.innerHTML = cart[id] * apiData[index].price;
        }

        delBtn.addEventListener("click", () => {
            delete cart[id];
            localStorage.setItem('cart', JSON.stringify(cart));
            viewCartList();
        });
        minusBtn.addEventListener("click", () => {
            cart[id] == null || cart[id] < 2 ? cart[id] = 1 : cart[id] -= 1;
            __dataUpdate();
        });

        plusBtn.addEventListener("click", () => {
            cart[id] == null || cart[id] < 1 ? cart[id] = 1 : cart[id] += 1;
            __dataUpdate();

        });
        log(apiData[index].price);
    });
};
addEventListeners();

// localStorage.removeItem("cart");