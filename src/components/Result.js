

import React, { useState, useEffect } from 'react';

import '../css/result.css';

import DataTable from 'react-data-table-component'; // https://www.npmjs.com/package/react-data-table-component

export default function Result(props) {


  //const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }, { id: 2, title: 'Conan the Barbarian2', year: '19821' }];
    const [data, setData] = useState([])
    const [tittel, setTittel] = useState("")
    const [totalRows, setTotalRows] = useState(0)
    const [columns, setColumns] = useState([])
    const [errormessage, setErrormessage] = useState(null)
    //console.log(JSON.parse(props.resultjson))
    useEffect(
      () => {
        setErrormessage(null)
        try{
          var newresultjson = JSON.parse(props.resultjson)
        }
        catch (e) {
          console.log(e)
        }

        if(newresultjson && newresultjson.features) {
          var temparr = []
          //console.log(newresultjson.features)
          newresultjson.features.forEach(element => {
            temparr.push(element.attributes)
          });
          setData(temparr)
          setTittel("Søkeresultat (" + temparr.length + " elementer)")
          setTotalRows(temparr.length)
          if (props.filtersetting === "Naturtyper") {
            setColumns([
            {
              name: 'Områdenavn',
              selector: 'Områdenavn',
              sortable: true,
            },
            {
              name: 'Faktaark',
              sortable: true,
              cell: row => <a href={row.Faktaark}>{row.Faktaark}</a>,
            },
          ]);
          }
          else if (props.filtersetting === "Vern"){
            setColumns([
            {
              name: 'Område5kid',
              selector: 'Område5kid',
              sortable: true,
            },
            {
              name: 'Faktaark',
              sortable: true,
              cell: row => <a href={row.Faktaark}>{row.Faktaark}</a>,
            },
          ]);
          }
      }
      else if (newresultjson && newresultjson.error){
        console.log(newresultjson)
        setErrormessage(JSON.stringify(newresultjson.error))
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resultjson])

    useEffect( //Clear result when switching tabs
      () => {
        setTittel("")
        setTotalRows(0)
        setColumns([])
        setErrormessage(null)
        setData([])
    }, [props.filtersetting])
 
    return (      
      <div>                
        <p>{errormessage}</p>
        <DataTable
          title={tittel}
          columns={columns}
          data={data}
          pagination
          paginationTotalRows={totalRows}
        />
        <p><b>SQL for søket: </b>{props.sql}</p>
        {/* <p><b>URL for søket: </b>{props.sql}</p> TODO: */}
      </div>          
    );
}

