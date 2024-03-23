//գրել ֆունկցիա, որը կստանա n թիվ, և կվերադարձնի n թվի նիշերի գումարը
const digSum = (n) => {
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = (n - (n % 10)) / 10;
    }
    return sum;
};

console.log(digSum(123));

// withouth sorting
const minMaxSum = (arr = []) => {
    let min = arr[0],
        max = min;
    for (let item of arr) {
        min = min > item ? item : min;
        max = max < item ? item : max;
    }
    return min + max;
};

let arr1 = [2, 6, 1, 9, 0, 8];
console.log(minMaxSum(arr1));

// by sorting 
const minMaxSum2 = (arr = []) => {
	arr.sort((a, b) => a-b);
	return arr[arr.length -1]
};
console.log(minMaxSum2(arr1));

//գրել ֆունկցիա, որը որպես արգումենտ ստանում է զանգված և վերադարձնում է նոր զանգված, որտեղ պետք է լինեն ֆունկցիային փոխանցված բոլոր զույգ արժեքները,
const evenList = (arr=[]) => {
	let evens = []
	for(let item of arr){
		if(item%2===0 && item!==0){
          evens.push(item);
        };
	};
	return evens
};

console.log(evenList(arr1));

//գրել ֆունկցիա, որը որպես արգումենտ ստանում է զանգված և վերադարձնում է true եթե զանգվածի բոլոր արժեքները զույգ են
// variant 1
const allEven = (arr=[]) => {
	let res = true
	for (let item of arr){
		if(item % 2 !== 0){
			res = false
			break
		};
	};
	return res
}

let arr2 = [2, 4, 6]
console.log(allEven(arr1))
console.log(allEven(arr2))

// variant 2
const allEven2 = (arr=[]) => arr.every((item) => item%2===0)
console.log(allEven(arr1))
console.log(allEven2(arr2))








