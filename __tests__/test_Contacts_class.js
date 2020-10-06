const {test}  = require("@jest/globals");
const Contact = require('../Contact.js');

test('Contacts class instantiates correctly', () => {
    let props = {
        id        : 1,
        firstName: 'David',
        lastName : 'Sutherland',
        role      : 'Ambitious Applicant',
        email     : 'david@wwwebbify.com',
        phone     : '2086066928',
        createdAt: '10-06-2020 07:23'
    }

    const contact = new Contact(props)

    expect(contact).toEqual(props)
})