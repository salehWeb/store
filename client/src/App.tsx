import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatItem, MainCon, Header, Cart } from './components/tools/index'
import { AnimatePresence } from 'framer-motion'
import Footer from './components/footer/Footer';
import { StyledEngineProvider } from '@mui/material'
import AboutCob from './components/admain/AboutCob';
import NotFound from './components/notfound/NotFound'
import Singin from './components/login/Singin';
import Login from './components/login/Login';
import Users from './components/admain/Users';
import ItemPage from './components/user/ItemPage';
import Welcom from './components/login/Welcom';

function App() {

  const isHaveAcount = localStorage.getItem('profile')
  const isAdman = isHaveAcount && JSON.parse(isHaveAcount).user?.isAdman


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
        <div ref={hederRefer} onScroll={handleScroll} className="w-screen h-screen flex flex-col bg-slate-50 overflow-y-auto">
          <Header haed={scrollPosition > 10 ? true : false} />
          <main className='md:mt-16 mt-16 sm:px-4 px-8 py-4 w-full h-auto bg-blue-100 '>
            <Routes>
              <Route path='/' element={<MainCon />} />
              <Route path='/card' element={<Cart />} />
              <Route path='/login' element={<Login />} />
              <Route path='/singin' element={<Singin />} />
              <Route path='/item' element={<ItemPage />} />
              <Route path='/Welcom' element={<Welcom />} />
              {isAdman === true
                && (
                  <>
                    <Route path='/adman' element={<AboutCob />} />
                    <Route path='/adman/creatItem' element={<CreatItem />} />
                    <Route path='/adman/users' element={<Users />} />
                  </>
                )}
                <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </StyledEngineProvider>
  );
}

export default App;
