const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const response = document.querySelector('#response');
const answerEndpoint = 'https://formsubmit.co/acaniexe@gmail.com';

function submitAnswer(answer) {
    if (window.location.protocol === 'file:') {
        response.textContent = 'This page is opened as a local file. Open its published website link to send your answer.';
        return;
    }

    yesButton.disabled = true;
    noButton.disabled = true;
    response.textContent = 'Opening the secure answer form...';

    try {
        const form = document.createElement('form');
        form.action = answerEndpoint;
        form.method = 'POST';
        form.target = '_blank';
        form.hidden = true;

        const fields = {
            name: 'Daisy',
            _subject: `Daisy answered: ${answer}`,
            answer,
            message: `Daisy answered: ${answer}`,
            _captcha: 'false'
        };

        for (const [name, value] of Object.entries(fields)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.append(input);
        }

        document.body.append(form);
        form.submit();
        form.remove();
        response.textContent = answer === 'Yes'
            ? 'Your answer was submitted. You just made me the happiest person 🌼'
            : 'Your answer was submitted. Thanks for being honest.';
        response.textContent += ' Check the new tab for the email service’s confirmation.';
        yesButton.hidden = true;
        noButton.hidden = true;
    } catch {
        response.textContent = 'Sorry, the answer form could not be opened. Please allow pop-ups and try again.';
        yesButton.disabled = false;
        noButton.disabled = false;
    }
}

yesButton.addEventListener('click', () => submitAnswer('Yes'));
noButton.addEventListener('click', () => submitAnswer('No'));