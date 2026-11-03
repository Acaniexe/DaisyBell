const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const response = document.querySelector('#response');
const answerEndpoint = 'https://formsubmit.co/ajax/acaniexe@gmail.com';

async function submitAnswer(answer) {
    if (window.location.protocol === 'file:') {
        response.textContent = 'This page is opened as a local file. Open its published website link to send your answer.';
        return;
    }

    yesButton.disabled = true;
    noButton.disabled = true;
    response.textContent = 'Sending your answer...';

    try {
        const result = await fetch(answerEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: 'Daisy',
                subject: `Daisy answered: ${answer}`,
                answer,
                message: `Daisy answered: ${answer}`,
                _captcha: 'false'
            })
        });
        const responseText = await result.text();
        let data;

        try {
            data = JSON.parse(responseText);
        } catch {
            throw new Error(`The email service returned an unexpected response (HTTP ${result.status}).`);
        }

        if (!data || typeof data !== 'object') {
            throw new Error(`The email service returned an unexpected response (HTTP ${result.status}).`);
        }

        if (!result.ok || String(data.success).toLowerCase() !== 'true') {
            const reason = typeof data.message === 'string' ? ` ${data.message}` : '';
            throw new Error(`The email service did not accept the response.${reason}`);
        }

        response.textContent = answer === 'Yes'
            ? 'You just made me the happiest person 🌼'
            : 'Thanks for telling me. I appreciate you being honest.';
        yesButton.hidden = true;
        noButton.hidden = true;
    } catch (error) {
        const reason = error instanceof Error && error.message === 'Failed to fetch'
            ? 'Could not reach the email service. Make sure the page is online and try again.'
            : error instanceof Error
                ? error.message
                : 'Something went wrong while sending the answer.';
        response.textContent = `Sorry, your answer couldn’t be sent. ${reason}`;
        yesButton.disabled = false;
        noButton.disabled = false;
    }
}

yesButton.addEventListener('click', () => submitAnswer('Yes'));
noButton.addEventListener('click', () => submitAnswer('No'));