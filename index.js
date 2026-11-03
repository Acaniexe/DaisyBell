const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const response = document.querySelector('#response');
const answerEndpoint = 'https://formsubmit.co/acaniexe@gmail.com';
const submissionFrame = document.createElement('iframe');
submissionFrame.name = 'answer-submission-frame';
submissionFrame.title = 'Answer submission';
submissionFrame.hidden = true;
document.body.append(submissionFrame);

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
        form.target = submissionFrame.name;
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
            ? 'Thanks for answering! You just made me the happiest person 🌼'
            : 'Thanks for answering. I appreciate you being honest.';
        yesButton.hidden = true;
        noButton.hidden = true;
    } catch {
        response.textContent = 'Sorry, the answer could not be submitted. Please try again.';
        yesButton.disabled = false;
        noButton.disabled = false;
    }
}

yesButton.addEventListener('click', () => submitAnswer('Yes'));
noButton.addEventListener('click', () => submitAnswer('No'));