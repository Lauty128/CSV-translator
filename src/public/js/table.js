class table{
    constructor(rows = 3, columns = 3){
        this.table = document.getElementById("Table")
        this.columns = columns
        this.rows = rows
    }

    create(){
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

    submit(){

    }

    reset(){

    }

    newRow(e){
        e.preventDefault()
        console.log("Hola gatin \nMe dijieron que queres crear una nueva fila ");
        // const fragment = document.createDocumentFragment()
        // const p = document.createElement('p')
        // p.textContent = "HOLA GATIN"
        // this.table.insertAdjacentElement('beforeend', p)
    }

    newColumn(e){
        e.preventDefault()
        console.log("Hola gatin \nMe dijieron que queres crear una nueva columna ");

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

export default table