import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPasswrod] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form
            className="signin-form"
            onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul>
            <div className="username-input">
                <label className="username">
                    Username or Email
                    <input
                        className='input'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="password-input">
                <label className="password">

                    Passwrod
                    <input
                        className='input'
                        type="password"
                        value={password}
                        onChange={(e) => setPasswrod(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button className="login-button" type="submit">Log In</button>
        </form>

    );
};

export default LoginFormPage;
