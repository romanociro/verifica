// Fetch JSON data
fetch('rappresentazione_iti.json')
    .then(response => response.json())
    .then(data => {
        const ambientiContainer = document.getElementById('ambienti-list');
        const orarioContainer = document.getElementById('orario-list');

        // Display learning environments
        data.ambienti_apprendimento.forEach(ambiente => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Determine title based on type
            let title = '';
            if (ambiente.nome_aula) {
                title = `Aula: ${ambiente.nome_aula}`;
            } else if (ambiente.denominazione_laboratorio) {
                title = `Laboratorio: ${ambiente.denominazione_laboratorio}`;
            } else if (ambiente.nome) {
                title = `Spazio: ${ambiente.nome}`;
            }

            const cardTitle = document.createElement('h2');
            cardTitle.textContent = title;
            card.appendChild(cardTitle);

            // Display resources for the environment
            const risorseList = document.createElement('ul');
            if (ambiente.risorse_aula) {
                ambiente.risorse_aula.forEach(risorsa => {
                    const li = document.createElement('li');
                    li.textContent = risorsa;
                    risorseList.appendChild(li);
                });
            }
            if (ambiente.risorse_laboratorio) {
                ambiente.risorse_laboratorio.forEach(risorsa => {
                    const li = document.createElement('li');
                    li.textContent = risorsa;
                    risorseList.appendChild(li);
                });
            }
            if (ambiente.risorse_disponibili) {
                ambiente.risorse_disponibili.forEach(risorsa => {
                    const li = document.createElement('li');
                    li.textContent = risorsa;
                    risorseList.appendChild(li);
                });
            }

            card.appendChild(risorseList);
            ambientiContainer.appendChild(card);
        });

        // Display schedule
        let orarioHTML = '';
        for (const [giorno, orario] of Object.entries(data.ambienti_apprendimento[0].orario_scolastico)) {
            orarioHTML += `<div class="orario"><strong>${giorno.charAt(0).toUpperCase() + giorno.slice(1)}:</strong> ${orario}</div>`;
        }
        orarioContainer.innerHTML = orarioHTML;
    })
    .catch(error => console.error('Error fetching the JSON data:', error));

// Function to open tabs
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}
