import {AddressBook} from "./modules/AddressBook.js";

const e = React.createElement;

const addessBookContainer = document.querySelector('#AddressBook');
ReactDOM.render(e(AddressBook), addessBookContainer);