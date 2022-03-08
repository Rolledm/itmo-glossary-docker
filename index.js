import express from 'express';
import fs from 'fs';

let output = '';
let file = fs.readFileSync('./res/res.csv', 'utf8').split('\n');
let arr = []

for (let iter in file) {
    let temp = file[iter].split(';');
    arr.push([temp[0], temp[1]])
    output += '<p><a href=#' + iter + '>' + temp[0] + '</a><p>';
}

for (let iter in file) {
    output += '<p><a name='+ iter + '><b>' + arr[iter][0] + '</b><br>' + arr[iter][1] + '</a></p>';
}

let app = express();

app.all("*", (req, res) => {
    res.send(output)
});

app.listen(80)