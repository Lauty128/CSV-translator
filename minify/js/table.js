export class table{
    constructor(rows = 3, columns = 3){
        this.table = document.getElementById("Table")
        this.columns = columns
        this.rows = rows

        this.create()
    }

    create(){
        this.table.innerHTML = ''
        const fragment = document.createDocumentFragment()
        for(let index_rows = 0, total_rows = this.rows; index_rows < total_rows; index_rows++){
            const div = document.createElement('div')
            div.classList.add(`Table__row`)
            div.classList.add(`Table__row${index_rows + 1}`)

            for(let index_columns = 0, total_columns = this.columns; index_columns < total_columns; index_columns++){
                const input = document.createElement('input')
                input.classList.add("Table__input")
                input.setAttribute('name', `Table__${index_rows + 1}-${index_columns + 1}`)
                input.setAttribute('type', 'text')

                div.appendChild(input)
            }
            fragment.appendChild(div)
        }
        this.table.appendChild(fragment)
        this.createReference()
    }

    reset(){
        this.table.reset()
    }

    newRow(e){
        e.preventDefault()
        const referenceRow = document.querySelector(".Table__row--reference")
        this.rows += 1;

        const fragment = document.createDocumentFragment()
        const div = document.createElement('div')
        div.classList.add(`Table__row`)
        div.classList.add(`Table__row${this.rows}`)

        for(let index = 0, total_columns = this.columns; index < total_columns; index++){
            const input = document.createElement('input')
            input.classList.add("Table__input")
            input.setAttribute('name', `Table__${this.rows}-${index + 1}`)
            input.setAttribute('type', 'text')

            fragment.appendChild(input)
        }

        const card = document.createElement('div')
        card.classList.add("Table__input")
        card.classList.add("Table__input--reference")
        fragment.appendChild(card)

        div.appendChild(fragment)

        referenceRow.insertAdjacentElement('beforebegin', div)
    }

    newColumn(e){
        e.preventDefault()
        this.columns += 1;
        
        for(let index = 0, total_rows = this.rows; index < total_rows; index++){
            const lastColumnReference = document.querySelector(`.Table__row${index + 1}  .Table__input--reference`)
            
            const input = document.createElement('input')
            input.classList.add("Table__input")
            input.setAttribute('name', `Table__${index + 1}-${this.columns}`)
            input.setAttribute('type', 'text')
            
            lastColumnReference.insertAdjacentElement('beforebegin', input)
        }

        const rowReference = document.querySelector(".Table__row--reference")
        const card = document.createElement('div')
        card.classList.add("Table__input")
        card.classList.add("Table__input--reference")

        rowReference.insertAdjacentElement("beforeend", card)

    }

    createReference(){
        const div = document.createElement('div')
        div.classList.add(`Table__row`)
        div.classList.add(`Table__row--reference`)

        for(let index = 0, total_rows = this.rows; index < total_rows; index++){
            const rowContainer = document.querySelector(`.Table__row${index + 1}`)
            let card;
            if(index === 0){
                card = document.createElement('button')
                card.textContent = "Nueva Columna"
                card.setAttribute('id', 'newColumn_button')
            }
            else card = document.createElement('div')

            card.classList.add("Table__input")
            card.classList.add("Table__input--reference")
            
            rowContainer.insertAdjacentElement('beforeend', card)
        }

        for(let index = 0, total_columns = this.columns; index <= total_columns; index++){
            let card;
            if(index === 0){
                card = document.createElement('button')
                card.textContent = "Nueva Fila"
                card.setAttribute('id', 'newRow_button')
            }
            else card = document.createElement('div')

            card.classList.add("Table__input")
            card.classList.add("Table__input--reference")

            div.appendChild(card)
        }

        this.table.insertAdjacentElement('beforeend', div)
    }


}

export class inherited_table extends table{
    printData(data){
        for(let index_rows = 0, total_rows = this.rows; index_rows < total_rows; index_rows++){
            for(let index_columns = 0, total_columns = this.columns; index_columns < total_columns; index_columns++){
                const input = document.getElementsByName(`Table__${index_rows + 1}-${index_columns + 1}`)
                let value = data[index_rows][index_columns]
                    ? data[index_rows][index_columns]
                    : ''
                    
                if(value[0] === '"') value = value.slice(1, -1)
                input[0].value = value
            }
        }
    }

    printNumbers(data){
        let index = 0
        for(let index_rows = 0, total_rows = this.rows; index_rows < total_rows; index_rows++){
            for(let index_columns = 0, total_columns = this.columns; index_columns < total_columns; index_columns++){
                const input = document.getElementsByName(`Table__${index_rows + 1}-${index_columns + 1}`)    
                input[0].value = data[index] || ''
                index++
            }
        }
    }
}

export function count_rows_columns_of_simple_array(array){
    const length = array.length;
    //if(length == 9) return { rows: 3, columns:3 }

    const rows = Math.round(Math.sqrt(length));
    const columns = Math.round(array.length/rows)

    return{ rows, columns }
}

export function count_rows_columns(array){
    const rows = array.length;
    const columns = array[0].length;

    return { columns, rows } 
}