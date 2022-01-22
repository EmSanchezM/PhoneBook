import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

import * as ContactService from '../../services/ContactService';

export const ContactForm = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);

    const [formValues, handleInputChange] = useForm({
        name: '',
        lastName: '',
        phoneNumber: ''
    });

    const { name, lastName, phoneNumber } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (!params.contactId) {
                response = await ContactService.createContact(formValues);
                const data = await response.json();
                if(data.ok){
                    toast.success('Contacto agregado exitosamente');
                }
            }else{
                response = await ContactService.updateContact(params.contactId, formValues);
                const data = await response.json();
                if(data.ok){
                    toast.success('Contacto actualizado exitosamente');
                }
            }
            navigate('/');
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <section className="px-12 px-6 mt-8">
                <h1 className="font-bold text-3xl text gray-900">Contacto nuevo</h1>
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
                                value={name}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-3">
                            <label htmlFor="lastName" className="uppercase tracking-wide text-gray-700 text-xs font-bold font-primary mb-2">Apellido</label>
                            <input
                                className="appearance-none block w-full bg-gray-200 font-primary text-gray-700 rounded py-3 px-4 mb-3"
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
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
                                value={phoneNumber}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 px-4 mb-4 mt-4">
                        <button type='submit' className="block w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold">
                            Guardar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};
