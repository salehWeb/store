import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatItem, MainCon, Header, Form } from './components/index'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-screen flex flex-col bg-slate-50">
        <Header />
        <main className='mt-24 p-8 w-full'>
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
