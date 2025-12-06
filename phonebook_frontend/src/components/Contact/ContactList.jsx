import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as ContactService from '../../services/ContactService';
import { ContactItem } from './ContactItem';

export const ContactList = () => {

    const [query, setQuery] = useState('');
    const [contacts, setContacts] = useState([]);
    const [filterContacts, setFilterContacts] = useState([]);

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

    useMemo(() => {
        if (query === 0)
            setFilterContacts(contacts);

        const result = contacts.filter(contact => {
            return `${contact.name}
                    ${contact.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase())
        })
        setFilterContacts(result);
    }, [query, contacts]);

    return (
        <div className='mt-6 md:px-40'>
            <h4 className="font-bold mx-2">Contactos</h4>
            <hr />
            <div className="flex justify-between mb-2 mt-2">
                <div className="order-first md:w-3/5 ">
                    <input
                        className="md:w-full sm:w-full appearance-none block bg-gray-200 text-gray-700 rounded border-2 ml-2 mr-2 p-2"
                        type="text"
                        placeholder="Buscar contacto... "
                        name="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <ToastContainer autoClose={3000} />
                </div>
                <div className="">
                    <Link
                        to='/nuevo'
                        className="flex items-center text-white bg-purple-600 text-sm rounded leading-loose  font-semibold mr-2 p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>Agregar</span>
                    </Link>
                </div>
            </div>
            <div className='flex mx-2'>
                <table className="table-fixed w-full">
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
                            filterContacts && filterContacts.length ?
                                filterContacts.map((contact) => (
                                    <ContactItem key={contact._id} contact={contact} getContacts={getContacts} />
                                )) :

                                <div className='mx-8 border-2 bg-red-400 rounded-lg mt-4 mb-4 px-4'>
                                    <span className="font-bold text-center">No hay Contactos</span>
                                </div>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};
