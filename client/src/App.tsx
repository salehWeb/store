import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatItem, MainCon, Header, Cart } from './components/index'
import { AnimatePresence } from 'framer-motion'
import Footer from './components/Footer';
import Main from './components/login/Main'
import { StyledEngineProvider } from '@mui/material'

function App() {


  
  const hederRefer: any = React.useRef()
const [scrollPosition, setScrollPosition] = React.useState(0);

const handleScroll = () => {
  const position = hederRefer.current.scrollTop;
  setScrollPosition(position);
};


React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
}, [scrollPosition, hederRefer]);




  return (
    <StyledEngineProvider injectFirst>
    <AnimatePresence exitBeforeEnter>
      <div ref={hederRefer} onScroll={handleScroll}  className="w-screen h-screen flex flex-col bg-slate-50 overflow-y-auto">
        <Header haed={scrollPosition > 10 ? true : false} />
        <main className='md:mt-16 mt-16 sm:px-4 px-8 py-4 w-full h-auto bg-blue-100 '>
          <Routes>
            <Route path='/*' element={<MainCon />} />
            <Route path='/creatItem' element={<CreatItem />} />
            <Route path='/card' element={<Cart />} />
            <Route path='/login' element={<Main />} />
          </Routes>
        </main>
        <Footer  />
      </div>
    </AnimatePresence>
    </StyledEngineProvider>
  );
}

export default App;
