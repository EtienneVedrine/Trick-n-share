
import './App.css'
import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { SettingsContext } from './utils/context'
import RegisterForm from './components/RegisterForm/RegisterForm'
import LoginModal from './components/LoginModal/LoginModal'
import CreateOffer from './components/createOffer/CreateOffer.jsx';
import Offer from './components/offer/Offer.jsx';
import UsersList from './components/UsersList/UsersList'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer'
import ContactAdmin from './components/contactAdmin/ContactAdmin.jsx'
import UserProfil from './components/userProfil/UserProfil.jsx'
import OfferDetails from './components/OfferDetails/OfferDetails'
import EditProfile from './components/editProfile/EditProfile.jsx'
import HomepageContent from './components/Homepage/Home'
import FAQPage from './components/FAQ/FAQpage'
import Legals from './components/Legals/Legals'
import Charter from './components/Charter/Charter'
import NotificationModal from './components/NotificationModal/NotificationModal'




function App() {

  const { isLoginModalDisplayed, isNotificationDisplayed, isSuccess, notifMessage, setIsLogged } = useContext(SettingsContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])

  

  return (
    <>
      <Header />

      {/* Ici la modale de login */}
      {isLoginModalDisplayed && (<LoginModal />)}

      {/* Ici la modale d'affichage des notifications} */}
      {isNotificationDisplayed && <NotificationModal isSuccess={isSuccess} message={notifMessage} /> }

      <Routes>

        <Route path='/' element={<HomepageContent />} />

        <Route path='/offer' element={<Offer />}/>

        <Route path="/offer/create" element={<CreateOffer />} />

        <Route path="/register" element={<RegisterForm />} />

        <Route path='/user' element={<UsersList />} />

        <Route path='/user/:id' element={<UserProfil />} />

        <Route path='/contact' element={<ContactAdmin />} />

        <Route path='/logout' element={<HomepageContent />}/>

        <Route path='/offer/:id' element={<OfferDetails />}/>

        <Route path='/user/profil/editprofile' element={<EditProfile />} />

        <Route path='/user/profil' element={<UserProfil />} />

        <Route path='/faq' element={<FAQPage />} />

        <Route path='/legals' element={<Legals />} />

        <Route path='/charter' element={<Charter />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App

