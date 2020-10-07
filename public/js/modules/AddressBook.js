const e = React.createElement;

//I'd rather use JSX, but didn't have time to get it to play nicely with ES6 modules

//Put this in some utility file for re-usability
async function graphqlRequest(params) {
    const response = await fetch('/addressBook/api', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify(params),
    });
    return response.json();
}

class ContactsTable extends React.Component {
    table = null;

    constructor(props, ref) {
        super(props);
    }

    componentDidMount() {
        const table = ReactDOM.findDOMNode(this);

        if (!Tabulator) throw new Error('Tabulator is required');

        this.table = new Tabulator(table, {
            autoColumns: true,
        });
    }

    render() {
        return e(
            'div',
            {
                className: "contactsTable",
                onLoad   : "console.log('loaded')",
                ref      : this.ref,
            },
            'TABLE'
        );
    }
}

class AddContact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e('div', {classNam: 'addContact'}, '+');
    }
}


export class AddressBook extends React.Component {
    constructor(props) {
        super(props);

        this.table = React.createRef();
        this.state = {
            contacts: [],
        }
    }

    async componentDidMount() {
        const getContactsGQL = `
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
    `;
        const contacts       = (await graphqlRequest({query: getContactsGQL})).data.Contacts;
        this.setState({
            contacts: contacts
        });
    }

    render() {
        return e('div',
            {
                id: 'AddressBook',
            },
            ''
        );
    }
}