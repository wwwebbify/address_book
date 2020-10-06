const dayjs   = require('dayjs');
const Contact = require('./Contact.js');

//build with some mock data
let DB = {
    1: {
        id        : 1,
        firstName: 'David',
        lastName : 'Sutherland',
        role      : 'Ambitious Applicant',
        email     : 'david@wwwebbify.com',
        phone     : '2086066928',
        createdAt: '10-06-2020 07:23'
    }
};

function getContactData(id = []) {
// TEMP replace with DB query which returns all if id = [] else list of passed contact
    return DB;
}

/**
 * @returns {[Contacts]}
 */
function getAllContacts() {
    let contactData = getContactData();
    let contacts    = [];
    for (const i in contactData) {
        if (!contactData.hasOwnProperty(i)) continue;
        let row = contactData[i];
        contacts.push(new Contact(row));
    }
    return contacts;
}

/**
 * @param input {{firstName,lastName,email,phone}}
 * @returns {Contact}
 */
function addContact(input) {
    let addInput = input.addInput;
    if (!addInput.firstName || !addInput.lastName)
        throw new Error('{firstName,lastName} are required input properties')
    // TEMP will be calculated by DB
    let id                  = Object.keys(DB).length + 1;
    addInput.id         = id;
    addInput.createdAt = new dayjs().format();
    // TEMP replace with MYSQL update
    DB[id]                  = addInput;

    return new Contact(DB[id])
}

//TEMP change this for DB implementation
function updateContact(input) {
    let updateInput = input.updateInput;
    if (!updateInput.id) throw new Error('id is a require property to updateContact')
    let id = updateInput.id;
    delete updateInput.id;

    for (const key in updateInput) {
        if (!updateInput.hasOwnProperty(key)) continue;
        let value   = updateInput[key];
        DB[id][key] = value;
    }
    return DB[id];
}

//TEMP change this for DB implementation
function deleteContact(input) {
    const id = input.deleteInput.id;
    delete DB[id];
    return {
        "success": true,
        "affectedRows": 1,
    };
}

module.exports = {
    Contacts: getAllContacts,
    addContact,
    updateContact,
    deleteContact
};