const {buildSchema} = require('graphql');

const schema = buildSchema(`
  input addInput{
    firstName: String!
    lastName: String!
    role: String!
    email: String
    phone: String
  }
  
  input updateInput{
    id: ID!
    firstName: String
    lastName: String
    role: String
    email: String
    phone: String
  }
  
  input deleteInput{
    id: ID!
  }

  type Contact {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    email: String
    phone: String
    createdAt: String!
  }
  
  type ContactDeleteResponse{
    success: Boolean!
    affectedRows: Int!
  }
  
  type Query {
    Contacts: [Contact!]!   
  }
  
  type Mutation {
    addContact(addInput: addInput): Contact 
    updateContact(updateInput: updateInput): Contact 
    deleteContact(deleteInput: deleteInput): ContactDeleteResponse 
  }
  
`);

module.exports = schema;