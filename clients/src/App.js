import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";

import Leaderboard from './leaderboard'
import Recorder from './recorder'
import Teacher from './teacher';
import Login from './Login';
import './App.css'
const Home = () => {

    document.body.style.background = '#292C2E'



    return (
        <div>
            <Login style={{ marginLeft: "100px", marginRight: "auto" }}></Login>

            <h1 style={{ textAlign: "center", fontSize: "5vh", marginTop: 0, marginBottom: 0, fontFamily: 'specialhelvetica', marginLeft: "40%", position: "absolute" }}>
                AP European <span style={{ color: "white" }}>History</span>
            </h1>
            <Link style={{marginTop:"100px", marginLeft: 100, color: 'white', fontFamily: 'specialhelvetica', position: "absolute" }} to="/">home</Link>
            <Link style={{marginTop:"100px", marginLeft: 200, color: 'white', fontFamily: 'specialhelvetica', position: "absolute" }} to="/recorder">recorder</Link>
            <Link style={{marginTop:"100px", marginLeft: 300, color: 'white', fontFamily: 'specialhelvetica', position: "absolute" }} to="/leaderboard">leaderboard</Link>
            <Link style={{marginTop:"100px", marginLeft: 430, color: 'white', fontFamily: 'specialhelvetica', position: "absolute" }} to="/teacher">teacher</Link>
            


        </div>
    )
}
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact={true} path="/" element={<Home />}>

                </Route>
                <Route path="/recorder" element={<Recorder />}>

                </Route>
                <Route path="/leaderboard" element={<Leaderboard />}>

                </Route>
                <Route path="/teacher" element={<Teacher />}>

                </Route>

            </Routes>
        </BrowserRouter>

    )
}
export default App
