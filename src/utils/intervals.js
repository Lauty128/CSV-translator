export class Interval{
    constructor(numbers){
        this.numbers = numbers
        this.max = Math.max(...numbers)
        this.min = Math.min(...numbers)
        this.range = this.max - this.min
        this.amplitude;
        this.number_of_classes;
        this.table;
    }

    setAmplitude(amplitude){
        this.amplitude = +amplitude;
        let result = this.range / this.amplitude
        this.number_of_classes = Math.round(result)
    }

    setNumersOfClasses(number_of_classes){
        this.number_of_classes = +number_of_classes;
        let result = this.range / this.number_of_classes
        this.amplitude = Math.round(result)
    }

    getTable(){
        //------- Set variables
        let number = this.min
        const amplitude = this.amplitude
        let index = 1
        //------- Create table
        const table = new Array(this.number_of_classes + 2)
        table[0] = ['Variables', 'Frecuencia']
        table[table.length - 1] = ['Total', this.numbers.length]
        
        while(index <= this.number_of_classes){
            number += amplitude
            table[index] = new Array(2)
            table[index][0] = `${number - amplitude}-${number}`
            table[index][1] = 0
            this.numbers.forEach(element => table[index][1] += this.getNumber(element >= (number - amplitude)) && element <= number);
        
            index++
        }
        this.table = table
    }

    getNumber(condition){
        return (condition) ? 1 : 0
    }

    
    getData(){
        return{
            max: this.max,
            min: this.min,
            amplitude: this.amplitude,
            number_of_classes: this.number_of_classes,
            table: this.table,
            range: this.range,
            numbers: this.numbers
        }
    }
}