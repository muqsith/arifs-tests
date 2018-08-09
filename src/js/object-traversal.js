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
        },
        o: [1, 0, 4]
    }
};
setTimeout(() => {
    document.getElementById('input1').innerText = JSON.stringify(sample1, (key, val) => {
        if (key && typeof val === 'undefined') {
            return 'undefined';
        } else {
            return val;
        }
    }, 2);
}, 100);

// Sample#2 has circular reference
let sampleData = {};
const sample2 = {
    a: "Hello",
    b: {
        b1: sampleData,
        c: undefined,
        d: {
            e: 0,
            f: -1,
            a1: sampleData,
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
            },
            s: sampleData
        }
    }
};

sampleData.data = sample2;

setTimeout(() => {
    document.getElementById('input2').innerText = JSON.stringify(sample2, (key, val) => {
        if (key && val === sample2) {
            return '<<<circular ref>>>'
        } else if (typeof val === 'undefined') {
            return 'undefined';
        } else {
            return val;
        }
    }, 2);
}, 100);
console.log('Sample2 has circular references: ', sample2.b.d.i.l.n.data === sample2);
/** Edit above sample to vary the inputs */



// Answer # 1

function objectTraversal(obj, fn) {
    for (let key in obj) {
        let val = obj[key];
        if (typeof val !== 'object' || val === null) {
            if (!val) {
                fn(key, val);
            }
        } else if (!Array.isArray(val)) {
            objectTraversal(val, fn);
        }
    }
}

function printFalsyKeys(input) {
    let falseKeys = [];
    objectTraversal(input, (falseKey) => {
        falseKeys.push(falseKey);
    });
    return falseKeys;
}
const result1 = printFalsyKeys(sample1);
setTimeout(() => {
    document.getElementById('result1').innerText = JSON.stringify(result1, null, 2);
}, 100);


// Answer # 2

const objectTraversalCR = function () { // objectTraversal with circular references
    const seenValues = [];
    const hasSeenValues = (o) => {
        return seenValues.find((v) => {
            return v === o;
        });
    };
    return function traversalFn (obj, fn) {
        for (let key in obj) {
            let val = obj[key];
            if (typeof val !== 'object' || val === null) {
                if (!val) {
                    fn(key, val);
                }
            } else if (!Array.isArray(val) && !hasSeenValues(val)) {
                if (typeof val === 'object') {
                    seenValues.push(val);
                }
                traversalFn(val, fn);
            }
        }
    }
}

function printFalsyKeysWithCircularReference(input) {
    let falseKeys = [];
    objectTraversalCR()(input, (falseKey) => {
        falseKeys.push(falseKey);
    });
    return falseKeys;
}
const result2 = printFalsyKeysWithCircularReference(sample2);
setTimeout(() => {
    document.getElementById('result2').innerText = JSON.stringify(result2, null, 2);
}, 100);