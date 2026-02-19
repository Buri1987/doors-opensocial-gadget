async function idToRef(artID, modulID){

	//OSLC-Abfrage für die ModulID:
	promiseAntwortOslcModulID = fetch("https://jazz.dnet.lan/rm/views?oslc.query=true&projectURL=https%3A%2F%2Fjazz.net.luerssen.de%2Frm%2Fprocess%2Fproject-areas%2F_XAqTsNhuEemllfJXG060HA&oslc.prefix=dcterms=<http://purl.org/dc/terms/>&oslc.prefix=nav=http://jazz.net/ns/rm/navigation%23&oslc.select=dcterms:identifier,dcterms:title,nav:parent&oslc.where=dcterms:identifier="+document.getElementById("inputModulIdAltprojekt").value+"&oslc_config.context=https%3A%2F%2Fjazz.net.luerssen.de%2Frm%2Fcm%2Fstream%2F_X4ZM8NhuEemllfJXG060HA", 
		{
  			method: 'get',
  			headers: {
    				'OSLC-Core-Version': '2.0',
    				'Accept': 'application/rdf+xml'
  			}
   		 }

	)

	//OSLC-Abfrage für die ArtIDs:
	promiseAntwortOslcArtID = fetch("https://jazz.dnet.lan/rm/views?oslc.query=true&projectURL=https%3A%2F%2Fjazz.net.luerssen.de%2Frm%2Fprocess%2Fproject-areas%2F_XAqTsNhuEemllfJXG060HA&oslc.prefix=dcterms=<http://purl.org/dc/terms/>&oslc.prefix=nav=http://jazz.net/ns/rm/navigation%23&oslc.select=dcterms:identifier,dcterms:title,nav:parent&oslc.where=dcterms:identifier="+document.getElementById("inputAnfIdAltprojekt").value+"&oslc_config.context=https%3A%2F%2Fjazz.net.luerssen.de%2Frm%2Fcm%2Fstream%2F_X4ZM8NhuEemllfJXG060HA", 
		{

  			method: 'get',
  			headers: {
    				'OSLC-Core-Version': '2.0',
    				'Accept': 'application/rdf+xml'
  			}
  		 }
	)





	/*//Auf die Antworten warten:
	Promise.all([await promiseAntwortOslcModulID,promiseAntwortOslcArtID]).then((values)=>{
		Promise.all([values[0].text(), values[1].text()]).then((textValues)=>{
			AntwortOslcModulID = textValues[0];
			AntwortOslcArtID = textValues[1];

		});
	});*/
	AntwortOslcModulID = await promiseAntwortOslcModulID;
	AntwortOslcArtID = await promiseAntwortOslcArtID;

	AntwortOslcModulIdText = await AntwortOslcModulID.text();
	AntwortOslcArtIdText = await AntwortOslcArtID.text();
	

	//URIs extrahieren:
	artUri1 = AntwortOslcArtIdText.split('<oslc_rm:Requirement rdf:about="')[1].split('">')[0]
	artUri2 = AntwortOslcArtIdText.split('<oslc_rm:Requirement rdf:about="')[2].split('">')[0]
	artModul =  AntwortOslcModulIdText.split('oslc_rm:RequirementCollection rdf:about="')[1].split('">')[0]

	//ArtRef erzeugen und zurückgeben:
	artRef = new RM.ArtifactRef(artUri1, "https://jazz.dnet.lan/rm/rm-projects/_XAqTsNhuEemllfJXG060HA/components/_X2TiQNhuEemllfJXG060HA", artModul , "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");

	return artRef;
	

}