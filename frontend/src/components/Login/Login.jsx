import React, { useState } from 'react';
import style from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/auth/login',{ username, password },{withCredentials: true})
			if (res.status === 200) {
				console.log(res.data.user)
				console.log(res.data.message)
				setError('')
				setUser(res.data.user)
				navigate('/');
			}
			if (res.status === 401) {
				setError(res.data.message)
			}
		} catch (error) {
			if (error.response) {
				setError(error.response.data.message);
			}
		}
	}
	
	return (
    <div className={style.containerLogin}>
		<div className={style.containerLoginDos}>
			<h3 className={style.title}><b>Login</b></h3>
		
			<form onSubmit={handleSubmit} method='POST'>
				<div className="mb-3">
					<label htmlFor="" className={style.formLabel}>Email</label>
					<input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="text" name="email" placeholder="Correo" value={username} onChange={(e) => setUsername(e.target.value)} required />
					<div>Nunca compartiremos tu correo con nadie.</div>
				</div>

				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className={style.formLabel}>Password</label>
					<input className="form-control" id="exampleInputPassword1" type="password" name="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>

				<p className="error-login"></p>
				
				<button className="btn btn-primary" type="submit" name="btn-login">Iniciar</button>

				<p className="login-p">¿Aun no tienes cuenta? <a href="/register">Haz clic aqui</a></p>
			</form>
			<p>{error}</p>
		</div>
	</div>
    );
}