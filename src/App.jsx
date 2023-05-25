// main
import React from 'react';
//components
import OurNavbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Register';
import About from './pages/AboutUs';
import Comic from './pages/Comic';
import ComicDetails from './pages/ComicDeatails';
import CreateComic from './pages/CreateComic';
import UpdateComic from './pages/UpdateComic';
import CreateRecomendation from "./pages/Recomendation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateMessage from "./pages/Message"
//Auth & redux
import { connect } from "react-redux";

function App() {

  return (
    <div className='container'>
      <Router>
        <header>
          <OurNavbar />
        </header>


        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Signup} />
          <Route path="/comic" exact component={Comic} />
          <Route path="/about" exact component={About} />
          <Route path="/comic/:comicId" exact component={ComicDetails} />
          <Route path="/create" exact component={CreateComic} />
          <Route path="/updateComic/:comicId" exact component={UpdateComic} />
          <Route path="/recomendadion" exact component={CreateRecomendation} />
          <Route path="/message" exact component={CreateMessage} />
          
        </Switch>
        <footer>
          <Footer />
          <br />
        </footer>

      </Router>

    </div>

  );
}
const mapStateToProps = ({ session }) => ({
  checked: session.checked, authenticated: session.authenticated
})

export default connect(mapStateToProps)(App);



