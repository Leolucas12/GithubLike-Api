// 1) Implemente um método que crie um novo array baseado nos valores passados.
// Entradas do método (3,a), Resultado do método: ['a', 'a', 'a']

function createArray(size, content) {
    let newArray = [];
    newArray.length = size;
    for (let i = 0; i < newArray.length; i++) {
        newArray[i] = content;
    }

    return newArray;
}

// 2) Implemente um método que inverta um array, não utilize métodos nativos do array.
// Entrada do método ([1,2,3,4]), Resultado do método: [4,3,2,1]

function reverseArray(input) {
    let array = input;
    let tempArray = [];

    for(let i = 0; i < array.length / 2; i++) {
        tempArray = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length -1 - i] = tempArray;
    }

    return array;
}

// 3) Implemente um método que limpe os itens desnecessários de um array (false, undefined, strings vazias, zero, null).
// Entrada do método ([1,2,'', undefined]), Resultado do método: [1,2]

function cleanArray(input) {
    let array = input;

    for (var i = 0;  i < array.length; i++) {
        if (array[i] == undefined || array[i] == null || array[i] == '') {
            array.splice(i, 1);
            cleanArray(array);
        }
    }

    return array;
}

function cleanArrayNumber(input) {
    let array = input;

    for (let i = 0; i < array.length; i++) {
        if (isNaN(array[i]) || array[i] == undefined || array[i] == null || array[i] == '') {
            array.splice(i, 1);
            cleanArrayNumber(array);
        }
    }

    return array;
}

// 4) Implemente um método que a partir de um array de arrays, converta em um objeto com chave e valor.
// Entrada do método ([["c",2],["d",4]]), Resultado do métdodo: {c:2, d:4}

function inputToJson(input) {
    let array = input;

    let myObj = Object.fromEntries(array);
    
    return myObj;
}

// 5) Implemente um método que retorne um array, sem os itens passados por parâmetro depois do array de entrada.
// Entrada do método ([5,4,3,2,5], 5,3), Resultado do método: [4,2]

function removeItemsFromSecondParameter(input, ...custom) {
    var array = input;
    var customInput = custom;

    for (let i = 0; i < customInput.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (customInput[i] == array[j]){
                array.splice(j, 1)
            }
        }
    }

    return array;
}

// 6) Implemente um método que retorne um array, sem valores duplicados.
// Entrada do método ([1,2,3,3,2,4,5,4,7,3]), Resultado do método: [1,2,3,4,5,7]

function removeDuplicates(input) {
    let array = [...new Set(input)];

    return array;
}

// 7) Implemente um método que compare a igualdade de dois arrays e retorne um valor booleano.
// Entrada do método ([1,2,3,4],[1,2,3,4]), Resultado do método: true

function compareArrays(array1, array2) {
    return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
}

// 8) Implemente um método que remova os aninhamentos de um array de arrays para um array unico.
// Entrada do método ([1, 2, [3], [4, 5]]), Resultado do método: [1, 2, 3, 4, 5]

function removeNestedArray(input) {
    let array = input.flat(1);
    return array;
}

// 9) Implemente um método divida um array por uma quantidade passada por parâmetro.
// Entrada do método ([1, 2, 3, 4, 5], 2), Resultado do método: [[1, 2], [3, 4], [5]]

function divideArray(array, size) {
    var nestedArrays = [];

    for (let i = 0; i < array.length; i += size) {
        nestedArrays.push(array.slice(i, i + size));
    }
    console.log(nestedArrays)
    return nestedArrays;
}

// 10) Implemente um método que encontre os valores comuns entre dois arrays.
// Entrada do método ([6, 8], [8, 9]), Resultado do método: [8]

function findCommonValue(array1, array2) {
    return array1.filter(value => array2.includes(value));
}