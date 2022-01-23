const API_URL = "http://127.0.0.1:4200/api/contacts";

export const getContacts = async() => {
    return await fetch(API_URL);
}

export const getContact = async (contactId) => {
    return await fetch(`${API_URL}/${contactId}`);
};

export const createContact = async (newContact) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": String(newContact.name).trim(),
            "lastName": String(newContact.lastName).trim(),
            "phoneNumber": String(newContact.phoneNumber),
        })
    });
};

export const updateContact = async (contactId, updatedContact) => {
    return await fetch(`${API_URL}/${contactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": String(updatedContact.name).trim(),
            "lastName": String(updatedContact.lastName).trim(),
            "phoneNumber": String(updatedContact.phoneNumber).trim(),
        })
    });
};

export const deleteContact = async (contactId) => {
    return await fetch(`${API_URL}/${contactId}`, {
        method: 'DELETE'
    });
};
