let inhaltMBgV;
async function testUeberschrift(){

	//Eingegebene BgNr ermitteln:	
	let gesBgNr = document.getElementById("inputBgZuUeberschriftSpringen").value.toUpperCase();

	//Der Baugruppennummer entsprechende Überschrift in der Bauspec finden/erstellen:
	let refUeberschrift = await ueberschriftZuBgFindenBzwAnlegen(gesBgNr);

		

	//prüfen, ob die Überschrift gerade erzeugt wurde:
	let now = new Date().getTime()-60000;
	let promiseGetAttributes = new Promise(function(resolve, reject){
		RM.Data.getAttributes(refUeberschrift , RM.Data.Attributes.CREATED_ON, function(opResAttrUeberschrift){
			resolve(opResAttrUeberschrift.data[0].values[RM.Data.Attributes.CREATED_ON].getTime());
		});
	});

	createdOnUeberschrift = await promiseGetAttributes;
		
	let diff = createdOnUeberschrift -now;
	if(now<createdOnUeberschrift){
		let attrs = new RM.AttributeValues();
		attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";
		let strategy = new RM.LocationSpecification(refUeberschrift, RM.Data.PlacementStrategy.BELOW);	

			//Leere Anf unter Überschrift in Bauspec erstellen:
     			RM.Data.Module.createArtifact(attrs,  strategy, function(newArt){
			});									
	}

	//Zur gewünschten Überschrift springen (Falls in aktuelle geöffneten Modul enthalten, dann in aktuellem Fenster und ansonsten in neuem Fester): 
	RM.Client.getCurrentArtifact(function(res){
		if (res.code === RM.OperationResult.OPERATION_OK) {
			if(refUeberschrift.moduleUri==res.data.ref.uri){
				top.location = "https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+refUeberschrift.moduleUri +"&artifactInModule="+refUeberschrift.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext;
			}
			else{
				var fenster = window.open("https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+refUeberschrift.moduleUri +"&artifactInModule="+refUeberschrift.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext   , '_blank');
			}
		}
		else{
			top.location = "https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+refUeberschrift.moduleUri +"&artifactInModule="+refUeberschrift.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext;
		}
	});	
}