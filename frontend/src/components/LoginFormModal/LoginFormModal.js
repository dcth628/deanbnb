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
            .then(history.push('/'))
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
                        <input
                            className='login-input'
                            placeholder="Username or Email"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />

                        <input
                            className='login-input'
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPasswrod(e.target.value)}
                            required
                        />

                <button className="login-button" type="submit">Log In</button>

            </form>
        </>

    );
};

export default LoginFormModal;
