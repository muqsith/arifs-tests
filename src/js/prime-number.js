import '../styles/prime.css';

window.showResult = function () {
    setTimeout(() => {
        const answerDiv = document.querySelector('.answer-box');
        const loadingDiv = document.querySelector('.loading-icon-box');
        answerDiv.style.display = 'none';
        loadingDiv.style.display = 'flex';
    }, 1);


    let input = +document.querySelector('#input').value
    if (input < 0) input = input * -1;
    input = parseInt(input);
    const result = isPrime(input);


    setTimeout(() => {
        const answerDiv = document.querySelector('.answer-box');
        const loadingDiv = document.querySelector('.loading-icon-box');
        answerDiv.style.display = 'flex';
        loadingDiv.style.display = 'none';
    }, 1);    
    setTimeout(() => {
        const answerDiv = document.querySelector('.answer-box');
        answerDiv.style.borderColor = (result) ? 'green' : 'red';
        const span = document.querySelector('#answer');
        span.innerHTML = (result) ? 'Prime Number' : 'Not a prime number';
        span.style.color = (result) ? 'green' : 'red';
    }, 1);
}

// to show result on page load
window.showResult();

window.handleKeyDown = function (event) {
    if (event.keyCode === 13) {
        window.showResult();
    }
}

function isPrime(input) {
    let isAPrimeNumber = false;
    if (input === 0 || input === 1) {
        isAPrimeNumber = false;
    } else if (input === 2) {
        isAPrimeNumber = true;
    } else {
        let loopUntill = parseInt(Math.sqrt(input));
        if (loopUntill < 2) loopUntill = (input-1); // just to handle 3
        for (let i = 2; i <= loopUntill; i += 1) {
            isAPrimeNumber = !((input % i) === 0);
            if (!isAPrimeNumber) break;
        }
    }    
    return isAPrimeNumber;
}
