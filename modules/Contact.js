function isRequired(name) {
    throw new Error(`${name} is a required property`)
}

class Contact {
    /**
     *
     * @param {{id, firstName, lastName, role, email, phone, createdAt}}
     */
    constructor({
                    id = isRequired('id'),
                    firstName = isRequired('firstName'),
                    lastName = isRequired('lastName'),
                    role = isRequired('role'),
                    email,
                    phone,
                    createdAt = isRequired('createdAt')
                }) {
        this.id         = id;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.role       = role;
        this.email      = email;
        this.phone      = phone;
        this.createdAt = createdAt;
    }
}

module.exports = Contact;