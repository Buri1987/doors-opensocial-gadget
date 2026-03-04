async function getUeberschriftenRefZuBgRef(structureNodeBg){
	console.log("Aufruf: getUeberschriftenRefZuBgRef    für: " + structureNodeBg.values[RM.Data.Attributes.NAME]);
	
	//Verlinkte Überschrift in Bauspec ermitteln (leerer Sting wenn es die Überschrift noch nicht gibt):
	let refUeberschrift = await getBauSpecKapitelZuBg(structureNodeBg.ref);
	
	//Fallunterscheidung: Gibt es Bauspec-Überschrift?:
	if(refUeberschrift == ""){
		
		//ElternBaugruppe ermitteln und damit diese Funktion rekursiv aufrufen:
		let elternUeberschrift = await getUeberschriftenRefZuBgRef(structureNodeBg.parent);

		//Fehlende Überschrift erzeugen
		console.log("Aufruf: Überschrift erzeugen für: " + structureNodeBg.values[RM.Data.Attributes.NAME]);
		let attrs = new RM.AttributeValues();
		attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "A_Überschrift";

		//Falls Baugruppennummer angegeben ist, diese in den Namen der Überschrift in klammern einbauen:
		if(structureNodeBg.values["System-/Baugruppennummer"] != null){
			attrs[RM.Data.Attributes.PRIMARY_TEXT] = structureNodeBg.values[RM.Data.Attributes.NAME] + " (" +  structureNodeBg.values["System-/Baugruppennummer"] + ")";
		}else{
			attrs[RM.Data.Attributes.PRIMARY_TEXT] = structureNodeBg.values[RM.Data.Attributes.NAME];
		}
		attrs[RM.Data.Attributes.IS_HEADING] = true;

		//let contentBauSpecBand = await contentBauspecBandAuslesen(elternUeberschrift, structureNodeBg.values["Baugruppennummer"]);

		let strategy = await contentBauspecBandAuslesen(elternUeberschrift, structureNodeBg.values["System-/Baugruppennummer"]);
 		let promise = new Promise(function(resolve, reject){

			//Überschrift in Bauspec erstellen:
     			RM.Data.Module.createArtifact(attrs,  strategy, function(newArt){
			
				//Überschrift mit Baugruppe in MarinebaugruppenVerzeichnis verlinken:
				RM.Data.createLink(newArt.data, "System-/Baugruppennummer", structureNodeBg.ref, function(res){
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