let isBackVisible = false;

async function getNewFact(isInitial = false) {
    const currentFact = document.getElementById(isBackVisible ? 'factText' : 'factText2');
    const nextFact = document.getElementById(isBackVisible ? 'factText2' : 'factText');
    const buttons = document.querySelectorAll('button');

    try {
        buttons.forEach(button => button.disabled = true);

        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (isInitial) {
            currentFact.textContent = data.fact;
            nextFact.textContent = "Click the button for a new fact!";
        } else {
            nextFact.textContent = data.fact;

            const container = document.querySelector('.card-container');
            isBackVisible = !isBackVisible;
            container.classList.toggle('is-flipped');
        }

        setTimeout(() => {
            buttons.forEach(button => button.disabled = false);
        }, 800);

    } catch (error) {
        if (isInitial) {
            currentFact.textContent = "Oups ! An error occured. Please try again.";
        } else {
            nextFact.textContent = "Oups ! An error occured. Please try again.";
        }
        buttons.forEach(button => button.disabled = false);
        console.error("Error :", error);
    }
}

window.onload = () => getNewFact(true);
