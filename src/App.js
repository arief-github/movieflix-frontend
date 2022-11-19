import logo from './logo.svg';
import React, { useState } from 'react';
import {Switch, Route, Routes, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// bootstrap component 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// our component
import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';
import Logout from './components/logout';

function App() {
    const [user, setUser] = useState(null);

    async function login(user = null) {
        // default user to null
        setUser(user);
    }

    async function logout() {
        setUser(null);
    }


    return (
      <div>
        <NavbarApp user={user}/> 
          <Routes>
            <Route path='/' element={<MoviesList />} />
            <Route path='/movies' element={<MoviesList />} />
            <Route path='/movies/id/:id' element={<Movie render={(props)=>({...props})} user={user} />} />
            <Route path='/movies/id/:id/review' element={<AddReview render={(props)=>({...props})} user={user} />} />
            <Route path='/login' element={<Login render={(props)=>({...props})} login={login} />} />
            <Route path='/logout' element={<Logout render={(props)=>({...props})} logout={logout} />} />
          </Routes>    
      </div>
    );
}

function NavbarApp({ user }) {
    return (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href={"/movies"}>MERN-FLIX</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto my-2 my-lg-0" style={{maxHeight: '100px'}}>
                <Nav.Link to={"/movies"}>
                  <Link className="NavLink" to={"/movies"}>Movies</Link>
                </Nav.Link>
                <Nav.Link >
                  { user ? (<Link className="NavLink" to={'/logout'}>Logout User</Link>):(<Link className="NavLink" to={'/login'}>Login</Link>) }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default App;