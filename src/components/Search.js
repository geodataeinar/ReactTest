import React, { useState } from 'react';

import '../css/search.css';

import { loadModules } from 'esri-loader';

import Result from './Result'

import { getWhereUrlNaturtyper, getWhereUrlVern } from '../helpers.js'

export default function Search(props) {
  //console.log(props)

    const [resultjson, setResultJson] = useState(null);
    const [sql, setSql] = useState("");

    const searchnaturtyper = () => {
      console.log("Searching...")
      //Naturtyper NIN (Alle)
      //https://kart.miljodirektoratet.no/arcgis/rest/services/naturtyper_nin/MapServer/0
      const url = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/naturtyper_nin/MapServer/0"

      var whereurl = getWhereUrlNaturtyper(props)

      console.log(whereurl)
      if (whereurl !== "") {
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
          var queryn = new Query();
          queryn.returnGeometry = false;
          queryn.outFields = "OBJECTID,Områdenavn,Faktaark";
          queryn.where = whereurl;
          queryn.returnDistinctValues = false;
          var queryTaskn = new QueryTask({
              url: url
          });
          queryTaskn.execute(queryn).then(result => { 
            setResultJson(JSON.stringify(result));
            setSql(whereurl);
          })
          .catch(ex => {
              console.log(ex);
          });
        });
      }
      else {
        setResultJson(JSON.stringify({error: 'Ingen filter er valgt'}));
      }

    }

    const searchvern = () => {
      console.log("Searching...")
      //Vern_Naturomrader_NiN (Alle)
      //https://kart.miljodirektoratet.no/arcgis/rest/services/vern_naturomrader_nin/MapServer/0
      const url = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/vern_naturomrader_nin/MapServer/0"
      
      var whereurl = getWhereUrlVern(props)
      
      console.log(whereurl)
      if (whereurl !== "") {
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {

          var queryv = new Query();
          queryv.returnGeometry = false;
          queryv.outFields = "OBJECTID,Område5kid,Faktaark";
          queryv.where = whereurl;
          queryv.returnDistinctValues = false;
          var queryTaskv = new QueryTask({
              url: url
          });
          queryTaskv.execute(queryv).then(result => { 
            setResultJson(JSON.stringify(result));
            setSql(whereurl);
          })
          .catch(ex => {
              console.log(ex);
          });
        });
      }
      else {
        setResultJson(JSON.stringify({error: 'Ingen filter er valgt'}));
      }
    }


    return (
      <div>
        {props.filtersetting === "Naturtyper" ? 
        <button className="btn btn-primary btn-sm mt-2 btn-block w-100" onClick={searchnaturtyper}>Søk Naturtyper NIN</button>
        : "" }
        {props.filtersetting === "Vern" ? 
        <button className="btn btn-primary btn-sm mt-2 btn-block w-100" onClick={searchvern}>Søk Vern Naturområder NIN</button>
        : "" }
        <Result resultjson={resultjson} filtersetting={props.filtersetting} sql={sql}/>
      </div>
    );
}
