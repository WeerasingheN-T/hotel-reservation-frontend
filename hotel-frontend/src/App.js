import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './Components/AppHeader';
import Home from './Pages/Home';
import HotelDetail from './Pages/HotelDetail';
import Booking from './Pages/Booking';
import Review from './Pages/Review';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';

function App() {
  return (
     <BrowserRouter>
         <div className='App'>
          <AppHeader/>
          <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/hotels' element={<Home/>} />
            <Route path='/hotels/:id' element={<HotelDetail/>} />
            <Route path='/hotels/booking' element={<Booking/>} />
            <Route path='/hotels/review' element={<Review/>} />
          </Routes>
         </div>
     </BrowserRouter>
  );
}

export default App;
