const express = require('express');
const app = express();

app.use(express.json());

const extractActionObject = (request) => {
    let action = null;
    let object = null;
    const regexTab = [
        { pattern: "joue", action: "play" },
        { pattern: "jouer", action: "play" },
        { pattern: "met la musique", action: "play" },
        { pattern: "lire", action: "play" },
        { pattern: "écouter", action: "play" },
        { pattern: "pause", action: "pause" },
        { pattern: "stop", action: "stop" },
        { pattern: "arrête", action: "stop" },
        { pattern: "attend", action: "pause" },
        { pattern: "suivante", action: "next" },
        { pattern: "suivant", action: "next" },
        { pattern: "next", action: "next" },
        { pattern: "revient", action: "prev" },
        { pattern: "précédent", action: "prev" }
    ];

    regexTab.some((regexEntry) => {
        const pattern = new RegExp(`${regexEntry.pattern}\\s*(.*)`, 'i');
        const match = request.match(pattern);
        if (match) {
            action = regexEntry.action;
            object = match[1];
            return true;
        }
        return false;
    });

    return { action, object };
};

// Route pour traiter les requêtes POST
app.post('/command', (req, res) => {
    const { command } = req.body;
    const result = extractActionObject(command);
    res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
