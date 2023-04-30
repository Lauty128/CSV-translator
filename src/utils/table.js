export function formatBody(body){
    const array_of_keys = Object.keys(body)
    const rows = countRows(array_of_keys);
    const columns = array_of_keys.length/rows

    let data = new Array()

    for(let index_row = 1; index_row <= rows; index_row++ ){
        const column_array = []
        for(let index_column = 1; index_column <= columns; index_column++ ){
            column_array.push(body[`Table__${index_row}-${index_column}`])
        }
        data.push(column_array)
    }

    return data
}


//---------- Utils of the Utils
export function countRows(array_of_keys){
    let rows=0;
    array_of_keys.forEach(key=>{
        if(key.includes(`__${rows + 1}`)) rows++
    })
    
    return rows
}