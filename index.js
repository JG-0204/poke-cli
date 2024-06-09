#!/usr/bin/env node

import * as readline from 'node:readline';
import { createSpinner } from 'nanospinner';

import getPokemon from './service.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'poke-cli> ',
});

const spinner = createSpinner();

const app = () => {
    rl.prompt();

    rl.on('line', async (line) => {
        if (line === 'clear') {
            console.clear();
            rl.prompt();
            return;
        }

        try {
            spinner.start({ text: 'Loading...\n', color: 'cyan' });
            await getPokemon(line.trim().toLowerCase());
            spinner.success({ text: 'Success', color: 'green' });
        } catch (err) {
            spinner.error({ text: err.message, color: 'red' });
        }

        rl.prompt();
    }).on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });
};

console.log('Hello ' + process.env.USER + '. Welcome to poke-cli!');
console.log(`
HOW TO USE?
Search for a pokemon (eg: charmander)
Ctrl + c to exit, type clear to clear console
`);
app();
