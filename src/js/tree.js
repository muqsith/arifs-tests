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
    this.loops = 0;

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
        if (root.value < data) {
            if (root.right) {
                if (root.right.value === data) {
                    root.right = null;
                } else {
                    removeElementFromTree(data, root.right);
                }
            }
        } else if (root.value > data) {
            if (root.left) {
                if (root.left.value === data) {
                    root.left = null;
                } else {
                    removeElementFromTree(data, root.left);
                }
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

    this.depthFirst = function (data, root) {
        this.loops += 1;
        if (!root) return;
        if (root.value === data) {
            return root;
        } else if (root.value < data) {
            return this.depthFirst(data, root.right);
        } else if (root.value > data) {
            return this.depthFirst(data, root.left);
        }
    }

    this.depthFirstSearch = function (data) {
        console.log('doing depth first search');
        this.loops = 0;
        const e = this.depthFirst(data, this.root);
        return ({element: e, loops: this.loops});
    }

    this.breadthFirst = function (data, root) {
        this.loops += 1;
        if (!root) return;
        if (root.value === data) {
            return root;
        }
        if (root.right && root.right.value === data) {
            return root.right;
        }
        if (root.left && root.left.value === data) {
            return root.left;
        }
        if (root.value < data) {
            return this.breadthFirst(data, root.right);
        } else if (root.value > data) {
            return this.breadthFirst(data, root.left);
        }
    }

    this.breadthFirstSearch = function (data) {
        console.log('doing breadth first search');
        this.loops = 0;
        const e = this.breadthFirst(data, this.root);
        return ({element: e, loops: this.loops});
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

function renderSearchResult(result) {
    setTimeout(() => {
        const val = (result.element) ? result.element.value : null;
        document.querySelector('#searchresult').innerHTML = JSON.stringify(val);
        document.querySelector('#loops').innerHTML = JSON.stringify(result.loops);
    }, 10);
}


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
    let val = parseInt(+document.querySelector('#searchfield').value);
    console.log('searching for ', val);
    let result = null;
    if (selectedMethod === 'breadthfirst') {
        result = tree.breadthFirstSearch(val)
    } else if (selectedMethod === 'depthfirst') {
        result = tree.depthFirstSearch(val);
    }
    renderSearchResult(result);
}

window.setSearchMethod = function (event) {
    selectedMethod = event.currentTarget.value;
}



