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
            // Number is equal to minimum number of the all interval
            let number = this.min
            const amplitude = this.amplitude
            let index = 1
        
        //------- Create table
            // Table is the classes number plus 2, because the table need space for the header and footer
            const table = new Array(this.number_of_classes + 2)
        
            // Define value of the header and footer
            table[0] = ['Variables', 'Frecuencia']
            table[table.length - 1] = ['Total', this.numbers.length]
        
        //------- This loop is reponsible for finding the frecuency of each interval
        while(index <= this.number_of_classes){
            // The number begin in the minimum and it adds the amplitud in each turn
            number += amplitude

            // These indicates the start and end of each interval
            const start = number - amplitude;
            const end = index == this.number_of_classes
                        ? this.max
                        : (number - 1);

            table[index] = new Array(2)
            // table[Index][0] represents the search interval
            table[index][0] = start + '-' + end

            // table[Index][1] represents the total of number in the interval
            table[index][1] = 0
            this.numbers.forEach(element =>
                table[index][1] += this.getNumber(element, start, end))

            // Add one to the index
            index++
        }
        this.table = table
    }

    getNumber(number, startInterval, endInterval){
        return ((number >= startInterval) && (number <= endInterval)) ? 1 : 0
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