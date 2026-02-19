async function ueberschriftZuBgFindenBzwAnlegen(bgNr){
	//Modulinhalt des MBgrVerzeichnis laden:
	await mBgVLaden();

	let alleBgMitDieserBgNr =inhaltMBgV.filter(item=>item.values["Baugruppennummer"] == bgNr);
	let refBg = alleBgMitDieserBgNr[0];
   	
	if(typeof refBg != "undefined"){
		let refUeberschrift = await getUeberschriftenRefZuBgRef(refBg);
		return refUeberschrift;
	}
	else{
		alert("Die eingegebene Bauruppe existiert nicht. Suchen Sie ein Baugruppe heraus, die es im Baugruppenverzeichnis gibt (finden Sie über das Dashboard)!");
	}
}