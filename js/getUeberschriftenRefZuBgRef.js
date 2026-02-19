async function getUeberschriftenRefZuBgRef(structureNodeBg){
	
	//Verlinkte Überschrift in Bauspec ermitteln (leerer Sting wenn es die Überschrift noch nicht gibt):
	let refUeberschrift = await getBauSpecKapitelZuBg(structureNodeBg.ref);
	
	//Fallunterscheidung: Gibt es Bauspec-Überschrift?:
	if(refUeberschrift == ""){
		
		//ElternBaugruppe ermitteln und damit diese Funktion rekursiv aufrufen:
		let elternUeberschrift = await getUeberschriftenRefZuBgRef(structureNodeBg.parent);

		//Fehlende Überschrift erzeugen
		let attrs = new RM.AttributeValues();
		attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "Überschrift";
		attrs[RM.Data.Attributes.PRIMARY_TEXT] = structureNodeBg.values[RM.Data.Attributes.NAME] + " (" +  structureNodeBg.values["Baugruppennummer"] + ")";
		attrs[RM.Data.Attributes.IS_HEADING] = true;

		//let contentBauSpecBand = await contentBauspecBandAuslesen(elternUeberschrift, structureNodeBg.values["Baugruppennummer"]);

		let strategy = await contentBauspecBandAuslesen(elternUeberschrift, structureNodeBg.values["Baugruppennummer"]);
 		let promise = new Promise(function(resolve, reject){

			//Überschrift in Bauspec erstellen:
     			RM.Data.Module.createArtifact(attrs,  strategy, function(newArt){
			
				//Überschrift mit Baugruppe in MarinebaugruppenVerzeichnis verlinken:
				RM.Data.createLink(newArt.data, "Baugruppe", structureNodeBg.ref, function(res){
					resolve(newArt.data);			
				});
			});									
  		});
			
		//Ref auf neu angelegte Überschrift in Bauspec zurückgeben:
		return await promise;
	}
	else{
		return refUeberschrift;
	}
}