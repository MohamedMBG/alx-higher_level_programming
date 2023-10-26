#!/usr/bin/node

const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
    console.error('Usage: ./5-request_store.js <url> <filePath>');
    process.exit(1);
}

request(url, (err, response, body) => {
    if (err) {
        console.error('Error fetching the URL:', err);
        return;
    }

    fs.writeFile(filePath, body, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        }
    });
});
