

import React, { useState, useEffect } from 'react';
import '../css/filter.css';
import Search from '../components/Search'
import Select from 'react-select';
import { loadModules } from 'esri-loader';
// import DatePicker from 'react-datepicker'; //TODO: Uninstall datepicker
// import logoMD from '../images/miljodir_logo_2021.png';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "react-datepicker/dist/react-datepicker.css";

// import Toggle from 'react-toggle' //TODO: Uninstall Toggle
// import "react-toggle/style.css" 


const Filter = (props) => {
    console.log("Startet filter")
    //const naturtyperurl = "https://kart.miljodirektoratet.no/arcgis/rest/services/naturtyper_nin/MapServer/0"
    const naturtyperurl = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/naturtyper_nin/MapServer/0"
    //const naturtyperurlprosjektomrade = "https://kart.miljodirektoratet.no/arcgis/rest/services/naturtyper_nin/MapServer/1"
    const naturtyperurlprosjektomrade = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/naturtyper_nin/MapServer/1"
    //const vernurl = "https://kart.miljodirektoratet.no/arcgis/rest/services/vern_naturomrader_nin/MapServer/0"
    const vernurl = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/vern_naturomrader_nin/MapServer/0"

    const kartleggingsenheterurl = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/kartleggingsenheter_nin/MapServer/16"
    const ulkmurl = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/kartleggingsenheter_nin/MapServer/17"
    const variablerurl = "https://arcgis03.miljodirektoratet.no/arcgis/rest/services/faktaark/kartleggingsenheter_nin/MapServer/18"

    //Filtersetting
    const [filtersetting, setFiltersetting] = useState("Naturtyper");

    //Fylke
    const [fylkeListArr, setFylkeListArr] = useState(null);
    const [selectedFilterFylke, setSelectedFilterFylke] = useState(null);

    //Kommune
    const [kommuneListArr, setKommuneListArr] = useState(null);
    const [selectedFilterKommune, setSelectedFilterKommune] = useState(null);

    //Naturvernområde
    const [naturvernomradeListArr, setNaturvernomradeListArr] = useState(null);
    const [selectedFilterNaturvernomrade, setSelectedFilterNaturvernomrade] = useState(null);

    //Prosjektområde/dekningskart 
    const [prosjektomradeListArr, setProsjektomradeListArr] = useState(null);
    const [selectedFilterProsjektomrade, setSelectedFilterProsjektomrade] = useState(null);

    //Kartleggingsenheter
    //Hovedtype gruppe
    const [kartleggingsenheterhovedtypegruppeListArr, setKartleggingsenheterhovedtypegruppeListArr] = useState(null);
    const [selectedFilterKartleggingsenheterhovedtypegruppe, setSelectedFilterKartleggingsenheterhovedtypegruppe] = useState(null);
    //Hovedtype
    const [kartleggingsenheterhovedtypeListArr, setKartleggingsenheterhovedtypeListArr] = useState(null);
    const [selectedFilterKartleggingsenheterhovedtype, setSelectedFilterKartleggingsenheterhovedtype] = useState(null);
    const [kartleggingsenheterhovedtypedisabled, setKartleggingsenheterhovedtypedisabled] = useState(true);
    //Kartleggingsenhet
    const [kartleggingsenheterkartleggingsenhetListArr, setKartleggingsenheterkartleggingsenhetListArr] = useState(null);
    const [selectedFilterKartleggingsenheterkartleggingsenhet, setSelectedFilterKartleggingsenheterkartleggingsenhet] = useState(null);
    const [kartleggingsenheterkartleggingsenhetdisabled, setKartleggingsenheterkartleggingsenhetdisabled] = useState(true);
    //Kode
    const [selectedFilterKartleggingsenheterkode, setSelectedFilterKartleggingsenheterkode] = useState(null);

    //Kartleggingsenheter (fritekstfelt)
    const [kartleggingsenheterListArr, setKartleggingsenheterListArr] = useState(null);
    const [selectedFilterKartleggingsenheter, setSelectedFilterKartleggingsenheter] = useState(null);

    //Variabler
    //Gruppe
    const [variablergruppeListArr, setVariablergruppeListArr] = useState(null);
    const [selectedFilterVariablergruppe, setSelectedFilterVariablergruppe] = useState(null);
    //Tema
    const [variablertemaListArr, setVariablertemaListArr] = useState(null);
    const [selectedFilterVariablertema, setSelectedFilterVariablertema] = useState(null);
    const [variablertemadisabled, setVariablertemadisabled] = useState(true);
    //Navn
    const [variablernavnListArr, setVariablernavnListArr] = useState(null);
    const [selectedFilterVariablernavn, setSelectedFilterVariablernavn] = useState(null);
    const [variablernavndisabled, setVariablernavndisabled] = useState(true);
    //Trinn
    const [variablertrinnListArr, setVariablertrinnListArr] = useState(null);
    const [selectedFilterVariablertrinn, setSelectedFilterVariablertrinn] = useState(null);
    const [variablertrinndisabled, setVariablertrinndisabled] = useState(true);
    //Kode
    const [selectedFilterVariablerkode, setSelectedFilterVariablerkode] = useState(null);
    
    //Variabler (fritekstfelt)
    const [variablerListArr, setVariablerListArr] = useState(null);
    const [selectedFilterVariabler, setSelectedFilterVariabler] = useState(null);

    //ULKM
    //Gruppe
    const [ulkmNiNHovedtypegruppeListArr, setUlkmNiNHovedtypegruppeListArr] = useState(null);
    const [selectedFilterUlkmNiNHovedtypegruppe, setSelectedFilterUlkmNiNHovedtypegruppe] = useState(null);
    //Tema
    const [ulkmNiNHovedtypeListArr, setUlkmNiNHovedtypeListArr] = useState(null);
    const [selectedFilterUlkmNiNHovedtype, setSelectedFilterUlkmNiNHovedtype] = useState(null);
    const [ulkmNiNHovedtypedisabled, setUlkmNiNHovedtypedisabled] = useState(true);
    //Navn
    const [ulkmgradientkodeListArr, setUlkmgradientkodeListArr] = useState(null);
    const [selectedFilterUlkmgradientkode, setSelectedFilterUlkmgradientkode] = useState(null);
    const [ulkmgradientkodedisabled, setUlkmgradientkodedisabled] = useState(true);
    //Trinn
    const [ulkmtrinnListArr, setUlkmtrinnListArr] = useState(null);
    const [selectedFilterUlkmtrinn, setSelectedFilterUlkmtrinn] = useState(null);
    const [ulkmtrinndisabled, setUlkmtrinndisabled] = useState(true);
    //Kode
    const [selectedFilterUlkmkode, setSelectedFilterUlkmkode] = useState(null);

    //ULKM (fritekstfelt)
    const [ulkmListArr, setUlkmListArr] = useState(null);
    const [selectedFilterUlkm, setSelectedFilterUlkm] = useState(null);

    //Kartleggingsår
    const [kartleggingsaarListArr, setKartleggingsaarListArr] = useState(null);
    const [selectedFilterKartleggingsaar, setSelectedFilterKartleggingsaar] = useState(null);

    //Firma
    const [firmaListArr, setFirmaListArr] = useState(null);
    const [selectedFilterFirma, setSelectedFilterFirma] = useState(null);

    //Areal
    const [arealnumber, setArealnumber] = useState(0);
    const [arealmoreorless, setArealmoreorless] = useState(">");

    //Naturtyper
    const [naturtyperListArr, setNaturtyperListArr] = useState(null);
    const [selectedFilterNaturtyper, setSelectedFilterNaturtyper] = useState(null);

    //Naturtype utvalgskriterier
    const [UK_Truetstate, setUK_Truetstate] = useState("Ingen filter");
    const [UK_NærTruetstate, setUK_NærTruetstate] = useState("Ingen filter");
    const [UK_SpesieltDårligKartlagtstate, setUK_SpesieltDårligKartlagtstate] = useState("Ingen filter");
    const [UK_SentralØkosystemFunksjonstate, setUK_SentralØkosystemFunksjonstate] = useState("Ingen filter");
    const [UK_SeBekrivelseNaturtypestate, setUK_SeBekrivelseNaturtypestate] = useState("Ingen filter");
    const [UK_IngenStatusstate, setUK_IngenStatusstate] = useState("Ingen filter");

    //Lokalitetskvalitet
    const [lokalitetskvalitetListArr, setLokalitetskvalitetListArr] = useState(null);
    const [selectedFilterLokalitetskvalitet, setSelectedFilterLokalitetskvalitet] = useState(null);

    //Tilstand
    const [tilstandListArr, setTilstandListArr] = useState(null);
    const [selectedFilterTilstand, setSelectedFilterTilstand] = useState(null);

    //Naturmangfold
    const [naturmangfoldListArr, setNaturmangfoldListArr] = useState(null);
    const [selectedFilterNaturmangfold, setSelectedFilterNaturmangfold] = useState(null);

    //Hovedøkosystem
    const [hovedokosystemListArr, setHovedokosystemListArr] = useState(null);
    const [selectedFilterHovedokosystem, setSelectedFilterHovedokosystem] = useState(null);

    const statechange = (setstatefunc, event) => {
        if (event && setstatefunc) {
            setstatefunc(event);      
        }
        else {        
            setstatefunc(null);                        
        }
    }

    const statechangetext = (setstatefunc, event) => {
        if (event && setstatefunc) {
          //console.log(event)
            setstatefunc(event.target.value);      
        }
        else {        
            setstatefunc(null);                        
        }
    }
    const statechangemoreorless = (event, moreorless) => { //Trigges bare ved check, ikke ved uncheck
        if (event && moreorless) {
          setArealmoreorless(moreorless);
        }
    }
    const statechangeresetareal = (event, event2) => { //Trigges bare ved check, ikke ved uncheck
        if (event) {
          setArealnumber(0);
        }
    }

    useEffect(() => {
      if(selectedFilterKartleggingsenheterhovedtypegruppe){//Hovedtypegrupe har akkurat blitt valgt
        updatekodek()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var querykartleggingsenheterh = new Query();
            querykartleggingsenheterh.returnGeometry = false;
            querykartleggingsenheterh.outFields = "hovedtype,hovedtypebeskrivelse";
            querykartleggingsenheterh.where = "hovedtypegruppe='" + selectedFilterKartleggingsenheterhovedtypegruppe.value + "'";
            querykartleggingsenheterh.returnDistinctValues = true;
            var queryTaskkartleggingsenheterh = new QueryTask({
                url: kartleggingsenheterurl
            });
            queryTaskkartleggingsenheterh.execute(querykartleggingsenheterh).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.hovedtype + " (" + element.attributes.hovedtypebeskrivelse + ")", value: element.attributes.hovedtype })
              });
              setSelectedFilterKartleggingsenheterhovedtype(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterKartleggingsenheterkartleggingsenhet(null); //Nullstill i tilfellet noe er valgt allerede

              setKartleggingsenheterhovedtypeListArr(temparr);
              setKartleggingsenheterkartleggingsenhetListArr(null); //Nullstill i tilfellet noe er valgt allerede

              setKartleggingsenheterkartleggingsenhetdisabled(true); //Disable
              setKartleggingsenheterhovedtypedisabled(false); //Enable

            })
            .catch(ex => {
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterKartleggingsenheterhovedtype(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterKartleggingsenheterkartleggingsenhet(null); //Nullstill i tilfellet noe er valgt allerede

        setKartleggingsenheterkartleggingsenhetListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setKartleggingsenheterhovedtypeListArr(null);

        setKartleggingsenheterkartleggingsenhetdisabled(true); //Disable
        setKartleggingsenheterhovedtypedisabled(true);

        updatekodek();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterKartleggingsenheterhovedtypegruppe])

    useEffect(() => {
      if(selectedFilterKartleggingsenheterhovedtype){//Hovedtype har akkurat blitt valgt
        updatekodek()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var querykartleggingsenheterk = new Query();
            querykartleggingsenheterk.returnGeometry = false;
            querykartleggingsenheterk.outFields = "kartleggingsenhet,kartleggingsenhetbeskrivelse";
            querykartleggingsenheterk.where = "hovedtypegruppe='" + selectedFilterKartleggingsenheterhovedtypegruppe.value + "' AND hovedtype='" + selectedFilterKartleggingsenheterhovedtype.value + "'";
            querykartleggingsenheterk.returnDistinctValues = true;
            var queryTaskkartleggingsenheterk = new QueryTask({
                url: kartleggingsenheterurl
            });
            queryTaskkartleggingsenheterk.execute(querykartleggingsenheterk).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.kartleggingsenhet + " (" + element.attributes.kartleggingsenhetbeskrivelse + ")", value: element.attributes.kartleggingsenhet })
              });
              setSelectedFilterKartleggingsenheterkartleggingsenhet(null); //Nullstill i tilfellet noe er valgt allerede

              setKartleggingsenheterkartleggingsenhetdisabled(false); //Enable

              setKartleggingsenheterkartleggingsenhetListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterKartleggingsenheterkartleggingsenhet(null); //Nullstill i tilfellet noe er valgt allerede

        setKartleggingsenheterkartleggingsenhetListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setKartleggingsenheterkartleggingsenhetdisabled(true); //Disable

        updatekodek();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterKartleggingsenheterhovedtype])

    useEffect(() => {
      updatekodek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterKartleggingsenheterkartleggingsenhet])

    useEffect(() => {
      if(selectedFilterVariablergruppe){//Hovedtypegrupe har akkurat blitt valgt
        updatekodev()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var queryvariablerh = new Query();
            queryvariablerh.returnGeometry = false;
            queryvariablerh.outFields = "tema,temabeskrivelse";
            queryvariablerh.where = "gruppe='" + selectedFilterVariablergruppe.value + "'";
            queryvariablerh.returnDistinctValues = true;
            var queryTaskvariablerh = new QueryTask({
                url: variablerurl
            });
            queryTaskvariablerh.execute(queryvariablerh).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.tema + " (" + element.attributes.temabeskrivelse + ")", value: element.attributes.tema })
              });
              setSelectedFilterVariablertema(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterVariablernavn(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterVariablertrinn(null); //Nullstill i tilfellet noe er valgt allerede
              
              setVariablertemaListArr(temparr);
              setVariablernavnListArr(null); //Nullstill i tilfellet noe er valgt allerede
              setVariablertrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

              setVariablertemadisabled(false); //Enable
              setVariablernavndisabled(true);
              setVariablertrinndisabled(true); //Disable
            })
            .catch(ex => {
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterVariablertema(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterVariablernavn(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterVariablertrinn(null); //Nullstill i tilfellet noe er valgt allerede

        setVariablertemaListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setVariablernavnListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setVariablertrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setVariablertemadisabled(true);
        setVariablernavndisabled(true);
        setVariablertrinndisabled(true); //Disable

        updatekodev();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterVariablergruppe])

    useEffect(() => {
      if(selectedFilterVariablertema){//Hovedtypegrupe har akkurat blitt valgt
        updatekodev()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var queryvariablerh = new Query();
            queryvariablerh.returnGeometry = false;
            queryvariablerh.outFields = "navn,navnbeskrivelse";
            queryvariablerh.where = "gruppe='" + selectedFilterVariablergruppe.value + "' AND tema='" + selectedFilterVariablertema.value + "'";
            queryvariablerh.returnDistinctValues = true;
            var queryTaskvariablerh = new QueryTask({
                url: variablerurl
            });
            queryTaskvariablerh.execute(queryvariablerh).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.navn + " (" + element.attributes.navnbeskrivelse + ")", value: element.attributes.navn })
              });
              setSelectedFilterVariablernavn(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterVariablertrinn(null); //Nullstill i tilfellet noe er valgt allerede
              
              setVariablernavnListArr(temparr); //Nullstill i tilfellet noe er valgt allerede
              setVariablertrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

              setVariablernavndisabled(false);
              setVariablertrinndisabled(true); //Disable
            })
            .catch(ex => {
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterVariablernavn(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterVariablertrinn(null); //Nullstill i tilfellet noe er valgt allerede

        setVariablernavnListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setVariablertrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setVariablernavndisabled(true);
        setVariablertrinndisabled(true); //Disable

        updatekodev();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterVariablertema])

    useEffect(() => {
      if(selectedFilterVariablernavn){//Hovedtypegrupe har akkurat blitt valgt
        updatekodev()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var queryvariablerh = new Query();
            queryvariablerh.returnGeometry = false;
            queryvariablerh.outFields = "trinn,trinnbeskrivelse";
            queryvariablerh.where = "gruppe='" + selectedFilterVariablergruppe.value + "' AND tema='" + selectedFilterVariablertema.value + "' AND navn='" + selectedFilterVariablernavn.value + "'";
            queryvariablerh.returnDistinctValues = true;
            var queryTaskvariablerh = new QueryTask({
                url: variablerurl
            });
            queryTaskvariablerh.execute(queryvariablerh).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.trinn + " (" + element.attributes.trinnbeskrivelse + ")", value: element.attributes.trinn })
              });
              setSelectedFilterVariablertrinn(null); //Nullstill i tilfellet noe er valgt allerede
              
              setVariablertrinnListArr(temparr); //Nullstill i tilfellet noe er valgt allerede

              setVariablertrinndisabled(false); //Enable
            })
            .catch(ex => {
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterVariablertrinn(null); //Nullstill i tilfellet noe er valgt allerede

        setVariablertrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setVariablertrinndisabled(true); //Disable

        updatekodev();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterVariablernavn])

    useEffect(() => {
      updatekodev();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterVariablertrinn])

    useEffect(() => {
      if(selectedFilterUlkmNiNHovedtypegruppe){//Hovedtypegrupe har akkurat blitt valgt
        updatekodeu()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var queryUlkmh = new Query();
            queryUlkmh.returnGeometry = false;
            queryUlkmh.outFields = "ninhovedtype";
            queryUlkmh.where = "ninhovedtypegruppe='" + selectedFilterUlkmNiNHovedtypegruppe.value + "'";
            queryUlkmh.returnDistinctValues = true;
            var queryTaskUlkmh = new QueryTask({
                url: ulkmurl
            });
            queryTaskUlkmh.execute(queryUlkmh).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.ninhovedtype, value: element.attributes.ninhovedtype })
              });
              setSelectedFilterUlkmNiNHovedtype(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterUlkmgradientkode(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterUlkmtrinn(null); //Nullstill i tilfellet noe er valgt allerede
              
              setUlkmNiNHovedtypeListArr(temparr);
              setUlkmgradientkodeListArr(null); //Nullstill i tilfellet noe er valgt allerede
              setUlkmtrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

              setUlkmNiNHovedtypedisabled(false); //Enable
              setUlkmgradientkodedisabled(true);
              setUlkmtrinndisabled(true); //Disable
            })
            .catch(ex => {
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterUlkmNiNHovedtype(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterUlkmgradientkode(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterUlkmtrinn(null); //Nullstill i tilfellet noe er valgt allerede

        setUlkmNiNHovedtypeListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setUlkmgradientkodeListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setUlkmtrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setUlkmNiNHovedtypedisabled(true);
        setUlkmgradientkodedisabled(true);
        setUlkmtrinndisabled(true); //Disable

        updatekodeu();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterUlkmNiNHovedtypegruppe])

    useEffect(() => {
      if(selectedFilterUlkmNiNHovedtype){//Hovedtypegrupe har akkurat blitt valgt
        updatekodeu()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var queryUlkmg = new Query();
            queryUlkmg.returnGeometry = false;
            queryUlkmg.outFields = "gradientkode,gradientkodebeskrivelse";
            queryUlkmg.where = "ninhovedtypegruppe='" + selectedFilterUlkmNiNHovedtypegruppe.value + "' AND ninhovedtype='" + selectedFilterUlkmNiNHovedtype.value + "'";
            queryUlkmg.returnDistinctValues = true;
            var queryTaskUlkmg = new QueryTask({
                url: ulkmurl
            });
            queryTaskUlkmg.execute(queryUlkmg).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.gradientkode + " (" + element.attributes.gradientkodebeskrivelse + ")", value: element.attributes.gradientkode })
              });
              setSelectedFilterUlkmgradientkode(null); //Nullstill i tilfellet noe er valgt allerede
              setSelectedFilterUlkmtrinn(null); //Nullstill i tilfellet noe er valgt allerede
              
              setUlkmgradientkodeListArr(temparr);
              setUlkmtrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

              setUlkmgradientkodedisabled(false);
              setUlkmtrinndisabled(true); //Disable
            })
            .catch(ex => {  
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterUlkmgradientkode(null); //Nullstill i tilfellet noe er valgt allerede
        setSelectedFilterUlkmtrinn(null); //Nullstill i tilfellet noe er valgt allerede

        setUlkmgradientkodeListArr(null); //Nullstill i tilfellet noe er valgt allerede
        setUlkmtrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setUlkmgradientkodedisabled(true);
        setUlkmtrinndisabled(true); //Disable

        updatekodeu();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterUlkmNiNHovedtype])

    useEffect(() => {
      if(selectedFilterUlkmgradientkode){//Hovedtypegrupe har akkurat blitt valgt
        updatekodeu()
        loadModules(
          [
            "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
          ], { css: true })
        .then((
          [
            Query,
            QueryTask         
          ]) => {
            var queryUlkmt = new Query();
            queryUlkmt.returnGeometry = false;
            queryUlkmt.outFields = "trinn,trinnbeskrivelse";
            queryUlkmt.where = "ninhovedtypegruppe='" + selectedFilterUlkmNiNHovedtypegruppe.value + "' AND ninhovedtype='" + selectedFilterUlkmNiNHovedtype.value + "' AND gradientkode='" + selectedFilterUlkmgradientkode.value + "'";
            queryUlkmt.returnDistinctValues = true;
            var queryTaskUlkmt = new QueryTask({
                url: ulkmurl
            });
            queryTaskUlkmt.execute(queryUlkmt).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.trinn + " (" + element.attributes.trinnbeskrivelse + ")", value: element.attributes.trinn })
              });
              setSelectedFilterUlkmtrinn(null); //Nullstill i tilfellet noe er valgt allerede
              
              setUlkmtrinnListArr(temparr); //Nullstill i tilfellet noe er valgt allerede

              setUlkmtrinndisabled(false);
            })
            .catch(ex => {  
                console.log(ex);
            });
          });
      }
      else { //Feltet har akkurat blitt nullstilt
        setSelectedFilterUlkmtrinn(null); //Nullstill i tilfellet noe er valgt allerede

        setUlkmtrinnListArr(null); //Nullstill i tilfellet noe er valgt allerede

        setUlkmtrinndisabled(true); //Disable

        updatekodeu();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterUlkmgradientkode])

    useEffect(() => {
      updatekodeu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilterUlkmtrinn])

    const updatekodek = () => {
      var kode = "NA_";
      if (selectedFilterKartleggingsenheterhovedtypegruppe) {
        kode += selectedFilterKartleggingsenheterhovedtypegruppe.value
      }
      if (selectedFilterKartleggingsenheterhovedtype) {
        kode += selectedFilterKartleggingsenheterhovedtype.value
      }
      if (selectedFilterKartleggingsenheterkartleggingsenhet) {
        kode += "-" + selectedFilterKartleggingsenheterkartleggingsenhet.value
      }
      setSelectedFilterKartleggingsenheterkode(kode)
    }

    const updatekodev = () => {
      var kode = "";
      if (selectedFilterVariablergruppe) {
        kode += selectedFilterVariablergruppe.value
      }
      if (selectedFilterVariablertema) {
        kode += selectedFilterVariablertema.value
      }
      if (selectedFilterVariablernavn) {
        kode += "-" + selectedFilterVariablernavn.value
      }
      if (selectedFilterVariablertrinn) {
        kode += "_" + selectedFilterVariablertrinn.value
      }
      setSelectedFilterVariablerkode(kode)
    }

    const updatekodeu = () => {
      var kode = "";
      if (selectedFilterUlkmNiNHovedtypegruppe) {
        kode += selectedFilterUlkmNiNHovedtypegruppe.value
      }
      if (selectedFilterUlkmNiNHovedtype) {
        kode += selectedFilterUlkmNiNHovedtype.value
      }
      if (selectedFilterUlkmgradientkode) {
        kode += "-" + selectedFilterUlkmgradientkode.value
      }
      if (selectedFilterUlkmtrinn) {
        kode += "_" + selectedFilterUlkmtrinn.value
      }
      console.log(kode)
      setSelectedFilterUlkmkode(kode)
    } 

    // const filterProjectsByFylke = (event) => {        
    //     if (event) {            
    //         setSelectedFilterFylke(event);            
    //     }
    //     else {        
    //         setSelectedFilterFylke(null);                        
    //     }
    // }

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'blue' : 'black',
        padding: 20,
      })
    }

    const addFilter = () => {
      console.log("Adding filter...")
    }

    useEffect(
      () => {
        console.log("Filtereffect triggered")
        var mainurl = ""

        loadModules(
            [
              "esri/rest/support/Query", "esri/tasks/QueryTask" //Querytask unngår på magisk vis CORS-problematikk
            ], { css: true })
          .then((
            [
              Query,
              QueryTask         
            ]) => {
          if(filtersetting === "Naturtyper") {
            console.log("Trigger Naturtyperpopulering")
            mainurl = naturtyperurl;
          } 
          else if (filtersetting === "Vern"){
            console.log("Trigger Vernpopulering")
            mainurl = vernurl;
          }
          else{
            console.error(filtersetting)
          }

          if(filtersetting === "Vern") {
            //Fylke (Det finnes objekter med flere fylker, f.eks "Viken,Oslo" eller "Nordland,Troms og Finnmark")
            //Fylke (Feltet finnes bare i Vern)
            var queryf = new Query();
            queryf.returnGeometry = false;
            queryf.outFields = "Fylker";
            queryf.where = "1=1";
            queryf.returnDistinctValues = true;
            var queryTaskf = new QueryTask({
                url: mainurl
            });
            queryTaskf.execute(queryf).then(result => {
              var temparr = []
              result.features.forEach(element => {
                if(element.attributes.Fylker.includes(",")){ // Del opp fylkene
                  var templist = element.attributes.Fylker.split(",")
                  templist.forEach(element2 => {
                    if (!(temparr.some(e => e.value === element2))){ //Vi liker ikke duplikater
                      temparr.push({ label: element2, value: element2 })
                    }
                  });
                }
                else {
                  if (!(temparr.some(e => e.value === element.attributes.Fylker))){ //Vi liker ikke duplikater
                    temparr.push({ label: element.attributes.Fylker, value: element.attributes.Fylker })
                  }
                }
              });
              setFylkeListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });
          }

          var queryko = new Query();
          queryko.returnGeometry = false;
          queryko.outFields = "Kommuner";
          queryko.where = "1=1";
          queryko.returnDistinctValues = true;
          var queryTaskko = new QueryTask({
              url: mainurl
          });
          queryTaskko.execute(queryko).then(result => {
            var temparr = []
            result.features.forEach(element => {
              //temparr.push({ label: element.attributes.Kommuner, value: element.attributes.Kommuner })
              if(element.attributes.Kommuner.includes(",")){ // Del opp fylkene
                  var templist = element.attributes.Kommuner.split(",");
                  templist.forEach(element2 => {
                    if (!(temparr.some(e => e.value === element2))){ //Vi liker ikke duplikater
                      temparr.push({ label: element2, value: element2 })
                    }
                  });
                }
                else {
                  if (!(temparr.some(e => e.value === element.attributes.Kommuner))){ //Vi liker ikke duplikater
                    temparr.push({ label: element.attributes.Kommuner, value: element.attributes.Kommuner })
                  }
                }
            });
            setKommuneListArr(temparr);
          })
          .catch(ex => {
              console.log(ex);
          });

          if(filtersetting === "Vern") {
            //Naturvernområde (kun Vern naturområder NiN) 
            var querynvo = new Query();
            querynvo.returnGeometry = false;
            querynvo.outFields = "NaturvernOmrådenavn";
            querynvo.where = "1=1";
            querynvo.returnDistinctValues = true;
            var queryTasknvo = new QueryTask({
                url: mainurl
            });
            queryTasknvo.execute(querynvo).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.NaturvernOmrådenavn, value: element.attributes.NaturvernOmrådenavn })
              });
              setNaturvernomradeListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });
          }

          if(filtersetting === "Naturtyper") {
            var queryProsjektomrade = new Query();
            queryProsjektomrade.returnGeometry = false;
            queryProsjektomrade.outFields = "Prosjektområdenavn,prosjektid";
            queryProsjektomrade.where = "1=1";
            queryProsjektomrade.returnDistinctValues = true;
            var queryTaskProsjektomrade = new QueryTask({
                url: naturtyperurlprosjektomrade
            });
            queryTaskProsjektomrade.execute(queryProsjektomrade).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.Prosjektområdenavn, value: element.attributes.prosjektid })
              });
              setProsjektomradeListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });
          }
          //Kartleggingsenhetkode Hovedtype gruppe 
          var querykartleggingsenheterhg = new Query();
          querykartleggingsenheterhg.returnGeometry = false;
          querykartleggingsenheterhg.outFields = "hovedtypegruppe,hovedtypegruppebeskrivelse";
          querykartleggingsenheterhg.where = "1=1";
          querykartleggingsenheterhg.returnDistinctValues = true;
          var queryTaskkartleggingsenheterhg = new QueryTask({
              url: kartleggingsenheterurl
          });
          queryTaskkartleggingsenheterhg.execute(querykartleggingsenheterhg).then(result => {
            var temparr = []
            result.features.forEach(element => {
              temparr.push({ label: element.attributes.hovedtypegruppe + " (" + element.attributes.hovedtypegruppebeskrivelse + ")", value: element.attributes.hovedtypegruppe })
            });
            setKartleggingsenheterhovedtypegruppeListArr(temparr);
          })
          .catch(ex => {
              console.log(ex);
          });

          //Kartleggingsenhetkode (fritekst)
          var querykartleggingsenheter = new Query();
          querykartleggingsenheter.returnGeometry = false;
          querykartleggingsenheter.outFields = "kartleggingsenhetkode,hovedtypegruppebeskrivelse,hovedtypebeskrivelse,kartleggingsenhetbeskrivelse";
          querykartleggingsenheter.where = "1=1";
          querykartleggingsenheter.returnDistinctValues = true;
          var queryTaskkartleggingsenheter = new QueryTask({
              url: kartleggingsenheterurl
          });
          queryTaskkartleggingsenheter.execute(querykartleggingsenheter).then(result => {
            var temparr = []
            result.features.forEach(element => {
              temparr.push({ label: element.attributes.kartleggingsenhetkode + " (" + element.attributes.hovedtypegruppebeskrivelse + ", " + element.attributes.hovedtypebeskrivelse + ", " + element.attributes.kartleggingsenhetbeskrivelse + ")", value: element.attributes.kartleggingsenhetkode })
            });
            setKartleggingsenheterListArr(temparr);
          })
          .catch(ex => {
              console.log(ex);
          });

          //Variabler Gruppe 
          var queryvarg = new Query();
          queryvarg.returnGeometry = false;
          queryvarg.outFields = "gruppe,gruppebeskrivelse";
          queryvarg.where = "1=1";
          queryvarg.returnDistinctValues = true;
          var queryTaskvarg = new QueryTask({
              url: variablerurl
          });
          queryTaskvarg.execute(queryvarg).then(result => {
            var temparr = []
            result.features.forEach(element => {
              temparr.push({ label: element.attributes.gruppe + " (" + element.attributes.gruppebeskrivelse + ")", value: element.attributes.gruppe })
            });
            setVariablergruppeListArr(temparr);
          })
          .catch(ex => {
              console.log(ex);
          });

          //Variabler (fritekst)
          var queryvariabler = new Query();
          queryvariabler.returnGeometry = false;
          queryvariabler.outFields = "variabelkode,gruppebeskrivelse,gruppebeskrivelse,navnbeskrivelse,trinnbeskrivelse";
          queryvariabler.where = "1=1";
          queryvariabler.returnDistinctValues = true;
          var queryTaskvariabler = new QueryTask({
              url: variablerurl
          });
          queryTaskvariabler.execute(queryvariabler).then(result => {
            //console.log(result)
            var temparr = []
            result.features.forEach(element => {
              temparr.push({ label: element.attributes.variabelkode + " (" + element.attributes.gruppebeskrivelse + ", " + element.attributes.gruppebeskrivelse + ", " + element.attributes.navnbeskrivelse  + ", " + element.attributes.trinnbeskrivelse + ")", value: element.attributes.variabelkode })
            });
            setVariablerListArr(temparr); //kartlaget har ca 4500 enheter, så her må det gjøres noe smartere
          })
          .catch(ex => {
              console.log(ex);
          });

          //ULKM (kun vern)
          if (filtersetting === "Vern") {
            //ULKM (Hovedtype)
            var queryulkmhg = new Query();
            queryulkmhg.returnGeometry = false;
            queryulkmhg.outFields = "ninhovedtypegruppe";
            queryulkmhg.where = "1=1";
            queryulkmhg.returnDistinctValues = true;
            var queryTaskulkmhg = new QueryTask({
                url: ulkmurl
            });
            queryTaskulkmhg.execute(queryulkmhg).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.ninhovedtypegruppe, value: element.attributes.ninhovedtypegruppe })
              });
              setUlkmNiNHovedtypegruppeListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });

            //ULKM (fritekst)
            var queryulkm = new Query();
            queryulkm.returnGeometry = false;
            queryulkm.outFields = "ulkmkode,gradientkodebeskrivelse,trinnbeskrivelse";
            queryulkm.where = "1=1";
            queryulkm.returnDistinctValues = true;
            var queryTaskulkm = new QueryTask({
                url: ulkmurl
            });
            queryTaskulkm.execute(queryulkm).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.ulkmkode + " (" + element.attributes.gradientkodebeskrivelse + ", " + element.attributes.trinnbeskrivelse + ")", value: element.attributes.ulkmkode })
              });
              setUlkmListArr(temparr); //Kartlaget har 321 enheter
            })
            .catch(ex => {
                console.log(ex);
            });
          }

          if(filtersetting === "Naturtyper") {
            //Kartleggingsår ("Kartlagtdato" i basen i "vern", "Kartleggingsår" i naturtyper) (Kun Naturtyper)
            var queryaar = new Query();
            queryaar.returnGeometry = false;
            queryaar.outFields = "Kartleggingsår";
            queryaar.where = "1=1";
            queryaar.returnDistinctValues = true;
            var queryTaskaar = new QueryTask({
                url: mainurl
            });
            queryTaskaar.execute(queryaar).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.Kartleggingsår, value: element.attributes.Kartleggingsår })
              });
              setKartleggingsaarListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });
          }

          //Firma ("Oppdragstaker" i både vern og naturtyper)
          var queryfirma = new Query();
          queryfirma.returnGeometry = false;
          queryfirma.outFields = "Oppdragstaker";
          queryfirma.where = "1=1";
          queryfirma.returnDistinctValues = true;
          var queryTaskfirma = new QueryTask({
              url: mainurl
          });
          queryTaskfirma.execute(queryfirma).then(result => {
            var temparr = []
            result.features.forEach(element => {
              temparr.push({ label: element.attributes.Oppdragstaker, value: element.attributes.Oppdragstaker })
            });
            setFirmaListArr(temparr);
          })
          .catch(ex => {
              console.log(ex);
          });

          if(filtersetting === "Naturtyper") {
            //Naturtyper (kun Naturtyper – Miljødirektoratets instruks)
            var querynt = new Query();
            querynt.returnGeometry = false;
            querynt.outFields = "Naturtypekode,Naturtype,Hovedøkosystem";
            querynt.where = "1=1";
            querynt.returnDistinctValues = true;
            var queryTasknt = new QueryTask({
                url: mainurl
            });
            queryTasknt.execute(querynt).then(result => {
              var temparr = []
              result.features.forEach(element => {
                temparr.push({ label: element.attributes.Naturtypekode + " (" + element.attributes.Hovedøkosystem + ", " + element.attributes.Naturtype + ")", value: element.attributes.Naturtypekode })
              });
              setNaturtyperListArr(temparr);
            })
            .catch(ex => {
                console.log(ex);
            });
          }

          if(filtersetting === "Naturtyper") {
            //Lokalitetskvalitet (kun naturtyper)
            setLokalitetskvalitetListArr([
              { label: "0: Svært høy kvalitet", value: 0 }, 
              { label: "1: Høy kvalitet", value: 1 },
              { label: "2: Moderat kvalitet", value: 2 }, 
              { label: "3: Lav kvalitet", value: 3 }, 
              { label: "4: Svært lav kvalitet", value: 4 }, 
              { label: "9: Ikke kvalitetsvurdert", value: 9 }
              ]); //TODO: Muligens hent dynamisk?

            //Tilstand (kun naturtyper)
            setTilstandListArr([
              { label: "0: God", value: 0 }, 
              { label: "1: Moderat", value: 1 },
              { label: "2: Dårlig", value: 2 }, 
              { label: "3: Svært redusert", value: 3 }
              ]); //TODO: Muligens hent dynamisk?

            //Naturmangfold (kun naturtyper)
            setNaturmangfoldListArr([
              { label: "0: Stort", value: 0 }, 
              { label: "1: Moderat", value: 1 },
              { label: "2: Lite", value: 2 }
              ]); //TODO: Muligens hent dynamisk?

            //Hovedøkosystem (kun naturtyper)
            setHovedokosystemListArr([
              { label: "Fjell", value: "Fjell" }, 
              { label: "Ingen", value: "Ingen" },
              { label: "Naturlig åpne områder i lavlandet", value: "Naturlig åpne områder i lavlandet" },
              { label: "Naturlig åpne områder under skoggrensa", value: "Naturlig åpne områder under skoggrensa" },
              { label: "Semi-naturlig mark", value: "Semi-naturlig mark" },
              { label: "Skog", value: "Skog" },
              { label: "Våtmark", value: "Våtmark" }
              ]); //TODO: Muligens hent dynamisk?
          }
        });

        //Boolean
        // setBooleanListArr([{ label: "Ja", value: 1 },{ label: "Nei", value: 0 }])

      }, [filtersetting]);
 
    return (      
      <div id="filterContainer" className="row mb-0 border-bottom pb-2 pt-0 mt-1">
        <div className={filtersetting === "Naturtyper" ? "col-6 px-0 main-background" : "col-6 px-0" }>
          <button className={filtersetting === "Naturtyper" ? "btn inner-background border-radius-t w-100 opacity-1 disabled" : "btn main-background border-radius-br w-100"} onClick={() => setFiltersetting("Naturtyper")}>Naturtyper - Miljødirektoratets instruks</button>
        </div>
        <div className={filtersetting === "Vern" ? "col-6 px-0 main-background" : "col-6 px-0" }>
          <button className={filtersetting === "Vern" ? "btn inner-background border-radius-t w-100 opacity-1 disabled" : "btn main-background border-radius-bl w-100"} onClick={() => setFiltersetting("Vern")}>Vern naturområder NiN</button>
        </div>
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={fylkeListArr} isMulti isDisabled={filtersetting === "Naturtyper" ? true : false} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterFylke, e)} placeholder="Fylke" value={selectedFilterFylke}></Select>
        </div>
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={kommuneListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterKommune, e)} placeholder="Kommune" value={selectedFilterKommune}></Select>
        </div> 
        {filtersetting === "Vern" ?  
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={naturvernomradeListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterNaturvernomrade, e)} placeholder="Naturvernområde (kun Vern naturområder NiN)" value={selectedFilterNaturvernomrade}></Select>
        </div> 
        : ""} 
        {filtersetting === "Naturtyper" ?   
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={prosjektomradeListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterProsjektomrade, e)} placeholder="Prosjektområde/dekningskart (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterProsjektomrade}></Select>
        </div>
        : ""}
        <div className="halffilterrow col-12 row">
          <div className="halffilter halffilterleft col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Kartleggingsenheter - søk i koder</p>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Hovedtype gruppe</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={kartleggingsenheterhovedtypegruppeListArr} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterKartleggingsenheterhovedtypegruppe, e)} placeholder="Hovedtype gruppe" value={selectedFilterKartleggingsenheterhovedtypegruppe}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Hovedtype</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={kartleggingsenheterhovedtypeListArr} isDisabled={kartleggingsenheterhovedtypedisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterKartleggingsenheterhovedtype, e)} placeholder="Hovedtype" value={selectedFilterKartleggingsenheterhovedtype}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Kartleggingsenhet</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={kartleggingsenheterkartleggingsenhetListArr} isDisabled={kartleggingsenheterkartleggingsenhetdisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterKartleggingsenheterkartleggingsenhet, e)} placeholder="Kartleggingsenhet" value={selectedFilterKartleggingsenheterkartleggingsenhet}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Kode</p>
              </div>
              <div className="col-8 text-left">
                <p className="m-0 lh-38px">{selectedFilterKartleggingsenheterkode}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button>
          </div>
          <div className="halffilter halffilterright col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Kartleggingsenheter - fritekstsøk (du kan bruke flere ord)</p>
            <div className="text-left">
              <Select styles={customStyles} options={kartleggingsenheterListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterKartleggingsenheter, e)} placeholder="Kartleggingsenhet" value={selectedFilterKartleggingsenheter}></Select>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button></div>
        </div>
        <div className="halffilterrow col-12 row">
          <div className="halffilter halffilterleft col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Variabler - søk i koder</p>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Gruppe</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={variablergruppeListArr} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterVariablergruppe, e)} placeholder="Gruppe" value={selectedFilterVariablergruppe}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Tema</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={variablertemaListArr} isDisabled={variablertemadisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterVariablertema, e)} placeholder="Tema" value={selectedFilterVariablertema}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Navn</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={variablernavnListArr} isDisabled={variablernavndisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterVariablernavn, e)} placeholder="Navn" value={selectedFilterVariablernavn}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Trinn</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={variablertrinnListArr} isDisabled={variablertrinndisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterVariablertrinn, e)} placeholder="Trinn" value={selectedFilterVariablertrinn}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Kode</p>
              </div>
              <div className="col-8 text-left">
                <p className="m-0 lh-38px">{selectedFilterVariablerkode}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button>
          </div>
          <div className="halffilter halffilterright col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Variabler - fritekstsøk (du kan bruke flere ord)</p>
            <div className="text-left">
              <Select styles={customStyles} options={variablerListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterVariabler, e)} placeholder="Variabel" value={selectedFilterVariabler}></Select>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button></div>
        </div>
        {filtersetting === "Vern" ? 
        <div className="halffilterrow col-12 row">
          <div className="halffilter halffilterleft col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>ULKM variabler - søk i koder (Kun Vern naturområder NIN)</p>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">NiNHovedtypegruppe</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={ulkmNiNHovedtypegruppeListArr} isDisabled={false} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterUlkmNiNHovedtypegruppe, e)} placeholder="NiNHovedtypegruppe" value={selectedFilterUlkmNiNHovedtypegruppe}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">NiNHovedtype</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={ulkmNiNHovedtypeListArr} isDisabled={ulkmNiNHovedtypedisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterUlkmNiNHovedtype, e)} placeholder="NiNHovedtype" value={selectedFilterUlkmNiNHovedtype}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Gradientkode</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={ulkmgradientkodeListArr} isDisabled={ulkmgradientkodedisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterUlkmgradientkode, e)} placeholder="Gradientkode" value={selectedFilterUlkmgradientkode}></Select>  
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Trinn</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={ulkmtrinnListArr} isDisabled={ulkmtrinndisabled} isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterUlkmtrinn, e)} placeholder="Trinn" value={selectedFilterUlkmtrinn}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Kode</p>
              </div>
              <div className="col-8 text-left">
                <p className="m-0 lh-38px">{selectedFilterUlkmkode}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button>
          </div>
          <div className="halffilter halffilterright col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>ULKM variabler - fritekstsøk (du kan bruke flere ord)</p>
            <div className="text-left">
              <Select styles={customStyles} options={ulkmListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterUlkm, e)} placeholder="ULKMVariabel" value={selectedFilterUlkm}></Select>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button></div>
        </div>
        : ""}
        {filtersetting === "Naturtyper" ? 
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={kartleggingsaarListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterKartleggingsaar, e)} placeholder="Kartleggingsår (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterKartleggingsaar}></Select>
        </div>
        : "" }
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={firmaListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterFirma, e)} placeholder="Firma" value={selectedFilterFirma}></Select>
        </div>
        <div className="halffilterrow col-12 row">
          <div className="col-3" />
          <div className="halffilter halffilterleft col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Areal (m<sup>2</sup>)</p>
            <div className="row p-3">
              <input className="col-5" type="number" defaultValue={null} onBlur={(e) => statechangetext(setArealnumber,e)} />
              <div className="col-1">
                <p className="m-0 lh-52px">m<sup>2</sup></p>
              </div>
              {/* <Select styles={customStyles} options={fylkeListArr} isMulti isClearable="true" dafaultValue="0" onChange={filterProjectsByFylke} placeholder="Areal" value={selectedFilterFylke}></Select> */}
              <div className="col-1" />
              <div className="col-5" >
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio1" id="storreenn1" value="option1" defaultChecked="checked" onChange={(e) => statechangemoreorless(e, ">")}/>
                  <label className="form-check-label">
                    Større enn
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio1" id="mindreenn2" value="option2" onChange={(e) => statechangemoreorless(e, "<")}/>
                  <label className="form-check-label">
                    Mindre enn
                  </label>
                </div>
              </div>
            </div>
            {arealmoreorless && arealnumber ? (<div><p><b>Valgt filter: </b> Areal {arealmoreorless} {arealnumber} m<sup>2</sup><button onClick={(e) => statechangeresetareal(e, "reset")} className="btn">x</button></p></div>) : <p><b>Valgt filter: </b></p> }
          </div>
        </div>
        {filtersetting === "Naturtyper" ? 
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={naturtyperListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterNaturtyper, e)} placeholder="Naturtyper (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterNaturtyper}></Select>
{/* 
        <div className="halffilterrow col-12 row">
          <div className="col-3" />
          <div className="halffilter halffilterleft col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Naturtyper (kun Naturtyper – Miljødirektoratets instruks)</p>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Naturtypekode</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={fylkeListArr} isMulti isClearable="true" dafaultValue="0" onChange={filterProjectsByFylke} placeholder="Naturtypekode" value={selectedFilterFylke}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Hovedøkosystem</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={fylkeListArr} isMulti isClearable="true" dafaultValue="0" onChange={filterProjectsByFylke} placeholder="Hovedøkosystem" value={selectedFilterFylke}></Select>  
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Naturtype</p>
              </div>
              <div className="col-8 text-left">
                <Select className="mb-2px" styles={customStyles} options={fylkeListArr} isMulti isClearable="true" dafaultValue="0" onChange={filterProjectsByFylke} placeholder="Naturtype" value={selectedFilterFylke}></Select>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">Kode</p>
              </div>
              <div className="col-8 text-left">
                <p className="m-0 lh-38px">{valgtkode}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm btn-block filterbutton" onClick={addFilter}>Legg til filter</button>
          </div>
        </div> */}
        </div>
        : "" }
        {filtersetting === "Naturtyper" ? 
        <div className="halffilterrow col-12 row">
          <div className="col-3" />
          <div className="halffilter halffilterleft col-6 mt-2 border border-5 border-secondary rounded text-center">
            <p>Naturtype utvalgskriterier (kun Naturtyper – Miljødirektoratets instruks)</p>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">UK_Truet</p>
              </div>
              <div className="col-8 text-center m-auto">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_truet" id="radiouk_truetJa" value="Ja" onChange={(e) => statechangetext(setUK_Truetstate,e)}/>
                  <label className="form-check-label">
                    Ja
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_truet" id="radiouk_truetNei" value="Nei" onChange={(e) => statechangetext(setUK_Truetstate,e)}/>
                  <label className="form-check-label">
                    Nei
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_truet" id="radiouk_truetIngenfilter" value="Ingen filter" defaultChecked="checked" onChange={(e) => statechangetext(setUK_Truetstate,e)}/>
                  <label className="form-check-label">
                    Ingen filter
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">UK_NærTruet</p>
              </div>
              <div className="col-8 text-center m-auto">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_naertruet" id="radiouk_naertruetJa" value="Ja" onChange={(e) => statechangetext(setUK_NærTruetstate,e)}/>
                  <label className="form-check-label">
                    Ja
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_naertruet" id="radiouk_naertruetNei" value="Nei" onChange={(e) => statechangetext(setUK_NærTruetstate,e)}/>
                  <label className="form-check-label">
                    Nei
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_naertruet" id="radiouk_naertruetIngenfilter" value="Ingen filter" defaultChecked="checked" onChange={(e) => statechangetext(setUK_NærTruetstate,e)}/>
                  <label className="form-check-label">
                    Ingen filter
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">UK_SpesieltDårligKartlagt</p>
              </div>
              <div className="col-8 text-center m-auto">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_spesieltdarligkartlagt" id="radiouk_spesieltdarligkartlagtJa" value="Ja" onChange={(e) => statechangetext(setUK_SpesieltDårligKartlagtstate,e)}/>
                  <label className="form-check-label">
                    Ja
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_spesieltdarligkartlagt" id="radiouk_spesieltdarligkartlagtNei" value="Nei" onChange={(e) => statechangetext(setUK_SpesieltDårligKartlagtstate,e)}/>
                  <label className="form-check-label">
                    Nei
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_spesieltdarligkartlagt" id="radiouk_spesieltdarligkartlagtIngenfilter" value="Ingen filter" defaultChecked="checked" onChange={(e) => statechangetext(setUK_SpesieltDårligKartlagtstate,e)}/>
                  <label className="form-check-label">
                    Ingen filter
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">UK_SentralØkosystemFunksjon</p>
              </div>
              <div className="col-8 text-center m-auto">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_sentralokosystemfunksjon" id="radiouk_sentralokosystemfunksjonJa" value="Ja" onChange={(e) => statechangetext(setUK_SentralØkosystemFunksjonstate,e)}/>
                  <label className="form-check-label">
                    Ja
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_sentralokosystemfunksjon" id="radiouk_sentralokosystemfunksjonNei" value="Nei" onChange={(e) => statechangetext(setUK_SentralØkosystemFunksjonstate,e)}/>
                  <label className="form-check-label">
                    Nei
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_sentralokosystemfunksjon" id="radiouk_sentralokosystemfunksjonIngenfilter" value="Ingen filter" defaultChecked="checked" onChange={(e) => statechangetext(setUK_SentralØkosystemFunksjonstate,e)}/>
                  <label className="form-check-label">
                    Ingen filter
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">UK_SeBekrivelseNaturtype</p>
              </div>
              <div className="col-8 text-center m-auto">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_sebekrivelsenaturtype" id="radiouk_sebekrivelsenaturtypeJa" value="Ja" onChange={(e) => statechangetext(setUK_SeBekrivelseNaturtypestate,e)}/>
                  <label className="form-check-label">
                    Ja
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_sebekrivelsenaturtype" id="radiouk_sebekrivelsenaturtypeNei" value="Nei" onChange={(e) => statechangetext(setUK_SeBekrivelseNaturtypestate,e)}/>
                  <label className="form-check-label">
                    Nei
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_sebekrivelsenaturtype" id="radiouk_sebekrivelsenaturtypeIngenfilter" value="Ingen filter" defaultChecked="checked" onChange={(e) => statechangetext(setUK_SeBekrivelseNaturtypestate,e)}/>
                  <label className="form-check-label">
                    Ingen filter
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 text-right">
                <p className="m-0 lh-38px">UK_IngenStatus</p>
              </div>
              <div className="col-8 text-center m-auto">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_ingenstatus" id="radiouk_ingenstatusJa" value="Ja" onChange={(e) => statechangetext(setUK_IngenStatusstate,e)}/>
                  <label className="form-check-label">
                    Ja
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_ingenstatus" id="radiouk_ingenstatusNei" value="Nei" onChange={(e) => statechangetext(setUK_IngenStatusstate,e)}/>
                  <label className="form-check-label">
                    Nei
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="radiouk_ingenstatus" id="radiouk_ingenstatusIngenfilter" value="Ingen filter" defaultChecked="checked" onChange={(e) => statechangetext(setUK_IngenStatusstate,e)}/>
                  <label className="form-check-label">
                    Ingen filter
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        : "" }
        {filtersetting === "Naturtyper" ? 
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={lokalitetskvalitetListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterLokalitetskvalitet, e)} placeholder="Lokalitetskvalitet (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterLokalitetskvalitet}></Select>
        </div>
        : "" }
        {filtersetting === "Naturtyper" ? 
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={tilstandListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterTilstand, e)} placeholder="Tilstand (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterTilstand}></Select>
        </div>
        : "" }
        {filtersetting === "Naturtyper" ? 
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={naturmangfoldListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterNaturmangfold, e)} placeholder="Naturmangfold (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterNaturmangfold}></Select>
        </div>
        : "" }
        {filtersetting === "Naturtyper" ? 
        <div className="col-12 mt-2">
          <Select styles={customStyles} options={hovedokosystemListArr} isMulti isClearable="true" dafaultValue="0" onChange={(e) => statechange(setSelectedFilterHovedokosystem, e)} placeholder="Hovedøkosystem (kun Naturtyper – Miljødirektoratets instruks)" value={selectedFilterHovedokosystem}></Select>
        </div>
        : "" }
        <div className="col-12 mt-2">
          <Search 
            filtersetting={filtersetting}
            selectedFilterFylke={selectedFilterFylke}
            selectedFilterKommune={selectedFilterKommune}
            selectedFilterProsjektomrade={selectedFilterProsjektomrade}  //kun naturtyper
            selectedFilterNaturvernomrade={selectedFilterNaturvernomrade} //kun vern
            selectedFilterKartleggingsenheterkode={selectedFilterKartleggingsenheterkode}
            selectedFilterKartleggingsenheter={selectedFilterKartleggingsenheter} // (fritekst)
            selectedFilterVariablerkode={selectedFilterVariablerkode}
            selectedFilterVariabler={selectedFilterVariabler} // (fritekst)
            selectedFilterUlkmkode={selectedFilterUlkmkode}
            selectedFilterUlkm={selectedFilterUlkm} //kun vern (fritekst)
            selectedFilterKartleggingsaar={selectedFilterKartleggingsaar} 
            selectedFilterFirma={selectedFilterFirma} 
            selectedFilterLokalitetskvalitet={selectedFilterLokalitetskvalitet} 
            selectedFilterTilstand={selectedFilterTilstand} 
            selectedFilterNaturmangfold={selectedFilterNaturmangfold} 
            selectedFilterHovedokosystem={selectedFilterHovedokosystem} 
            arealnumber={arealnumber}
            arealmoreorless={arealmoreorless}
            selectedFilterNaturtyper={selectedFilterNaturtyper}
            UK_Truetstate={UK_Truetstate}
            UK_NærTruetstate={UK_NærTruetstate}
            UK_SpesieltDårligKartlagtstate={UK_SpesieltDårligKartlagtstate}
            UK_SentralØkosystemFunksjonstate={UK_SentralØkosystemFunksjonstate}
            UK_SeBekrivelseNaturtypestate={UK_SeBekrivelseNaturtypestate}
            UK_IngenStatusstate={UK_IngenStatusstate}
          className="text-center"/>
        </div>
      </div>
    );
}

export default Filter;

