const readline = require('readline');

// Crea un'interfaccia per leggere l'input dall'utente
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funzione per cifrare il testo usando l'operazione XOR con una chiave
function cifraTesto(testo, chiave) {
    let lunghezzaChiave = chiave.length;
    let testoCifrato = '';

    for (let i = 0; i < testo.length; i++) {
        let carattere = testo.charAt(i);
        let chiaveCarattere = chiave.charAt(i % lunghezzaChiave);
        let carattereCifrato = String.fromCharCode(carattere.charCodeAt(0) ^ chiaveCarattere.charCodeAt(0));
        testoCifrato += carattereCifrato;
    }

    return testoCifrato;
}

// Funzione per decifrare il testo cifrato usando la stessa chiave
function decifraTesto(testoCifrato, chiave) {
    return cifraTesto(testoCifrato, chiave); // La decifratura è identica alla cifratura con l'operazione XOR
}

// Funzione principale per interagire con l'utente
function main() {
    rl.question("Inserisci una chiave comune per la cifratura/decifratura: ", (chiaveComune) => {
        console.log(`Hai inserito: ${chiaveComune}`);

        // Ciclo per gestire le scelte dell'utente
        function gestisciScelta() {
            rl.question("Vuoi cifrare o decifrare un messaggio? (cifra/decifra/esci): ", (scelta) => {
                if (scelta.toLowerCase() === "cifra") {
                    rl.question("Inserisci il testo da cifrare: ", (testoDaCifrare) => {
                        let testoCifrato = cifraTesto(testoDaCifrare, chiaveComune);
                        console.log(`Testo cifrato: ${testoCifrato}\n`);
                        gestisciScelta();
                    });
                } else if (scelta.toLowerCase() === "decifra") {
                    rl.question("Inserisci il testo cifrato: ", (testoCifrato) => {
                        let testoDecifrato = decifraTesto(testoCifrato, chiaveComune);
                        console.log(`Testo decifrato: ${testoDecifrato}\n`);
                        gestisciScelta();
                    });
                } else if (scelta.toLowerCase() === "esci") {
                    rl.close(); // Chiudi l'interfaccia readline
                } else {
                    console.log("Scelta non valida. Riprova.\n");
                    gestisciScelta();
                }
            });
        }

        gestisciScelta(); // Avvia la gestione delle scelte dell'utente
    });
}

// Chiamata alla funzione principale per avviare il programma
main();
