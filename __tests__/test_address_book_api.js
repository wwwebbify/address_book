const {test}    = require("@jest/globals");
const supertest = require("supertest");

const {server, apiPath}  = require("../index.js");
const request = supertest(server);

afterAll(() => {
    server.close()
})

//TODO these tests will need to updated to use jets.mock data when DB is implemented

test("API Contacts returns an array of contacts", async (done) => {

    const request = await testContactsCall(function (res) {
        if (res.body.errors) return done(res.body.errors);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.Contacts.length).toEqual(1);
        done();
    });
});

test("API addContact adds and returns newContact info", async (done) => {
    let newInput = {
        "addInput": {
            "firstName": "Conor",
            "lastName" : "Souhrada",
            "role"     : "Web Guru",
            "email"    : null,
            "phone"    : null,
        }
    };

    request
        .post(apiPath)
        .send({
            query    : `
mutation addContact(
  $addInput: addInput
){
  addContact(
    addInput: $addInput
  ){
    id
    firstName
    lastName
    role
    email
    phone
    createdAt
  }
}`,
            variables: newInput,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then(async function (res) {
            if (res.body.errors) return done(res.body.errors);
            expect(res.body).toBeInstanceOf(Object);

            let request = await testContactsCall(function (res, err) {
                if (err) return done(err);
                let Contacts = res.body.data.Contacts;
                expect(Contacts.length).toEqual(2);
                done();
            });
            done();
        });
});

test("API updatesContact updates and returns newContact info", async (done) => {
    let newInput = {
        "updateInput": {
            "id"       : "1",
            "firstName": "changed",
            "lastName" : "changed",
            "role"     : "changed",
            "email"    : "changed",
            "phone"    : "changed",
        }
    };

    request
        .post(apiPath)
        .send({
            query    : `
mutation updateContact(
  $updateInput: updateInput
){
  updateContact(
    updateInput: $updateInput
  ){
    id
    firstName
    lastName
    role
    email
    phone
    createdAt
  }
}`,
            variables: newInput,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (res.body.errors) return done(res.body.errors);
            expect(res.body).toBeInstanceOf(Object);
            let updateInput = res.body.data.updateContact;
            expect(updateInput.id).toBe(newInput.updateInput.id)
            expect(updateInput.firstName).toBe(newInput.updateInput.firstName)
            expect(updateInput.lastName).toBe(newInput.updateInput.lastName)
            expect(updateInput.role).toBe(newInput.updateInput.role)
            expect(updateInput.email).toBe(newInput.updateInput.email)
            expect(updateInput.phone).toBe(newInput.updateInput.phone)
            done();
        });
});

test("API deleteContact deletes contact and returns newContact ContactDeleteResponse", async (done) => {
    let newInput = {
        "deleteInput": {
            "id": "1",
        }
    };

    request
        .post(apiPath)
        .send({
            query    : `
mutation deleteContact(
  $deleteInput: deleteInput
){
  deleteContact(
    deleteInput: $deleteInput
  ){
    success
    affectedRows
  }
}`,
            variables: newInput,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            if (res.body.errors) return done(res.body.errors);
            expect(res.body).toBeInstanceOf(Object);
            let deleteInput = res.body.data.deleteContact;
            expect(deleteInput.success).toBe(true);
            expect(deleteInput.affectedRows).toBe(1);

            done();
        });
});


/*

Utility Functions


 */

async function testContactsCall(test) {
    return await request
        .post(apiPath)
        .send({
            query: `
query{
  Contacts {
    id
    firstName
    lastName
    role
    email
    phone
    createdAt
  }
}`,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then(test);
}