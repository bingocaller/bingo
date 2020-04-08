function shuffle(input) {
    for (let i = input.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [input[i], input[j]] = [input[j], input[i]];
    }
    return input;
}

(() => {
    const numbers = [...Array(90).keys()].map((n) => (n += 1));

    let shuffledNumbers = shuffle(numbers);
    let allNumbers = [...Array(90).keys()].map(() => 'empty');

    let numberElement = null;
    let pickedNumbersElement = null;
    let nextButton = null;
    let reshuffleButton = null;

    function next() {
        const previousNumber = numberElement.textContent;
        const pickedNumberElement = document.createElement('span');

        const nextNumber = shuffledNumbers.shift();
        numberElement.textContent = nextNumber ? nextNumber : '🥳';

        pickedNumberElement.textContent = previousNumber;
        pickedNumberElement.classList.add('number', 'u-letterpress');
        pickedNumbersElement.appendChild(pickedNumberElement);

        allNumbers[previousNumber - 1] = previousNumber;
        updateAllNumbers();
    }

    function reshuffle() {
        shuffledNumbers = shuffle(shuffledNumbers);
    }

    function updateAllNumbers() {
        const allNumbersElement = document.querySelector('.all-numbers');
        allNumbersElement.innerHTML = '';
        allNumbers.forEach((number, index) => {
            const numberElement = document.createElement('span');
            numberElement.classList.add('number', 'u-letterpress');
            numberElement.textContent = index += 1;
            if (number !== 'empty') {
                numberElement.classList.add('picked');
            }
            allNumbersElement.appendChild(numberElement);
        });
    }

    function letsBingo() {
        numberElement = document.querySelector('.number');
        pickedNumbersElement = document.querySelector('.picked-numbers');
        nextButton = document.querySelector('.next');
        reshuffleButton = document.querySelector('.reshuffle');

        const firstNumber = shuffledNumbers.shift();
        numberElement.textContent = firstNumber;

        updateAllNumbers(); // Show all non-picked numbers

        nextButton.addEventListener('click', next);

        reshuffleButton.addEventListener('click', reshuffle);
    }

    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'interactive') {
            letsBingo();
        } else {
            document.addEventListener('DOMContentLoaded', letsBingo);
        }
    });
})();
