import React from 'react';
import {Route,Routes,useNavigate} from 'react-router-dom';
import Movie from './movie';
import SignUp from './signUp';
import SignIn from './signIn';
import Home from './home';
import Header from './header';
import Tickets from './tickets';
import {useLocation} from 'react-router-dom';
function Main(props){
        const navigate=useNavigate();
        const location=useLocation();
        return(
            <div>
            <Header navigate={navigate} />
        <Routes>
          <Route exacat path='/' element={<SignUp navigate={navigate}/>} />
          <Route exact path='/signIn' element={<SignIn navigate={navigate}/>} />
          <Route exact path='/dashboard' element={<Home />} />
          <Route  name="movie" path='/movie' element={<Movie />} />
          <Route exact path='/tickets' element={<Tickets location={location} navigate={navigate}/>} />
          {/* <Route path="" element={<Navigate to="/signUp" />} /> */}
        </Routes>
        </div>
        );
    }
 export default Main;