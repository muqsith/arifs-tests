/**
    The below array is both rendered and used as input for logic
 */

 const sample = [
    [1, 5, 7, 9, 13, 31, 97, 42, 29, 17],
    [3, 9, 4, 6, 8, 5, 33, 29, 71, 83]
 ];

 setTimeout(() => {
    document.getElementById('arrays-sample').innerText = JSON.stringify(sample, 2);
 }, 100);
 /** Edit above sample to vary the inputs */


 /**
  * Common is like you are doing AND operation between the arrays
  * @param {*} input
  */
 function findCommon(input) {
    const filterSet = sample[0];
    return sample.slice(1).reduce((acc, arrayElement) => {
        return acc.concat(arrayElement.filter((element) => {
            return (filterSet.indexOf(element) !== -1);
        }));
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
    document.getElementById('common-result').innerText = JSON.stringify(common, 2);
 }, 100);

 const unique = findUnique(sample);
 setTimeout(() => {
    document.getElementById('unique-result').innerText = JSON.stringify(unique, 2);
 }, 100);

 