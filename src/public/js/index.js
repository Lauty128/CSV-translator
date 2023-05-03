import { table, inherited_table, count_rows_columns } from "./table.js";

let Table;

//--------- Table
if(window.location.pathname == '/create'){
    Table = new table(3,3)
    Table.create()
}

//------------- EVENTS OF THE TABLE
document.querySelector(".TableContainer").addEventListener("click", e=>{
    const { target } = e

    switch(target.getAttribute('id')){
        case 'newRow_button':
            Table.newRow(e)
        break;

        case 'newColumn_button':
            Table.newColumn(e)
        break;

        case "cancelTable":
            Table.reset()
        break;
    }
})

//--------- Submit Page
if(window.location.pathname == '/submit'){
    document.getElementById("input_file").addEventListener("change", async e=>{
        e.preventDefault()
        const body = new FormData(document.getElementById("Table"))
        const response = await fetch('/api/submit', { method:'post', body })
                            .then(response => response.json())

        if(response.status === 200){
            //------- Show buttons
            document.getElementById('submitFileButton').classList.remove("ButtonComponent--hide")
            document.getElementById('comeBackButton').classList.remove("ButtonComponent--hide")
            //------- Create table 
            const { rows, columns } = count_rows_columns(response.data)
            Table = new inherited_table(rows,columns)
            Table.table.innerHTML = ''
            Table.create()
            Table.printData(response.data)
        }   
    })
    
}