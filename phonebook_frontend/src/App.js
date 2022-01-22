import './App.css';
import { Header } from './layouts/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContactList } from './components/Contact/ContactList';
import { ContactForm } from './components/Contact/ContactForm';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Header />
          <main className="flex flex-grow">
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
