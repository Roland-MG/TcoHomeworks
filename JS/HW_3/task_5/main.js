const log = console.log;

const table = document.createElement("table");
table.setAttribute("border", "1");

const tableGenerator = (table, rows = 1, cols = 1) => {
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let col = document.createElement("td");
            col.style.width = "50px";
            col.style.height = "20px";
            row.appendChild(col);
        }
        table.appendChild(row);
    }
};

tableGenerator(table, (rows = 5), (cols = 6));

document.body.appendChild(table);
