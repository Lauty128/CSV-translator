export function parseIntervalData(data){
    //-------- Config
    let numbersData = '';
    data.numbers.forEach(number => numbersData += ` ${number} -`);

    //-------- Elements
    const main = document.createElement('div')
    const numbers_container = document.createElement('div')
    const numbers_title = document.createElement('h4') 
    const numbers = document.createElement('span')
    const minmax_container = document.createElement('div')
    const min = document.createElement('span')
    const max = document.createElement('span')
    const range = document.createElement('span')
    const amplitude = document.createElement('span')
    const numClasses = document.createElement('span')

    //--------- Classes
    main.classList.add("IntervalData")

    //--------- TextContent
    numbers_title.textContent = "Los datos utilizados son:"
    numbers.textContent = numbersData.slice(0,-1)
    min.textContent = `Minimo = ${data.min}` 
    max.textContent = `Maximo = ${data.max}`
    range.textContent = `Rango = ${data.range}`
    amplitude.textContent = `Amplitud = ${data.amplitude}`
    numClasses.textContent = `Cantidad de clases = ${data.number_of_classes}`

    //--------- Append
    numbers_container.appendChild(numbers_title)
    numbers_container.appendChild(numbers)
    minmax_container.appendChild(min)
    minmax_container.appendChild(max)

    //--------- Main element and return
    main.appendChild(numbers_container)
    main.appendChild(minmax_container)
    main.appendChild(range)
    main.appendChild(amplitude)
    main.appendChild(numClasses)

    return main
}