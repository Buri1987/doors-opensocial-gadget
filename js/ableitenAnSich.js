function ableitenAnSich(){
	//prüfen ob nur eine Anf selektiert ist, anderenfalls den Bnutzer hinweisen:
	if(currentSelection.length == 1){

		//neue Anforderung unter current Selektion erzeugen:
		let attrs = new RM.AttributeValues();
		attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";

		let strategyAnf = new RM.LocationSpecification(currentSelection[0], RM.Data.PlacementStrategy.AFTER);
		RM.Data.Module.createArtifact(attrs, strategyAnf, function(result) {

			//Link zwischen elternelement und Kind setzen:
			RM.Data.createLink(currentSelection[0], 'umgesetzt von', result.data, function(link){
			});

			//Auch die Afo-Links übernehmen:
			RM.Data.getLinkedArtifacts(currentSelection[0], "Afo", function(res){
				res.data.artifactLinks[0].targets.forEach(function(target, index){
					RM.Data.createLink(result.data, 'Afo', target, function(link){
					});
				})
			});

			//Erzeugte Anforderung markieren:
			top.location = "https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+currentSelection[0].moduleUri +"&artifactInModule="+result.data.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext;

		});
	}
	else{
		alert("Sie haben mehr als eine oder keine Anforderung merkiert. Bitte markieren sie nur eine Anforderung und versuchen Sie es erneut!");
	}
	
}