import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css'
import { useHistory } from "react-router-dom";

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState('');
    const [password, setPasswrod] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push('/spots'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <form
                className="login-form"
                onSubmit={handleSubmit}>
                <h1 className='login'>Log In</h1>
                <ul>
                    {errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
                </ul>
                <div className="username-input">

                    <label className="username">
                        Username or Email
                        </label>
                        <input
                            className='login-input'
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                </div>
                <div className="password-input">
                    <label className="password">
                        Passwrod
                        </label>
                        <input
                            className='login-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPasswrod(e.target.value)}
                            required
                        />
                </div>
                <button className="login-button" type="submit">Log In</button>

            </form>
        </>

    );
};

export default LoginFormModal;
