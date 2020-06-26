const promisify = require('util').promisify;
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

class Conection {
    constructor() {
        this.path = path.join(__dirname, '..', '..', 'db', 'contacts.json');
        this.readFileAsync = promisify(fs.readFile);
        this.writeFileAsync = promisify(fs.writeFile);
        this.genId = shortid.generate;
    }

    getData = async () => {
        try {
            const dataJson = await this.readFileAsync(this.path);
            return JSON.parse(dataJson);
        } catch (error) {
            return error;
        }
    };
    writeData = async data => {
        try {
            const stringData = JSON.stringify(data);

            await this.writeFileAsync(this.path, stringData);

            return true;
        } catch (error) {
            return error;
        }
    };
}

module.exports = new Conection();
