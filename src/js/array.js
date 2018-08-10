/**
    The below array is both rendered and used as input for logic
 */

const sample = [
    [1, 5, 7, 9, 13, 31, 97, 42, 33, 29, 17],
    [3, 9, 4, 6, 8, 5, 33, 29, 71, 83],
    [5, 13, 99, 101, 42, 33]
];

setTimeout(() => {
    document.querySelector('#input').innerHTML = JSON.stringify(sample, null, 2);
}, 100);
/** Edit above sample to vary the inputs */


/**
 * Common is like you are doing AND operation between the arrays
 * @param {*} input
 */
function findCommon(input) {
    return input.reduce((acc, arrayElement, i) => {
        if (i === 0) {
            return arrayElement;
        } else {
            return acc.filter((element) => {
                return (arrayElement.indexOf(element) !== -1);
            });
        }        
    }, []);
}

/**
 * Unique is like you are doing OR operation between the arrays
 * Like if the element is present in first array 
 * then don't pick even if exists in the further input array
 * Ex: in our sample set the element 5 should not occur twice
 * in our unique set
 * @param {*} input 
 */
function findUnique(input) {
    return input.reduce((acc, arrayElement) => {
        return acc.concat(arrayElement.filter((element) => {
            return (acc.indexOf(element) === -1);
        }));
    }, []);
}

const common = findCommon(sample);
setTimeout(() => {
    document.querySelector('#common-result').innerHTML = JSON.stringify(common, null, 2);
}, 100);

const unique = findUnique(sample);
setTimeout(() => {
    document.querySelector('#unique-result').innerHTML = JSON.stringify(unique, null, 2);
}, 100);

