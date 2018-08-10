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

const input = getInput(10);
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
        if (root.value > element.value) {
            if (!root.right) {
                root.right = element;
            } else {
                addElementToTree(element, root.right);
            }
        } else if (root.value < element.value) {
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
        if (root.value === data) {
            root = null;
        } else if (root.value < data) {
            removeElementFromTree(data, root.right);
        } else if (root.value > data) {
            removeElementFromTree(data, root.left);
        }
    }

    this.removeElement = function (data) {
        removeElementFromTree(data, this.root);
    }

    this.findElement = function (data, searchMethod) {

    }

    this.depthFirstSearch = function (data) {

    }

    this.breadthFirstSearch = function (data) {
        
    }

    this.toString = function () {
        return treeify.asTree(this.root, true);
    }

}

const tree = new Tree();

for (let i of input) {
    tree.addElement(i);
}

setTimeout(() => {
    document.querySelector('#output').innerHTML = tree.toString();
}, 10);



