import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import * as ContactService from '../../services/ContactService';

const ContactForm = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: '',
        lastName: '',
        phoneNumber: ''
    });

    const [errorName, setErrorName] = useState(null);
    const [errorLastName, setErrorLastName] = useState(null);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(null);

    const { name, lastName, phoneNumber } = contact;

    const handleInputChange = ({ target }) => {
        setContact({
            ...contact,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let response;
            if (!params.contactId) {
                response = await ContactService.createContact(contact);
                const data = await response.json();
                if (data.ok) {
                    toast.success('Contacto agregado exitosamente');
                    setErrorName(null);
                    setErrorLastName(null);
                    setErrorPhoneNumber(null);
                    navigate('/');
                }else{
                    data.forEach(dataError => {
                        if(dataError.path[1] === 'name'){
                            setErrorName({
                                ...errorName,
                                field: 'name',
                                message: dataError.message 
                            });
                        }

                        if(dataError.path[1] === 'lastName'){
                            setErrorName({
                                ...errorName,
                                field: 'lastName',
                                message: dataError.message 
                            });
                        }

                        if(dataError.path[1] === 'phoneNumber'){
                            setErrorName({
                                ...errorName,
                                field: 'phoneNumber',
                                message: dataError.message 
                            });
                        }
                    });
                }
            } else {
                response = await ContactService.updateContact(params.contactId, contact);
                const data = await response.json();
                if (data.ok) {
                    toast.success('Contacto actualizado exitosamente');
                    setErrorName(null);
                    setErrorLastName(null);
                    setErrorPhoneNumber(null);
                    navigate('/');
                }
            }

        } catch (error) {
            console.error(error.response.data);
        }
    }

    const getContact = async (contactId) => {
        try {
            const response = await ContactService.getContact(contactId);
            const data = await response.json();
            const { name, lastName, phoneNumber } = data.contact;
            setContact({ name, lastName, phoneNumber });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params.contactId) {
            getContact(params.contactId);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex justify-center items-center">
            <section className="px-12 px-6 mt-8">
                <h1 className="font-bold text-3xl text gray-900">{params.contactId ? 'Editar ' : 'Nuevo '}Contacto</h1>
                <hr />
                <form onSubmit={handleSubmit} className="w-full mt-6">
                    <div className="flex flex-wrap mt-4 -mx-3 px-2">
                        <div className="w-full lg:w-1/2 px-3 mb-3">
                            <label htmlFor="name" className="uppercase tracking-wide text-gray-700 text-xs font-bold font-primary mb-2">Nombre</label>
                            <input
                                className="appearance-none block w-full bg-gray-200 font-primary text-gray-700 rounded py-3 px-4 mb-3"
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={name}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            { errorName && errorName.field==='name' && <p className="text-red-500 text-xs italic">{errorName.message}</p>} 
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-3">
                            <label htmlFor="lastName" className="uppercase tracking-wide text-gray-700 text-xs font-bold font-primary mb-2">Apellido</label>
                            <input
                                className="appearance-none block w-full bg-gray-200 font-primary text-gray-700 rounded py-3 px-4 mb-3"
                                type="text"
                                name="lastName"
                                id="lastName"
                                required
                                value={lastName}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            { errorLastName && errorLastName.field==='lastName' && <p className="text-red-500 text-xs italic">{errorLastName.message}</p>} 
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-4 -mx-3 px-2">
                        <div className="w-full px-3 mb-3">
                            <label htmlFor="phoneNumber" className="uppercase tracking-wide text-gray-700 text-xs font-bold font-primary mb-2">Número de Telefono</label>
                            <input
                                className="appearance-none block w-full bg-gray-200 font-primary text-gray-700 rounded py-3 px-4 mb-3"
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                required
                                value={phoneNumber}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            { errorPhoneNumber && errorPhoneNumber.field==='phoneNumber' && <p className="text-red-500 text-xs italic">{errorPhoneNumber.message}</p>} 
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 px-4 mb-4 mt-4">
                        <button type='submit' className="block w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold">
                            {params.contactId ? 'Editar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ContactForm;
