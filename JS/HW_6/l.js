let log = console.log;

function findBinary(n) {
    if (n == 0) return '';
    let res = n % 2;
    return findBinary((n - res) / 2) + `${res}`
};

log(44, findBinary(44));
log(127, findBinary(127));
log(1, findBinary(1));
log(64, findBinary(64));
log(80, findBinary(80));