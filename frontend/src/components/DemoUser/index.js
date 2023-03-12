import React, { useState } from "react";
import * as seesionActions from '../../store/session';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentSpot } from "../../store/spot";
import { useModal } from "../../context/Modal";
import './DemoUser.css';

const DemoUserLogIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const [ credential, setCredential] = useState("demo@user.io");
    const [ password, setPassword ] = useState("password");

    const demoUserLogin = async (e) => {
        e.preventDefault();
        return dispatch(seesionActions.login({credential, password}))
        .then(closeModal)
        .then(history.push('/'))
        .then(dispatch(getCurrentSpot()))
    };

    return (
        <button className="demo-user-button" onClick={demoUserLogin}>Demo User</button>
    )
};

export default DemoUserLogIn;
