import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
	let navigate = useNavigate();

	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [error, setError] = useState(null);

	const onChangeName = (e) => {
		const name = e.target.value;
		setName(name);
	}

	const onChangeId = (e) => {
		const id = e.target.value;
		setId(id);
	}

	const login = () => {
		if(name.length > 5 && id.length > 5) {
			props.login({name: name, id: id});
			navigate('/');
		} else {
			setError(1);
			setTimeout(() => setError(null), 2000);
		}
	}

	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Username"
						value={name}
						onChange={onChangeName}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>ID</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter id"
						value={id}
						onChange={onChangeId}
					/>
				</Form.Group>
				<Button variant="primary" onClick={login}>
					Submit
				</Button>
				{error && <p style={{color: 'red'}}>Please check your password and/or id</p>}
			</Form>
		</div>
	)
}

export default Login;