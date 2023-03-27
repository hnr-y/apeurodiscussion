import ReactDOM from 'react-dom/client'
import App from './App'
import {GoogleOAuthProvider} from '@react-oauth/google';


document.body.style.paddingTop = 0
ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="1010983540888-f1sblt8aj006tvabkas65plkmqjaditt.apps.googleusercontent.com">
        <App /></GoogleOAuthProvider>
)