#!/usr/bin/node

const request = require('request');

// Base URL for the Star Wars API
const baseURL = 'https://swapi.dev/api/';

// Check if movie ID is provided
if (!process.argv[2]) {
    console.error('Please provide a Movie ID.');
    process.exit(1);
}

// Construct the URL for the film
const filmURL = `${baseURL}films/${process.argv[2]}/`;

request(filmURL, (error, response, body) => {
    if (error) {
        console.error('Error fetching the film:', error);
        return;
    }

    if (response.statusCode !== 200) {
        console.error('Invalid status code:', response.statusCode);
        return;
    }

    const characters = JSON.parse(body).characters;
    printCharacters(characters, 0);
});

function printCharacters(characters, index) {
    if (index >= characters.length) {
        return; // End of the recursion
    }

    request(characters[index], (error, response, body) => {
        if (error) {
            console.error('Error fetching the character:', error);
            return;
        }

        if (response.statusCode !== 200) {
            console.error('Invalid status code for character:', response.statusCode);
            return;
        }

        console.log(JSON.parse(body).name);
        // Recursive call for the next character
        printCharacters(characters, index + 1);
    });
}
