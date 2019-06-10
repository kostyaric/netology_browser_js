'use strict'

function createContactList() {

	let contactsJSON;
	let contacts;
	let singleContact;
	let contactsList = document.querySelector('.contacts-list');
	let contactsHTML = '';

	contactsJSON = loadContacts();
	contacts = JSON.parse(contactsJSON);

	for (let i = 0; i < contacts.length; i++) {
		
		singleContact = contacts[i];

		contactsHTML +=
	    `<li data-email=\"${singleContact.email}\" data-phone=\"${singleContact.phone}\"> \n\t <strong>${singleContact.name}</strong> \n </li> \n`;

	}

	contactsList.innerHTML = contactsHTML;

}
	
createContactList();