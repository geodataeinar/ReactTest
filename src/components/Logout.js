import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/logout.css';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';


export default function Logout(props) {

  
    //const [userIsLoggedIn, setUserIsLoggedIn] = useState(props.loggedin);
    const [username, setUsername] = useState(sessionStorage.username);

    // if (sessionStorage.username) {
    //   setUsername(sessionStorage.username)
    // }

    useEffect(
      () => {
        console.log(props.loggedin)
        if (sessionStorage.username) {
          setUsername(sessionStorage.username)
        }
        else {
          setUsername("Ikke logget inn")
        }
      }, [props.loggedin]);
 

    const logInOrOut = () => {
      if (props.loggedin) {
        //setUserIsLoggedIn(false);
        sessionStorage.clear()
        var wnd = window.open(process.env.REACT_APP_URLNaturbaseLogout);
          setTimeout(function() {
            if (wnd) { 
              wnd.close();
              window.location.reload()
            }
            else{ //Skjer hvis bruker har blokkert forgrunnpopups i nettleseren
              window.location = process.env.REACT_APP_URLNaturbaseLogout
            }
          }, 1);
      }
      else {
        const innerMainURL = window.location.origin + '/'
        let authURL2 = process.env.REACT_APP_AGOLAuthorizeURL2.replace("{0}", process.env.REACT_APP_AGOLAuthorizeClientID).replace("{1}", innerMainURL);
        window.location = authURL2
      }

    }

    // if (userIsLoggedIn) {
    //   store.subscribe(() => {
    //       setUsername(store.getState().user.name)
    //   });
    // }

    return (
      <div className="w-150px float-right h-100">  
        <div className="d-flex flex-row-reverse h-100">  
          <button onClick={logInOrOut} className="logoutbutton">
            <FontAwesomeIcon icon={faUserAlt} />
            <p className="mt-0 mb-0">{username}</p>
            <h5 className="m-0">{props.loggedin ? "Logg ut" : "Logg inn"}</h5>
          </button> 
        </div>
      </div>
    );
}
