const questionText = document.querySelector('#question-text');
const submit = document.querySelector('#submit');
const newQuestion = document.querySelector('#new-question-button');
const category = document.querySelector('#category-text');
const value = document.querySelector('#value-text');
const points_text = document.querySelector('#points-text');
const form = document.querySelector('#answer');
const answerInput = document.querySelector('#answer-input')
const result = document.querySelector('#result');
const give_up = document.querySelector('#giveup');

let answer = "";
let input = "";
let points = 0;

const newJeopardyQuestion = async () => {
    try {
        const res = await axios.get('https://jservice.io/api/random');
        submit.disabled = false;
        questionText.innerHTML = res.data[0].question;
        category.innerHTML = res.data[0].category.title;
        value.innerHTML = res.data[0].value;
        answer = res.data[0].answer.toLowerCase().replace(/<(.|\n)*?>/g, '');
        console.log(res.data)
        console.log(answer);
    } catch (error) {
        console.log("Error: ", error)
    }
}

newJeopardyQuestion();

newQuestion.addEventListener('click', () => {
    newJeopardyQuestion();
    result.innerHTML = "";
    answerInput.value = "";
    give_up.disabled = false;
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (answer === answerInput.value.toLowerCase()) {
        submit.disabled = true;
        give_up.disabled = true;
        result.innerHTML = 'Correct! ✅';
        points += parseInt(value.innerHTML);
        points_text.innerHTML = points.toString();
    } else {
        result.innerHTML = 'Incorrect ❌'
    }
})

give_up.addEventListener('click', () => {
    result.innerHTML = `What is ${answer}`;
    submit.disabled = true;
})

