const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const response = document.querySelector('#response');
const answerEndpoint = 'https://formsubmit.co/acaniexe@gmail.com';

const submittedAnswer = new URLSearchParams(window.location.search).get('answer');
if (submittedAnswer === 'Yes' || submittedAnswer === 'No') {
    response.textContent = submittedAnswer === 'Yes'
        ? 'Thanks for answering! You just made me the happiest person 🌼'
        : 'Thanks for answering. I appreciate you being honest.';
    yesButton.hidden = true;
    noButton.hidden = true;
}

function submitAnswer(answer) {
    if (window.location.protocol === 'file:') {
        response.textContent = 'This page is opened as a local file. Open its published website link to send your answer.';
        return;
    }

    yesButton.disabled = true;
    noButton.disabled = true;
    response.textContent = 'Sending your answer...';

    try {
        const form = document.createElement('form');
        form.action = answerEndpoint;
        form.method = 'POST';
        form.hidden = true;

        const returnUrl = new URL(window.location.href);
        returnUrl.searchParams.set('answer', answer);

        const fields = {
            name: 'Daisy',
            _subject: `Daisy answered: ${answer}`,
            _next: returnUrl.href,
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
    } catch {
        response.textContent = 'Sorry, the answer form could not be submitted. Please try again.';
        yesButton.disabled = false;
        noButton.disabled = false;
    }
}

yesButton.addEventListener('click', () => submitAnswer('Yes'));
noButton.addEventListener('click', () => submitAnswer('No'));