import React from 'react';
import Burger from './Burger';
import Login from './Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
body {
    font-family: "specialhelvetica";
    color: white;
}

#animationBackground {
    width: 75%;
    height: 75%;
    margin-left: 22%;
    display: inline-block;
    position: absolute;
    z-index: 997;
    margin-top: 10%;
}

#thing {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 997;
}




.title {
    font-size: 50px;
    position: absolute;
    display: inline-block;
    text-align: center;
    display: inline-block;
    margin-top: 6%;
    z-index: 997;
    background-color: transparent;
}

#intro {
    font-size: 25px;
    display: inline-block;
    margin-top: 6%;
    z-index: 997;
    background-color: transparent;
    margin-left: 5%;
}

#link {
    color: #7e9bb3;
    background-color: transparent;
}

#bodyText {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 997;
    background-color: transparent;
}
`
const About = () => {
    useEffect(() => {
        let animation = window.bodymovin.loadAnimation({
            container: document.getElementById('animationBackground'),
            path: 'sphereGrey.json',
            render: 'svg',
            loop: true,
            autoplay: true,
        })

    })
    return (
        <div>
            <Ul>
            <Burger></Burger>
            <div id="animationBackground"></div>
            <div id="thing">
                <p className="title">About</p>
            </div>
            <br />
            <div id="bodyText">
                <p id="intro">The AP European discussion tracker strives to bridge the gap between students and teachers. We
                    provide free real time discussion tracking with additional features such as point heat maps and automatic
                    input into canvas. The project is open source and available via <a id="link"
                        href="https://github.com/hnr-y/apeurodiscussion">GitHub</a>. <br /> <br /> <b> Henry Lee <i>UX/UI Designer
                            and
                            Frontend Developer</i> </b> <br /> Henry Lee enjoys mountain biking on his free
                    time. He is a USACO silver qualifier and AP European History enjoyer. He has 6.2k clash royale trophies.
                    <br /> <br /> <b> Edwin Hou <i> Full Stack Developer</i> </b> <br /> Edwin Hou enjoys Clash Royale on his free
                    time and is
                    a top 10,000 player with 9000 trophies. He is also an USACO silver qualifier and USAMO qualifier. <br /> <br />
                    <br /> <br /> <br /> <b> Why? </b> <br /> This project meant hundreds of hours put into learning react, node, SQL,
                    and many more technologies and even more passion. Through this, we believe we have brought an invaluable
                    tool to many classNamerooms across the school. We saw the slow and archaic the old system of paper and pen was,
                    and just like that, we created this service to help our already overwhelmed teachers.
                </p>
            </div>
            </Ul>
        </div>
    )
}
export default About
