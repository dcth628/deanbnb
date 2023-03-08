import React, { useState } from "react";
import * as seesionActions from '../../store/session';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const DemoUserLogIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ credential, setCredential] = useState("demo@user.io");
    const [ password, setPassword ] = useState("password");

    const demoUserLogin = async (e) => {
        e.preventDefault();
        return dispatch(seesionActions.login({credential, password}))
        .then(history.push('/spots'))
    };

    return (
        <button onClick={demoUserLogin}>Demo User</button>
    )
};

export default DemoUserLogIn;
