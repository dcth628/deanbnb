import React, { useState } from "react";
import * as seesionActions from '../../store/session';
import { useDispatch } from "react-redux";

const DemoUserLogIn = () => {
    const dispatch = useDispatch();
    const [ credential, setCredential] = useState("demo@user.io");
    const [ password, setPassword ] = useState("password");

    const demoUserLogin = async (e) => {
        e.preventDefault();
        return dispatch(seesionActions.login({credential, password}))
    };

    return (
        <button onClick={demoUserLogin}>Demo User</button>
    )
};

export default DemoUserLogIn;
