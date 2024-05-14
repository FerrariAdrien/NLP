const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

app.use(bodyParser.json());
const extractActionObject = (request) => {
    let action = null;
    let object = null;
    const regexTab = [
        { pattern: "joue", action: "play" },
        { pattern: "jouer", action: "play" },
        { pattern: "mets la musique", action: "play" },
        { pattern: "lire", action: "play" },
        { pattern: "écouter", action: "play" },
        { pattern: "mets sur pause", action: "pause" },
        { pattern: "stoppe la musique", action: "stop" },
        { pattern: "arrête la musique", action: "stop" },
        { pattern: "attend", action: "pause" },
        { pattern: "musique suivante", action: "next" },
        { pattern: "suivant", action: "next" },
        { pattern: "next", action: "next" },
        { pattern: "reviens", action: "prev" },
        { pattern: "précédent", action: "prev" }
    ];

    regexTab.some((regexEntry) => {
        const pattern = new RegExp(`${regexEntry.pattern}\\s*(.*)`, 'i');
        const match = request.match(pattern);
        if (match) {
            action = regexEntry.action;
            if (action === "play") {
                object = match[1];
            }
            return true;
        }
        return false;
    });

    return { action, object };
};

// Route pour traiter les requêtes POST
app.post('/command', (req, res) => {
    console.log(req.body["action"]);
    const command  = req.body["action"];
    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }
    const result = extractActionObject(command);
    console.log(result);
    res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
