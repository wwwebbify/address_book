create schema address_book;

create table contacts
(
    id int auto_increment,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    companyRole varchar(50) not null,
    email varchar(100) null,
    phone varchar(10) null,
    createdAt TIMESTAMP default NOW() not null,
    constraint contacts_pk
        primary key (id)
);

# if we implement a search by name feature we can add indexing
#create index contacts_firstName_index
#    on contacts (firstName);
#
#create index contacts_lastName_index
#    on contacts (lastName);
