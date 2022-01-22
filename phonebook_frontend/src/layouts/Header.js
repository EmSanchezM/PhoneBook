import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 relative shadow-sm font-mono font-primary px-8">
      <Link className='mt-2 lg:mb-4 mb-0 font-primary uppercase flex' to='/'>
        <svg
          className="h-8 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          ></path>
        </svg>
        <span className='flex justify-center items-center font-bold'>PhoneBook</span>
      </Link>
      <div className="px-8 cursor-pointer md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <nav className="md:block hidden">
        <Link className='p-6 md:p-4 hover:text-red-400' to='/'>
          Contactos
        </Link>
        <Link className='p-6 md:p-4 hover:text-red-400' to='/contactos'>
          Crear Contacto
        </Link>
      </nav>
    </header>
  )
};
