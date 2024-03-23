const log = console.log;
// 1. bubble sort ալգորիթմով սորտավորել թվային զանգված

let mas = [2, 5, 1, 9, 3, 8, 7, 4, 6].sort

const bubbleSort = (arr=[]) => {
    let res = arr
    for (let n = 0; n < arr.length; n++) {
        for (let i = 0; i < res.length-1; i++) {
            if (res[i] > res[i+1]) 
                [res[i], res[i+1]] = [res[i+1], res[i]]
            };
        };

    return res;
};

log(bubbleSort(mas));

// 2. գրել ֆունկցիա, որը կվերադարձնի տրված միջակայքերում պատահակ թիվ

const randInt = (start=0, end) => Math.floor(start + Math.random() * (end - start));

log(randInt(50,100));
log(randInt(0, -10));
log(randInt(0,10));


// 3. գրել ֆունկցիա, որը կվերադարձնի rgb գունային համակարգում պատահական գույնի կոդ` rgb(255, 11, 34);

const randomRgb = () => `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)},)`;

log(randomRgb());
log(randomRgb());
log(randomRgb());


// 4. գրել ֆունկցիա, որը կվերադարձնի HTML HEX (6 symbol) գունային համակարգում պատահական գույնի կոդ` #FF12AC
const randomHex = () => `#${Math.random().toString(16).slice(2, 8)}`;

log(randomHex());
log(randomHex());
log(randomHex());
log(randomHex());