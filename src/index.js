const argv = require('yargs').argv;
const contactsAp = require('./contacts');

// contactsAp.listContacts();
// contactsAp.getContactById(2);
// contactsAp.removeContact(3);
// contactsAp.addContact('Yarik', 'ya@gmail.com', '9379992');


function invokeAction({
    action, id, name, email, phone
}) {
    switch (action) {
    case 'list':
        contactsAp.listContacts();
        break;

    case 'get':
        contactsAp.getContactById(id);
        break;

    case 'add':
        contactsAp.addContact(name, email, phone);
        break;

    case 'remove':
        contactsAp.removeContact(id);
        break;

    default:
        console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
// const hostname = '127.0.0.1';

// const port = 4000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//     // eslint-disable-next-line no-console
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
