import { Link } from 'react-router-dom';

export const Dropdown = ({ isOpen, handleToogle }) => {
  return (
    <div 
        className={ isOpen ? 'grid grid-rows-4 text-center items-center border-2 border-primary-200 z-40': 'hidden'} 
        onClick={handleToogle}
    >
        <Link className='p-6 md:p-4 hover:text-red-400' to='/'>
          Contactos
        </Link>
        <Link className='p-6 md:p-4 hover:text-red-400' to='/contactos'>
          Crear Contacto
        </Link>
    </div>
  );
};
