import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatItem, MainCon, Header, Form } from './components/index'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-screen flex flex-col bg-slate-50">
        <Header />
        <main className='md:mt-24 mt-16 sm:px-4 px-8 py-4 w-full bg-blue-100'>
          <Routes>
            <Route path='/*' element={<MainCon />} />
            <Route path='/creatItem' element={<CreatItem />} />
          </Routes>
        </main>
        <Form />
      </div>
    </AnimatePresence>
  );
}

export default App;
