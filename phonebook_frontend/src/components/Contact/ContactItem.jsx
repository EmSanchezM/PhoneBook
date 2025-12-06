
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as ContactService from '../../services/ContactService';

export const ContactItem = ({ contact, getContacts }) => {
    
    const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const navigate = useNavigate();

    const handleDelete = async (contactId) => {
        if (window.confirm('Estas seguro de eliminarlo?')) {
            const response = await ContactService.deleteContact(contactId);
            const data = await response.json();
            if (data.ok) {
                toast.success('Contact eliminado exitosamente');
                getContacts();
                navigate('/');
            }
        }
    }

    return (
        <tr>
            <td className="w-1/3 px-5 py-3 border-gray-200 text-center"> {Capitalize(contact.name)}</td>
            <td className="w-1/3 px-5 py-3 border-gray-200 text-center"> {Capitalize(contact.lastName)}</td>
            <td className="w-1/3 px-5 py-3 border-gray-200 text-center"> {contact.phoneNumber}</td>
            <td className="w-1/3 px-5 py-3 border-gray-200 text-center">
                <div className="flex justify-center items-center">
                    <Link to={`editar/${contact._id}`}>
                        <svg
                            className="w-6 h-6 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                        </svg>
                    </Link>
                    <div onClick={() => handleDelete(contact._id)}>
                        <svg
                            className="w-6 h-6 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            >
                            </path>
                        </svg>
                    </div>

                </div>
            </td>
        </tr>
    );
};
