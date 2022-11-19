import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
	let navigate = useNavigate();
	useEffect(() => {
		props.logout();
		navigate('/');
	},[props.logout])
}

export default Logout;