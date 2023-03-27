import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import Intermediate from './Intermediate';
import Leaderboard from './leaderboard'
import Recorder from './recorder'
import Teacher from './teacher';
import Login from './Login';
import Home from './home';
import './App.css'
import PastLeaderboard from './PastLeaderboard';
import About from './aboutus'
import PastTeacher from './PastTeacher'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact={true} path="/" element={<Home />}>
                </Route>
                <Route path="/all" element={<Intermediate></Intermediate>}>
                </Route>
                <Route path="/recorder" element={<Recorder></Recorder>}>
                </Route>
                <Route path="/current/hughes/2/leaderboard" element={<Leaderboard period={2} teacher="Hughes" />}>
                </Route>
                <Route path="/current/hughes/4/leaderboard" element={<Leaderboard period={4} teacher="Hughes" />}>
                </Route>
                <Route path="/current/hughes/6/leaderboard" element={<Leaderboard period={6} teacher="Hughes" />}>
                </Route>
                <Route path="/current/ceran/1/leaderboard" element={<Leaderboard period={1} teacher="Ceran" />}>
                </Route>
                <Route path="/current/ceran/5/leaderboard" element={<Leaderboard period={5} teacher="Ceran" />}>
                </Route>
                <Route path="/past/hughes/2/" element={<PastLeaderboard state="past" period={2} teacher="Hughes" />}>
                </Route>
                <Route path="/past/hughes/4/" element={<PastLeaderboard state="past" period={4} teacher="Hughes" />}>
                </Route>
                <Route path="/past/hughes/6/" element={<PastLeaderboard state="past" period={6} teacher="Hughes" />}>
                </Route>
                <Route path="/past/ceran/1/" element={<PastLeaderboard state="past" period={1} teacher="Ceran" />}>
                </Route>
                <Route path="/past/ceran/5/" element={<PastLeaderboard state="past" period={5} teacher="Ceran" />}>
                </Route>
                <Route path="/teacher/1" element={<PastTeacher period={1} teacher="Ceran" />}>
                </Route>
                <Route path="/teacher/5" element={<PastTeacher period={5} teacher="Ceran" />}>
                </Route>
                <Route path="/teacher/2" element={<PastTeacher period={2} teacher="Hughes" />}></Route>
                <Route path="/teacher/4" element={<PastTeacher period={4} teacher="Hughes" />}></Route>
                <Route path="/teacher/6" element={<PastTeacher period={6} teacher="Hughes" />}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/teacher" element={<Teacher></Teacher>}></Route>
            </Routes>
        </BrowserRouter>

    )
}
export default App
