import express from 'express';
import fs from 'fs';

class CLoader {
    SetLoaderStrategy(loaderStrategy) {
        this.m_loaderStrategy = loaderStrategy;
    }

    LoadData() {
        return this.m_loaderStrategy.LoadData();
    }
};

class CLoadStrategyCSV {
    LoadData() {
        let file = fs.readFileSync('./res/res.csv', 'utf8').split('\n');
        let arr = []

        for (let iter in file) {
            let temp = file[iter].split(';');
            arr.push([temp[0], temp[1]])
        }
        return arr;
    }
};

let letter = '';
let output = '';

let loader = new CLoader();
let loaderStrategy = new CLoadStrategyCSV();
loader.SetLoaderStrategy(loaderStrategy);

let data = loader.LoadData();

for (let iter in data) {
    if (letter != data[iter][0][0]) {
        letter = data[iter][0][0];
        output += `<h2>${letter}</h2>`;
    }
    output += `<p><a href=#${iter}>${data[iter][0]}</a></p>`;
}

output += '<hr>'

for (let iter in data) {
    output += `<p><a name=${iter}><b>${data[iter][0]}</b><br>${data[iter][1]}</a></p>`;
}

let app = express();

app.all("*", (req, res) => {
    res.send(output)
});

app.listen(80)