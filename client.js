const axios = require('axios');

class MusicCommandClient {
    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    sendCommand(command) {
        return axios.post(`${this.serverUrl}/command`, { command })
            .then(response => response.data)
            .catch(error => {
                console.error('Error sending command to server:', error.message);
                return null;
            });
    }
}

// Utilisation de la classe client
const client = new MusicCommandClient('http://localhost:3000');

// Exemple d'utilisation
async function run() {
    const commands = [
        "Met la musique Hôtel California",
        "pause la musique",
        "suivante",
        "revient"
    ];

    for (let command of commands) {
        const result = await client.sendCommand(command);
        console.log(`Command: "${command}" - Server Response:`, result);
    }
}

run();
