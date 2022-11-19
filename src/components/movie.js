import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

// React Bootstrap Component
import { Card, Container, Image, Col, Row, Button, Figure } from 'react-bootstrap';

const Movie = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [style, setStyle] = useState({
        textDecoration: 'none'
    });

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    const getMovie = (id) => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getMovie(id)
    }, [id])

    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id).then((response) => {
            setMovie((prevState) => {
                prevState.reviews.splice(index, 1);
                return({...prevState});
            }).catch((e) => { console.log(e) });
        })
    }

    return (
        <div>
            <Container>
                <Row className="mt-4">
                    <Col>
                        <Figure>
                            <Figure.Image src={movie.poster + "/100px250"} fluid/>            
                        </Figure>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as = "h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}        
                                </Card.Text>
                                  {props.user && <Link style={style} onMouseOut={()=>setStyle({textDecoration:'none'})} onMouseOver={()=>setStyle({textDecoration:'underline'})} to={"/movies/id/" + id + "/review"}> Add Review </Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br />
                        {movie.reviews.map((review, idx)=>{
                          return (
                            <Card style={{marginBottom:'0px', border:'none'}}>
                              <Card.Body>
                                  <h5>{review.name + " reviewed on " + moment(review.date).format('Do MMMM YYYY')}</h5>
                                  <p>{review.review}</p>
                                  {props.user && props.user.id === review.user_id.toString() &&
                                    <Row>
                                      <Col>
                                        <span>
                                          <Link className='UserActionLink' state={{currentReview:review}} to={"/movies/id/"+ id+"/review"}>Edit</Link>
                                          <Link onClick={() => { deleteReview(review._id, idx) }} className='UserActionLink' style={{marginLeft: '10px'}}>Delete</Link>
                                        </span>
                                      </Col>
                                    </Row>
                                  }
                              </Card.Body>
                            </Card>
                          )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie;