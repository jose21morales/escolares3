import style from './Register.module.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
            try {
                
            const res = await axios.post('http://localhost:5000/api/auth/register',{
                name,
                lastName,
                email,
                password,
                confirmPassword
            }, {
                headers: {'Content-Type':'application/json'},
                withCredentials:true
            })

            if (res.status === 201) {
                console.log(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            if (error.response?.status === 400) {
                console.log(error.response.data.message)
            } else {
                console.error('Error inesperado: ', error)
            }
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit} method="POST" className={style.form}>
            <div className={style.formGroup}>
                <label className={style.formLabel} htmlFor="name">Name</label>
                <input className={style.formInput} onChange={(e)=>{setName(e.target.value)}} type="text" name='name' placeholder="Nombre" value={name} required />
            </div>
            <div className={style.formGroup}>
                <label className={style.formLabel} htmlFor="lastName">Apellido</label>
                <input className={style.formInput} onChange={(e)=>{setlastName(e.target.value)}} type="text" name='lastName' placeholder="Apellido" value={lastName} required />
            </div>
            <div className={style.formGroup}>
                <label className={style.formLabel} htmlFor="email">Email</label>
                <input className={style.formInput} onChange={(e)=>{setEmail(e.target.value)}} type="text" name='email' placeholder="Email" value={email} required />
            </div>
            <div className={style.formGroup}>
                <label className={style.formLabel} htmlFor="password">Contraseña</label>
                <input className={style.formInput} onChange={(e)=>{setPassword(e.target.value)}} type="text" name='password' placeholder="Contraseña" value={password} required />
            </div>
            <div className={style.formGroup}>
                <label className={style.formLabel} htmlFor="confirmPassword">Confirmar password</label>
                <input className={style.formInput} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="text" name='confirmPassword' placeholder="Confirmar password" value={confirmPassword} required />
            </div>
            <button>Registrarse</button>
			<p className="login-p">¿Ya tienes cuenta? <a href="/login">Haz clic aqui</a></p>
        </form>
        </>
    )
}

export default Register