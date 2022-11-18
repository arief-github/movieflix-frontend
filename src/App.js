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
          </Routes>    
      </div>
    );
}

function NavbarApp({ user }) {
    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">MERN-FLIX</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <NavLink to={"/movies"}>
                  Movies
                </NavLink>
                <Nav.Link>
                  {
                    user ? (
                      <Link to={'/logout'}>Logout User</Link>
                    ) : (
                      <Link to={'/login'}>Login</Link>
                    )
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default App;