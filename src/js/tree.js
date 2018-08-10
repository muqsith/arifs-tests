import '../styles/tree.css';

import treeify from 'treeify';

const getRandom = (start, end) => parseInt(Math.random() * (end - start));
// insert random 100 numbers in input
const getInput = (limit) => {
    const input = [];
    while (input.length < limit) {
        let randomNumber = getRandom(1, limit * 10);
        if (input.indexOf(randomNumber) === -1) {
            input.push(randomNumber);
        }
    }
    return input;
}

const input = getInput(4);
setTimeout(() => {
    document.querySelector('#input').innerHTML = `[${input.join(', ')}]`;
}, 10);

// --------------------  End of Input  ------------------------


// Solution here

function Element(value) {
    this.left = null;
    this.right = null;
    this.value = value;
};

function Tree() {

    this.root = null;

    function addElementToTree(element, root) {
        if (!root) return;
        if (root.value < element.value) {
            if (!root.right) {
                root.right = element;
            } else {
                addElementToTree(element, root.right);
            }
        } else if (root.value > element.value) {
            if (!root.left) {
                root.left = element;
            } else {
                addElementToTree(element, root.left);
            }
        }
    }

    this.addElement = function (data) {
        const e = new Element(data);
        if (!this.root) {
            this.root = e;
        } else {
            addElementToTree(e, this.root);
        }
    }

    function removeElementFromTree(data, root) {
        if (!root) return ;
        if (root.right) {
            if (root.right.value === data) {
                root.right = null;
            } else if (root.right.value < data) {
                removeElementFromTree(data, root.right);
            }
        }
        if (root.left) {
            if (root.left.value === data) {
                root.left = null;
            } else if (root.left.value > data) {
                removeElementFromTree(data, root.left);
            }
        }
    }

    this.removeElement = function (data) {
        if (this.root.value === data) {
            this.root = null;
        } else {
            removeElementFromTree(data, this.root);
        }        
    }

    this.depthFirstSearch = function (data) {
        console.log('doing depth first search');
    }

    this.breadthFirstSearch = function (data) {
        console.log('doing breadth first search');
    }

    this.toString = function () {
        return treeify.asTree(this.root, true);
    }

}

const tree = new Tree();

for (let i of input) {
    tree.addElement(i);
}

function renderTree() {
    setTimeout(() => {
        document.querySelector('#output').innerHTML = tree.toString();
    }, 10);
}
renderTree();


let selectedMethod = 'breadthfirst';

window.addNumber = function () {
    let val = parseInt(+document.querySelector('#inputfield').value);
    tree.addElement(val);
    renderTree();
}

window.removeNumber = function () {
    let val = parseInt(+document.querySelector('#inputfield').value);
    tree.removeElement(val);
    renderTree();
}

window.searchNumber = function () {
    let val = document.querySelector('#searchfield').value;
    console.log('searching for ', val);
    if (selectedMethod === 'breadthfirst') {
        tree.breadthFirstSearch(val)
    } else if (selectedMethod === 'depthfirst') {
        tree.depthFirstSearch(val);
    }
}

window.setSearchMethod = function (event) {
    selectedMethod = event.currentTarget.value;
}



