import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatItem, MainCon, Header, Cart } from './components/index'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-screen flex flex-col bg-slate-50">
        <Header />
        <main className='md:mt-24 mt-16 sm:px-4 px-8 py-4 w-full h-auto bg-blue-100'>
          <Routes>
            <Route path='/*' element={<MainCon />} />
            <Route path='/creatItem' element={<CreatItem />} />
            <Route path='/card' element={<Cart />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
