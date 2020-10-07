 #Project Overview
 
 I really enjoyed this project, and I learned a lot. 
 I realized, after I started the project in my home environment, that I really should have just mock the data while in the office.
 The current state of the project is in a mocked data state.
 I included DBSchema.sql outlining how I would structure the DB, then I would update the project to query for the data.
 Providing 100 characters on the varchar fields may be a bit large, it would just depend on if server space is a concern, we could shrink those down a bit.
 Though space wouldn't be a problem unless you had millions of contacts :). 
  
 I intentionally left the file structure very flat to allow you to see everything without digging. 
 I would want to organize it better, which I did on the React branch. 
 
 I chose to split out the graphql root and schema from index.js into their own files for easier index management.
 Ideally I would have like to split the schema into a .graphql file, so I could leverage my IDE tools.
 However, when attempting it, I saw it turning into a rabbit hole I didn't have time for right then.
 The Schema and root methods are pretty straight forward I think. I included graphql.md, which has query examples for you.
 
 While Contact.js is trivial at this point, it's good practice to make classes standalone modules.
 
 In index.js, you will notice some path variables, especially the basepath, it's primarily for configuration to allow me to host it on my server.
 It wouldn't be needed if it was running as a standalone server, but I hosted it on a shared nodejs server, so it needs namespacing. 
 Ideally I will end up put all configurations like this in a .env.
 
 Testing is handled by Jest. Just run `npm run test` to kick them off.
 
 Given the time, I would:
  * Get the front interface up and running with a sortable/searchable table display
  * Implement the DB
  * Add API authentication
  * Add capabilities to have multiple email addresses and phone numbers per contact
  * Bulk contact import/export functionality could be on the table if needed
  * Create Contact groups
  * Add emailing/call capabilities from the app