import React from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { useEffect, useState } from 'react';

import axios from "axios"
const Login = () => {
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

            } catch (err) {
                console.log(err)

            }

        }
    });
    const logout = () => {
        googleLogout()
        localStorage.clear()
        window.dispatchEvent(new Event("storage"));

    }
    return (
        <div style={{display:"inline-block", position:"relative", float:"right", marginRight: "100px", marginTop: "30px"}}>
            <button onClick={login}>
                <i className="fa-brands fa-google"></i>
                Continue with google
            </button>
            <button onClick={logout}>
                <i className="fa-brands fa-google"></i>
                logout with google
            </button>
            <img id='profilepicture' src={image} referrerPolicy="no-referrer" style={{marginTop: "5px",borderRadius: "50%", width:"50px", position:"absolute"}}></img>

        </div>

    )

}

export default Login;