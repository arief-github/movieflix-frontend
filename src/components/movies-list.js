import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function MoviesList(props) {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentPageMode, setCurrentPageMode] = useState('');


    const retrieveMovies = () => {
        setCurrentPageMode('');
        MovieDataService.getAll(currentPage)
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page)
            })
            .catch(e => {
                console.log(e)
            })
    }


    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then((response) => {
                console.log(response.data);
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const retrieveNextPage = () => {
        if (currentPageMode === 'findByTitle') {
            findByTitle();
        } else if (currentPageMode === 'findByRating') {
            findByRating();
        } else {
            retrieveMovies();
        }
    }

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPageMode]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentPageMode]);





    const onChangeSearchTitle = (event) => {
        setSearchTitle(event.target.value);
    }

    const onChangeSearchRating = (event) => {
        setSearchRating(event.target.value);
    }

    const find = (query, by, currentPage) => {
        MovieDataService.find(query, by)
            .then((response) => {
                console.log(response.data);
                setMovies(response.data.movies)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const findByTitle = () => {
        setCurrentPageMode('findByTitle');
        find(searchTitle, "title")
    }

    const findByRating = () => {
        setCurrentPageMode('findByRating');
        if (searchRating === 'All Ratings') {
            retrieveMovies();
        } else {
            find(searchRating, "rated");
        }
    }

    return (
        <div>
			<Container>
				<Form>
					<Row>
						<Col>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Search by title"
									value={searchTitle}
									onChange={onChangeSearchTitle}
								/>
							</Form.Group>
							<Button 
								variant="primary"
								type="button"
								onClick={findByTitle}
							>
								Search
							</Button>
						</Col>
						<Col>
							<Form.Group>
								<Form.Control
									as="select"
									onChange={onChangeSearchRating}
								>
									{
										ratings.map((rating) => {
											return (
												<option value={rating}>{rating}</option>
											)
										})
									}
								</Form.Control>
							</Form.Group>
							<Button 
								variant="primary"
								type="button"
								onClick={findByRating}
							>
								Search
							</Button>
						</Col>
					</Row>
				</Form>
				<Row> 
				{movies.map((movie) =>{
			          return(
			            <Col>
			              <Card className="MovieRow" style={{ width: '18rem' }}>
			                {movie.poster ? <Card.Img src={movie.poster+"/100px180"} /> : <Card.Img style={{width:'50px'}}  />}
			                <Card.Body>
			                  <Card.Title>{movie.title}</Card.Title>
			                  <Card.Text> Rating: {movie.rated}</Card.Text>
			                  <Card.Text>{movie.plot}</Card.Text>
			                  <Link to={"/movies/id/"+movie._id} >View Reviews</Link>
			                </Card.Body>
			              </Card>
			             </Col>
			            )
			          })}
			     </Row>
			     <br/>
			     Showing page: {currentPage} / {entriesPerPage}
			     {
			     	currentPage < 0 ? <p> Tidak dapat menampilkan film, Indeks halaman lebih kecil dari 0 </p>  : null
			     }
			     <Button variant="link" onClick={() => {setCurrentPage(currentPage + 1)}}>
			     	Next page
			     </Button>
			     <Button variant="link" onClick={() => {setCurrentPage(currentPage - 1)}}>
			     	Previous page
			     </Button>
			</Container>
		</div>
    )
}

export default MoviesList;