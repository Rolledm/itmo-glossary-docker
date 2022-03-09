import express from 'express';
import fs from 'fs';

let letter = '';
let output = '';
let file = fs.readFileSync('./res/res.csv', 'utf8').split('\n');
let arr = []

for (let iter in file) {
    let temp = file[iter].split(';');
    arr.push([temp[0], temp[1]])
    if (letter != temp[0][0]) {
        letter = temp[0][0];
        output += `<h2>${letter}</h2>`;
    }
    output += `<p><a href=#${iter}>${temp[0]}</a></p>`;
}

output += '<hr>'

for (let iter in file) {
    output += `<p><a name=${iter}><b>${arr[iter][0]}</b><br>${arr[iter][1]}</a></p>`;
}

let app = express();

app.all("*", (req, res) => {
    res.send(output)
});

app.listen(80)