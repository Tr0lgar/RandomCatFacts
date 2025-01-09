let isBackVisible = false;

async function getNewFact(isInitial = false) {
    const currentFact = document.getElementById(isBackVisible ? 'factText' : 'factText2');
    const nextFact = document.getElementById(isBackVisible ? 'factText2' : 'factText');
    const buttons = document.querySelectorAll('button');

    try {
        // Désactiver les boutons pendant le chargement
        buttons.forEach(button => button.disabled = true);

        // Faire la requête API
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (isInitial) {
            // Mettre à jour les deux faces pour éviter qu'une face reste vide
            currentFact.textContent = data.fact;
            nextFact.textContent = "Click the button for a new fact!";
        } else {
            // Mettre à jour le fait sur la face cachée
            nextFact.textContent = data.fact;

            // Retourner la carte
            const container = document.querySelector('.card-container');
            isBackVisible = !isBackVisible;
            container.classList.toggle('is-flipped');
        }

        // Réactiver les boutons après l'animation
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

// Charger un premier fait au chargement de la page
window.onload = () => getNewFact(true);