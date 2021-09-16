import './App.css';
import './index.css';
import Map from './components/Map'
import Header from './components/Header'
import Filter from './components/Filter'
import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

function App(props) {

  const [loggedin, setLoggedin] = useState(false);

  useEffect(
    () => {

    document.title = process.env.REACT_APP_WindowTitle;

    const history = createBrowserHistory();  

    //var loggedin = false;
    var hash = window.location.search.substr(1);//response_type=code bruker search
    const innerMainURL = window.location.origin + '/' // '/' trengs bare til localhost

    var results = {}

    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        results[parts[0]] = parts[1];    
        return results;
        
    }, {});

    console.log(results) //TODO: Les gyldig filter

    if ((result).code) { //Bruker har akkurat logget inn    
      try { //Try getting tokens
        let authURL = process.env.REACT_APP_AGOLAuthorizeURL.replace("{0}", process.env.REACT_APP_AGOLAuthorizeClientID).replace("{1}", result.code).replace("{2}", innerMainURL);
        fetch(authURL)
          .then(response => response.json())
            .then(data => {          
              console.log(data)
              if (data.error) { //Skjer spesielt hvis login er expired
                setLoggedin(false);                    
              }
              else {     
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('expires_in', data.expires_in);
                sessionStorage.setItem('refresh_token', data.refresh_token);            
                setLoggedin(true);
                history.push("/");
              }
            })
      }
      catch(e){           
        console.log(e)
        setLoggedin(false);
      }
    }
    else  if (sessionStorage.getItem('access_token') && sessionStorage.getItem('username') && sessionStorage.getItem('expires_in') && sessionStorage.getItem('refresh_token')){ //Bruker er allerede logget inn
      setLoggedin(true);
    }
    else if ((result).error && (result).error_description) { //Ved utgått bruker (kanskje også andre?)
      alert("Du har ikke tilgang til NiN - Søkoganalyse! Kontakt systemansvarlig! \nFeilmelding: " + decodeURIComponent((result).error_description))
      setLoggedin(false);
    }
    else { //Første visit
      console.log("Logger ut")
      setLoggedin(false);
    }
  }, []);

  return (
    <div className="App">
      <Header loggedin={loggedin}/>
      <div className="maincontent">
        <Filter />
        <Map />
      </div>

    </div>
  );
}

export default App;
