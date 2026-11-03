const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const response = document.querySelector('#response');
const answerEndpoint = 'https://formsubmit.co/ajax/acaniexe@gmail.com';

async function submitAnswer(answer) {
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
        const data = await result.json();

        if (!result.ok || String(data.success).toLowerCase() !== 'true') {
            throw new Error('The answer service did not accept the response.');
        }

        response.textContent = answer === 'Yes'
            ? 'You just made me the happiest person 🌼'
            : 'Thanks for telling me. I appreciate you being honest.';
        yesButton.hidden = true;
        noButton.hidden = true;
    } catch {
        response.textContent = 'Sorry, your answer couldn’t be sent. Please try again in a moment.';
        yesButton.disabled = false;
        noButton.disabled = false;
    }
}

yesButton.addEventListener('click', () => submitAnswer('Yes'));
noButton.addEventListener('click', () => submitAnswer('No'));