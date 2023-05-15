import { table, inherited_table, count_rows_columns, count_rows_columns_of_simple_array } from "./table.js";
import { parseIntervalData } from './intervals.js'

let Table;

//------------- Table
if(window.location.pathname == '/table'){
    if(localStorage.getItem('table_data')){
        const data = JSON.parse(localStorage.getItem('table_data'))
        const { rows, columns } = count_rows_columns(data)

        Table = new inherited_table(rows,columns)
        Table.printData(data)
        localStorage.removeItem('table_data')
    }
    else Table = new table()

    if(localStorage.getItem('interval_data')){
        const interval_data = parseIntervalData(JSON.parse(localStorage.getItem('interval_data')))
        localStorage.removeItem('interval_data')
        Table.table.insertAdjacentElement('afterend', interval_data)
    }
}

//------------- EVENTS OF THE TABLE
document.querySelector(".TableContainer").addEventListener("click", async e=>{
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

        case 'createIntervalButton':
            submitInterval()
        break;

        case 'cancelIntervalButton':
            if(localStorage.getItem('interval_table')){
                localStorage.removeItem('interval_table')
                Table.rows = 3
                Table.columns = 3
                Table.create()
            }
        break;

        case "comeBackButton":
            window.location.href = '/'
        break;
    }
})

//---------------------- Intervals Page
if(window.location.pathname == '/intervals'){
    //---------- Load to the table
    if(localStorage.getItem('interval_table')){
        const data = JSON.parse(localStorage.getItem('interval_table'))
        const {rows, columns} = count_rows_columns_of_simple_array(data)

        Table = new inherited_table(rows,columns)
        Table.printNumbers(data)
    }
    else Table = new table()

    //--------- This avoids the default behavior of the form 
    document.querySelector(".Table").addEventListener('submit', e=> e.preventDefault())
}

async function submitInterval(){
    const quantityInput = document.getElementById("quantity-input").value
    const typeInput = document.getElementById("intervalType-input").value
    
    if(quantityInput <= 0) return new Error('El valor debe ser mayor a 0(cero)')
    const data = new FormData(document.getElementById("Table"))
    const body = new URLSearchParams(data)
    const response = await fetch(`/api/intervals?type=${typeInput}&quantity=${quantityInput}`, { method:'post', body })
                            .then(response => response.json())

    if(response.status == 200){
        delete response.status
        localStorage.setItem('table_data', JSON.stringify(response.table))
        localStorage.setItem('interval_table', JSON.stringify(response.numbers))
        delete response.table
        localStorage.setItem('interval_data', JSON.stringify(response))
        window.location.href = '/table'
    }
}

//---------------------- Submit Page
if(window.location.pathname == '/submit'){
    document.getElementById("input_file").addEventListener("change", async e=>{
        e.preventDefault()
        const body = new FormData(document.getElementById("Table"))
        const response = await fetch('/api/submit', { method:'post', body })
                            .then(response => response.json())

        if(response.status === 200){
            localStorage.setItem('table_data', JSON.stringify(response.data))
            window.location.href = '/table'
        }
        else{
            throw Error("Ocurrio un error al subir el archivo")
        }
    })
}
