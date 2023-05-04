export function convert_text_to_array(text){
  
    if(text[0] === '"'){
      let newText = text.split(/^"$|\n(?=(?:[^"]*"[^"]*")*[^"]*$)/g)
      let returnText = newText.map(array=> array.split(/,(?=")/g))
      console.log(returnText);
      if(returnText[returnText.length - 1].length > 1) returnText.pop();
      return returnText 
    }

    let newText = text.split('\n')
    return newText.map(array=> array.split(','))
}

export function formatBody(body){
    const array_of_keys = Object.keys(body)
    const rows = countRows(array_of_keys);
    const columns = array_of_keys.length/rows

    let data = new Array()

    for(let index_row = 1; index_row <= rows; index_row++ ){
        const column_array = []
        for(let index_column = 1; index_column <= columns; index_column++ ){
            const value = `"${body[`Table__${index_row}-${index_column}`]}"`
            column_array.push(value)
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