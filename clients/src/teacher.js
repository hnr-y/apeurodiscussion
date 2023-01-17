import { Link } from "react-router-dom";
const Teacher = () => {
    return(
        <div>
            <Link style={{ marginLeft: 100 }} to="/">home</Link>
            <Link style={{ marginLeft: 100 }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100 }} to="/leaderboard">leaderboard</Link>
            <div style={{marginTop: "10em", marginLeft: "10em", width:"10em", height:"10em", backgroundColor: "#292C2E"}}>

            </div>
        </div>
    )

}

export default Teacher
