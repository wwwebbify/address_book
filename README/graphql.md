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
}

-------------------------

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
}

{
  "addInput": {
    "firstName": "David",
    "lastName": "Sutherland",
    "role": "Web Guru",
    "email": "test@test.com"
  }
}

-------------------------

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
}

{
  "updateInput": {
    "id":"1",
    "firstName": "changed",
    "lastName": "changed",
    "role": "changed",
    "email": "changed",
    "phone": "changed"
  }
}

-------------------------

mutation deleteContact(
  $deleteInput: deleteInput
){
  deleteContact(
    deleteInput: $deleteInput
  ){
    success
    affectedRows
  }
}

{
  "deleteInput": {
    "id":"1"
  }
}

-------------------------