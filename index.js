const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const response = document.querySelector('#response');

function explainResponsePrivacy() {
    response.textContent = 'I can’t see which button you pressed from this page—please tell me 💌';
}

yesButton.addEventListener('click', explainResponsePrivacy);
noButton.addEventListener('click', explainResponsePrivacy);