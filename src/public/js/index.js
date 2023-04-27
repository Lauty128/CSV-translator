import table from "./table.js";

const Table = new table(4,7)

Table.create()

document.getElementById("newColumn_button").addEventListener('click', e=> Table.newColumn(e) )
document.getElementById("newRow_button").addEventListener('click', e=> Table.newRow(e) )