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

class CPageGenerator {
    constructor(data) {
        this.m_data = data;
    }

    GeneratePage() {
        let letter = '';
        let output = '';

        for (let iter in this.m_data) {
            if (letter != this.m_data[iter][0][0]) {
                letter = this.m_data[iter][0][0];
                output += `<h2>${letter}</h2>`;
            }
            output += `<p><a href=#${iter}>${this.m_data[iter][0]}</a></p>`;
        }
        
        output += '<hr>'
        
        for (let iter in this.m_data) {
            output += `<p><a name=${iter}><b>${this.m_data[iter][0]}</b><br>${this.m_data[iter][1]}</a></p>`;
        }

        return output;
    }
}

let loader = new CLoader();
let loaderStrategy = new CLoadStrategyCSV();
loader.SetLoaderStrategy(loaderStrategy);

let data = loader.LoadData();

let pageGenerator = new CPageGenerator(data);
let output = pageGenerator.GeneratePage();

let app = express();

app.all("*", (req, res) => {
    res.send(output)
});

app.listen(80)