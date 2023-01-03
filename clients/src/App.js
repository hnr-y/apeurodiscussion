import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';

import Leaderboard from './leaderboard'
import Recorder from './recorder'

const Home = () => {
    axios
    .post('http://localhost:5000/create', {"a":"b"})


    return (
        <div>
            <h2>Helloe</h2>
            <p>From Euro Website</p>
            <Link style={{ marginLeft: 100 }} to="/">home</Link>
            <Link style={{ marginLeft: 100 }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100 }} to="/leaderboard">leaderboard</Link>
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


            </Routes>
        </BrowserRouter>

    )
}
export default App