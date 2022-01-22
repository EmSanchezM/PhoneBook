import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as ContactService from '../../services/ContactService';
import { ContactItem } from './ContactItem';

export const ContactList = () => {
    
    const [contacts, setContacts] = useState([]);


    const getContacts = async () => {
        try {
            const response = await ContactService.getContacts();
            const data = await response.json();
            setContacts(data.contacts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className='flex justify-center items-center px-8 py-4'>
            <ToastContainer autoClose={3000} />
            <table className="table-fixed">
                <thead className="border-2 border-blue-400">
                    <tr>
                        <th className="w-1/3 px-5 py-3 border-gray-200">Nombre</th>
                        <th className="w-1/3 px-5 py-3 border-gray-200">Apellido</th>
                        <th className="w-1/3 px-5 py-3 border-gray-200">Telefono</th>
                        <th className="w-1/3 px-5 py-3 border-gray-200">Acciones</th>
                    </tr>
                </thead>
                <tbody className='border-2 border-blue-400'>
                    {
                        contacts && contacts.length ? 
                        contacts.map((contact) => (
                            <ContactItem key={contact._id} contact={contact} getContacts={getContacts} />
                        )) :

                        <div className='border-red-400'>No hay Contactos</div>
                    }
                </tbody>
            </table>
        </div>
    );
};
