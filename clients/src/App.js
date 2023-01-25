import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";

import Leaderboard from './leaderboard'
import Recorder from './recorder'
import Teacher from './teacher';
import './App.css'
const Home = () => {
    document.body.style.background = '#292C2E'
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "8vh", marginTop: 0, marginBottom: 0, fontFamily: 'specialhelvetica', backgroundColor: '#292C2E' }}>
                AP European <span style={{ color: "white" }}>History</span>
            </h1>
            <p style={{ color: 'white', fontSize: '10vh', textAlign: 'center', fontFamily: 'specialhelvetica' }}>W landing page</p>

            <Link style={{ marginLeft: 100, color: 'white', fontFamily: 'specialhelvetica' }} to="/">home</Link>
            <Link style={{ marginLeft: 100, color: 'white', fontFamily: 'specialhelvetica' }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100, color: 'white', fontFamily: 'specialhelvetica' }} to="/leaderboard">leaderboard</Link>
            <Link style={{ marginLeft: 100, color: 'white', fontFamily: 'specialhelvetica' }} to="/teacher">teacher</Link>
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