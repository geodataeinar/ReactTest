export function getWhereUrlNaturtyper(props) {
  //console.log(props)
  var whereurl = ""
  //Fylker finnes ikke i Naturtyper
  if (props.selectedFilterKommune && props.selectedFilterKommune.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterKommune.forEach(element => {
      whereurl += "Kommuner LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterProsjektomrade && props.selectedFilterProsjektomrade.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterProsjektomrade.forEach(element => {
      whereurl += "prosjektid='" + element.value + "' OR "       
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Kartleggingsenheter
  if (props.selectedFilterKartleggingsenheterkode && props.selectedFilterKartleggingsenheterkode !== "NA_") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "NiNKartleggingsenheter LIKE '%" + props.selectedFilterKartleggingsenheterkode + "%' OR "
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Kartleggingsenheter (fritekst)
  if (props.selectedFilterKartleggingsenheter && props.selectedFilterKartleggingsenheter.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterKartleggingsenheter.forEach(element => {
      whereurl += "NiNKartleggingsenheter LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Variabler
  if (props.selectedFilterVariablerkode && props.selectedFilterVariablerkode !== "") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "NINBeskrivelsesvariabler LIKE '%" + props.selectedFilterVariablerkode + "%' OR "
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Variabler (fritekst)
  if (props.selectedFilterVariabler && props.selectedFilterVariabler.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterVariabler.forEach(element => {
      whereurl += "NINBeskrivelsesvariabler LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterKartleggingsaar && props.selectedFilterKartleggingsaar.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterKartleggingsaar.forEach(element => {
      whereurl += "Kartleggings??r=" + element.value + " OR "       
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterFirma && props.selectedFilterFirma.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterFirma.forEach(element => {
      whereurl += "Oppdragstaker='" + element.value + "' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.arealnumber && props.arealmoreorless) {//Blir eventuelt "Areal>0"
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "SHAPE.STArea()" + props.arealmoreorless + props.arealnumber
    whereurl += ")"
  }
  if (props.selectedFilterNaturtyper && props.selectedFilterNaturtyper.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterNaturtyper.forEach(element => {
      whereurl += "Naturtypekode='" + element.value + "' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterLokalitetskvalitet && props.selectedFilterLokalitetskvalitet.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterLokalitetskvalitet.forEach(element => {
      whereurl += "Lokalitetskvalitet=" + element.value + " OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterTilstand && props.selectedFilterTilstand.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterTilstand.forEach(element => {
      whereurl += "Tilstand=" + element.value + " OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterNaturmangfold && props.selectedFilterNaturmangfold.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterNaturmangfold.forEach(element => {
      whereurl += "Naturmangfold=" + element.value + " OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterHovedokosystem && props.selectedFilterHovedokosystem.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterHovedokosystem.forEach(element => {
      whereurl += "Hoved??kosystem='" + element.value + "' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.UK_Truetstate && props.UK_Truetstate !== "Ingen filter") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    if (props.UK_Truetstate === "Ja") {
      whereurl += "UK_Truet = 1"
    }
    else if (props.UK_Truetstate === "Nei") {
      whereurl += "UK_Truet is null"
    }
    whereurl += ")"
  }
  if (props.UK_N??rTruetstate && props.UK_N??rTruetstate !== "Ingen filter") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    if (props.UK_N??rTruetstate === "Ja") {
      whereurl += "UK_N??rTruet = 1"
    }
    else if (props.UK_N??rTruetstate === "Nei") {
      whereurl += "UK_N??rTruet is null"
    }
    whereurl += ")"
  }
  if (props.UK_SpesieltD??rligKartlagtstate && props.UK_SpesieltD??rligKartlagtstate !== "Ingen filter") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    if (props.UK_SpesieltD??rligKartlagtstate === "Ja") {
      whereurl += "UK_SpesieltD??rligKartlagt = 1"
    }
    else if (props.UK_SpesieltD??rligKartlagtstate === "Nei") {
      whereurl += "UK_SpesieltD??rligKartlagt is null"
    }
    whereurl += ")"
  }
  if (props.UK_Sentral??kosystemFunksjonstate && props.UK_Sentral??kosystemFunksjonstate !== "Ingen filter") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    if (props.UK_Sentral??kosystemFunksjonstate === "Ja") {
      whereurl += "UK_Sentral??kosystemFunksjon = 1"
    }
    else if (props.UK_Sentral??kosystemFunksjonstate === "Nei") {
      whereurl += "UK_Sentral??kosystemFunksjon is null"
    }
    whereurl += ")"
  }
  if (props.UK_SeBekrivelseNaturtypestate && props.UK_SeBekrivelseNaturtypestate !== "Ingen filter") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    if (props.UK_SeBekrivelseNaturtypestate === "Ja") {
      whereurl += "UK_SeBekrivelseNaturtype = 1"
    }
    else if (props.UK_SeBekrivelseNaturtypestate === "Nei") {
      whereurl += "UK_SeBekrivelseNaturtype is null"
    }
    whereurl += ")"
  }
  if (props.UK_IngenStatusstate && props.UK_IngenStatusstate !== "Ingen filter") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    if (props.UK_IngenStatusstate === "Ja") {
      whereurl += "UK_IngenStatus = 1"
    }
    else if (props.UK_IngenStatusstate === "Nei") {
      whereurl += "UK_IngenStatus is null"
    }
    whereurl += ")"
  }
  return whereurl
}


export function getWhereUrlVern(props) {
  //console.log(props)
  var whereurl = ""
  if (props.selectedFilterFylke && props.selectedFilterFylke.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterFylke.forEach(element => {
      whereurl += "Fylker LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterKommune && props.selectedFilterKommune.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterKommune.forEach(element => {
      whereurl += "Kommuner LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.selectedFilterNaturvernomrade && props.selectedFilterNaturvernomrade.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterNaturvernomrade.forEach(element => {
      whereurl += "NaturvernOmr??denavn='" + element.value + "' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Kartleggingsenheter
  if (props.selectedFilterKartleggingsenheterkode && props.selectedFilterKartleggingsenheterkode !== "NA_") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "Kartleggingsenhetkode LIKE '%" + props.selectedFilterKartleggingsenheterkode + "%' OR "
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Kartleggingsenheter (fritekst)
  if (props.selectedFilterKartleggingsenheter && props.selectedFilterKartleggingsenheter.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterKartleggingsenheter.forEach(element => {
      whereurl += "Kartleggingsenhetkode LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Variabler
  if (props.selectedFilterVariablerkode && props.selectedFilterVariablerkode !== "") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "Beskrivelsesvariabler LIKE '%" + props.selectedFilterVariablerkode + "%' OR "
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Variabler (fritekst)
  if (props.selectedFilterVariabler && props.selectedFilterVariabler.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterVariabler.forEach(element => {
      whereurl += "Beskrivelsesvariabler LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Ulkm
  if (props.selectedFilterUlkmkode && props.selectedFilterUlkmkode !== "") {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "ULKM LIKE '%" + props.selectedFilterUlkmkode + "%' OR "
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Ulkm (fritekst)
  if (props.selectedFilterUlkm && props.selectedFilterUlkm.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterUlkm.forEach(element => {
      whereurl += "ULKM LIKE '%" + element.value + "%' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  //Firma
  if (props.selectedFilterFirma && props.selectedFilterFirma.length !== 0) {
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    props.selectedFilterFirma.forEach(element => {
      whereurl += "Oppdragstaker='" + element.value + "' OR "
    }); 
    whereurl = whereurl.slice(0, -4) //Remove last OR
    whereurl += ")"
  }
  if (props.arealnumber && props.arealmoreorless) {//Blir eventuelt "Areal>0"
    if(whereurl !== "") {
      whereurl += " AND "
    }
    whereurl += "("
    whereurl += "SHAPE.STArea()" + props.arealmoreorless + props.arealnumber
    whereurl += ")"
  }
  return whereurl
}