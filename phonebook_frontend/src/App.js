import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './layouts/Header';
import { ContactList } from './components/Contact/ContactList';
import { ContactForm } from './components/Contact/ContactForm';
import { Dropdown } from './layouts/Dropdown';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const handleToogle = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    }
  });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Header handleToogle={handleToogle} />
          <Dropdown isOpen={isOpen} handleToogle={handleToogle} />
          <main>
            <Routes>
              <Route path='/' element={<ContactList />} />
              <Route path='contactos' element={<ContactForm />} />
              <Route path='contactos/:contacId' element={<ContactForm />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
