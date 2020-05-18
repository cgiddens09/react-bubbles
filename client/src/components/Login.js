import React, { useState } from "react";
import {axiosWithAuth} from '../axiosWithAuth';
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userInput, setUserInput] = useState({ username: '', password: ''});

	const handleChange = e => {
		setUserInput({...userInput, [e.target.name]: e.target.value});
	}

	const handleSubmit = e => {
		e.preventDefault();

		axiosWithAuth().post('/api/login', userInput)
		.then(res => {
			console.log(res);
			localStorage.setItem('token', res.data.payload);
			props.history.push('/bubble-page');
		})
		.catch(err => {
			console.log(err);
			alert('Incorrect Login');
		})

	}

  return (
    <>
      <h1>Login to check out the colors!</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username"
				value={userInput.username} onChange={handleChange} />
				<input type="password" name="password" placeholder="Password"
				value={userInput.password} onChange={handleChange} />
				<button>Login</button>
      </form>
    </>
  );
};

export default Login;
