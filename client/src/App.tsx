import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './components/tools/index'
import { AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2';
const MainCon = React.lazy(() => import('./components/mian/MainCon'))
const Cart = React.lazy(() => import('./components/user/Cart'))
const ItemPage = React.lazy(() => import('./components/itemPage/ItemPage'))
const HistoryPayments = React.lazy(() => import('./components/admain/HistoryPay/HistoryPayments'))
const Welcom = React.lazy(() => import('./components/login/Welcom'))
const CreatItem = React.lazy(() => import('./components/admain/creatItem/CreatItem'))
const Singin = React.lazy(() => import('./components/login/Singin'))
const NotFound = React.lazy(() => import('./components/notfound/NotFound'))
const Login = React.lazy(() => import('./components/login/Login'))
const AboutCob = React.lazy(() => import('./components/admain/items/AboutCob'))
const Users = React.lazy(() => import('./components/admain/users/Users'))
const Payments = React.lazy(() => import('./components/admain/HotPay/Payments'))
const ItemsPaent = React.lazy(() => import('./components/admain/itemsPayments/ItemsPaent'))
const Header = React.lazy(() => import('./components/header/Header'))
const Footer = React.lazy(() => import('./components/footer/Footer'))

function App() {

  window.addEventListener('offline', () => {
    Swal.fire({
      title: 'You are offline',
      text: 'Please check your internet connection',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#f44336',
      showCancelButton: false,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#f44336',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: false,
      timer: 5000,
      timerProgressBar: true
  })
})

  const isHaveAcount = localStorage.getItem('profile')
  const isAdman = isHaveAcount && JSON.parse(isHaveAcount).user?.isAdman

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-screen flex flex-col bg-slate-50 overflow-y-auto">
        <div className="absolute top-0 left-[50%]" id="top"></div>
        <React.Suspense fallback={<Loader />}>
          <Header />
        </React.Suspense>
        <main className='md:mt-16 mt-16 sm:px-4 px-8 py-4 w-full h-auto bg-blue-100 '>
          <Routes>
            <Route path='/' element={
              <React.Suspense fallback={<Loader />}>
                <MainCon />
              </React.Suspense>
            } />
            <Route path='/card' element={
              <React.Suspense fallback={<Loader />}>
                <Cart />
              </React.Suspense>
            } />
            <Route path='/login' element={
              <React.Suspense fallback={<Loader />}>
                <Login />
              </React.Suspense>
            } />
            <Route path='/singin' element={
              <React.Suspense fallback={<Loader />}>
                <Singin />
              </React.Suspense>
            } />

            <Route path='/item' element={
              <React.Suspense fallback={<Loader />}>
                <ItemPage />
              </React.Suspense>
            } />
            <Route path='/Welcom' element={
              <React.Suspense fallback={<Loader />}>
                <Welcom />
              </React.Suspense>
            } />
            {isAdman === true
              && (
                <>
                  <Route path='/adman' element={
                    <React.Suspense fallback={<Loader />}>
                      <AboutCob />
                    </React.Suspense>
                  } />

                  <Route path='/adman/creatItem' element={
                    <React.Suspense fallback={<Loader />}>
                      <CreatItem />
                    </React.Suspense>
                  } />

                  <Route path='/adman/users' element={
                    <React.Suspense fallback={<Loader />}>
                      <Users />
                    </React.Suspense>
                  } />

                  <Route path='/adman/payments' element={
                    <React.Suspense fallback={<Loader />}>
                      <Payments />
                    </React.Suspense>
                  } />

                  <Route path='/admin/payments/item' element={
                    <React.Suspense fallback={<Loader />}>
                      <ItemsPaent />
                    </React.Suspense>
                  } />

                  <Route path='/admin/payments/history' element={
                    <React.Suspense fallback={<Loader />}>
                      <HistoryPayments />
                    </React.Suspense>
                  } />
                </>
              )}

            <Route path='/*' element={
              <React.Suspense fallback={<Loader />}>
                <NotFound />
              </React.Suspense>
            } />
          </Routes>
        </main>
        <React.Suspense fallback={<Loader />}>
          <Footer />
        </React.Suspense>
      </div>
    </AnimatePresence>
  );
}

export default App;
