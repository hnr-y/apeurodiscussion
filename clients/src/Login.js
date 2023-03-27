import React from 'react';
import io from 'socket.io-client';

import { useGoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios"
const Login = () => {
    const socket = io('localhost:5000', { path: '/server' })

    let navigate = useNavigate()

    const [image, setImage] = useState("")
    useEffect(() => {
        try {
            setImage(localStorage.getItem('picture'))
        } catch (error) {

        }
        window.addEventListener('storage', () => {
            try {
                setImage(localStorage.getItem('picture'))

            } catch (error) {

            }
        });
    })
    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                localStorage.setItem("name", res.data['name'])
                localStorage.setItem("picture", res.data['picture'])
                localStorage.setItem("email", res.data['email'])

                window.dispatchEvent(new Event("storage"));
                navigate('/recorder')

            } catch (err) {
                console.log(err)

            }

        }
    });
    socket.on('connect', (data) => {
        window.addEventListener('storage', () => {
            socket.emit('authentication', localStorage.getItem('name'))
        });
        socket.on('auth', (data) => {
            if (data == "correct") {
                navigate('/recorder')
            }
            else {
                navigate('/all')
            }
        })
    })
    const logout = () => {
        googleLogout()
        localStorage.clear()
        window.dispatchEvent(new Event("storage"));

    }
    return (

        <button style={{ fontSize: "75px", border: "transparent", backgroundColor: "transparent" }} onClick={login}>
            {/* <i className="fa-brands fa-google"></i> */}
            Sign In
        </button>
        // {/* <button onClick={logout}>
        //     <i className="fa-brands fa-google"></i>
        //     logout with google
        // </button> */}
        // {/* <img id='profilepicture' src={image} referrerPolicy="no-referrer" style={{marginTop: "5px",borderRadius: "50%", width:"50px", position:"absolute"}}></img> */}

    )

}

export default Login;