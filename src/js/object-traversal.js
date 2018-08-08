/**
    The below objects are both rendered and used as input for logic
 */

const sample1 = {
    a: 0,
    b: -3,
    c: {
        d: undefined,
        e: 'hello',
        f: [],
        g: {
            h: [-1],
            i: {
                j: ['a']
            },
            k: null
        },
        l: {
            m: '',
            n: '0402930',
            "nullstring": ""
        }
    }
};
 setTimeout(() => {
    document.getElementById('input1').innerText = JSON.stringify(sample1, null, 2);
 }, 100);

 // Sample#2 has circular reference
 let sampleData = {};
 const sample2 = {
     a: "Hello",
     b: {
         c: undefined,
         d: {
             e: 0,
             f: -1,
             h: [],
             i: {
                 j: null,
                 k: '',
                 l: {
                     m: "",
                     n: sampleData,
                     o: {
                        p: 'yellow',
                        q: -4,
                        r: [-1]
                     }
                 }
             }
         }
     }
 };

 sampleData.data = sample2;

 setTimeout(() => {
    document.getElementById('input2').innerText = JSON.stringify(sample2, (key, val) => {
        if (key === 'n') return '<<<circular ref>>>';
        else return val;
    }, 2);
 }, 100);
 console.log(sample2.b.d.i.l.n.data === sample2);
 /** Edit above sample to vary the inputs */

 

 // Answer # 1

 function printFalsyKeys(input) {
     for (let k in input) {
         console.log(k);
     }
     return !!input;
 }
 const result1 = printFalsyKeys(sample1);
 setTimeout(() => {
    document.getElementById('result1').innerText = JSON.stringify(result1, null, 2);
 }, 100);




 function printFalsyKeysWithCircularReference(input) {
    return !!input;
 }
 const result2 = printFalsyKeysWithCircularReference(sample2);
 setTimeout(() => {
    document.getElementById('result2').innerText = JSON.stringify(result2, null, 2);
 }, 100);