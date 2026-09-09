import './App.css';
import RouteMain from './Routes';

import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <div className="App">

    <GoogleOAuthProvider clientId="345006772496-uvo2kh85h9sn1g4pef686hgv180re52c">
       <RouteMain />
    </GoogleOAuthProvider>

    </div>
  );
}

export default App;
