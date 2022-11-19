import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const AddReview = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // if !user can't allow to perform adding review
    useEffect(() => {
        if (!props.user) {
            navigate('/login');
        }
    });

    const [editing, setEditing] = useState(false);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (location.state && location.state.currentReview) {
            setEditing(true);
            setReview(location.state.currentReview.review);
        }
    }, []);

    const onChangeReview = (e) => {
        setReview(e.target.value);
    }

    const saveReview = () => {
        let data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: id
        }

        if (editing) {
            data.review_id = location.state.currentReview._id;
            MovieDataService.updateReview(data)
                .then((res) => { setSubmitted(true) })
                .catch((e) => { console.log(e) })
        } else {
            MovieDataService.createReview(data)
                .then((res) => { setSubmitted(true) })
                .catch((e) => { console.log(e) })
        }
    }

    return (
    	<div>
    		{submitted ? (
    			<div style={{marginLeft: '20px'}}>
    				<h4>Review Submitted!</h4>
    				<Link to={"/movies/id/" + id}> Back to Movie </Link>
    			</div>
    		) : (
    			<Form>
    				<Form.Group>
    					<Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
    					<Form.Control rows={10} as="textarea" required value = {review} onChange={onChangeReview}/>
    				</Form.Group>
    				<Button variant="primary" onClick={saveReview}> Submit </Button>
    			</Form>
    		)}
    	</div>
    )
}

export default AddReview;