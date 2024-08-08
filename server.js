
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const folderPath = path.join(__dirname, 'files');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const timestamp = new Date();
    const fileName = `${timestamp.toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, timestamp.toString(), (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }
        res.status(200).send(`File ${fileName} created successfully`);
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/list-files', (req, res) => {
    const folderPath = path.join(__dirname, 'files');

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files');
        }
        res.status(200).json(files.filter(file => file.endsWith('.txt')));
    });
});