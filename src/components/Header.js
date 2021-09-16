

import React from 'react';
import '../css/header.css';
import logoMD from '../images/miljodir_logo_2021.png';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logout from './Logout';

export default function Header(props) {
 
    return (      
      <div id="headerContainer" className="row align-items-center m-0">                
        <div className="col-6 pl-0 d-flex align-items-center">
          <div className="d-inline-block ml-0 pl-0 mr-4">
            <img src={logoMD} alt="logo" height="80" />                                    
          </div>
          <div className="d-inline-block">
            <h3 className="miljodirlogotext">{process.env.REACT_APP_HeaderText}</h3>               
          </div>  
        </div>
        <div className="col-6 h-100">          
          <Logout loggedin={props.loggedin}/>
        </div>          
      </div>          
    );
}

