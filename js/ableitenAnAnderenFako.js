function ableitenAnAnderenFako(){

	//Neue Anforderung im Modul Interne Anforderungen erstellen:

	let attrs = new RM.AttributeValues();
	attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "Interne Anforderung";

	let strategyAnf = new RM.LocationSpecification(ersteAnfInterneAnforderungen, RM.Data.PlacementStrategy.BEFORE);
	RM.Data.Module.createArtifact(attrs, strategyAnf, function(result) {

			//LSetzt um Link zwischen beiden ANforderungen setzen:
			currentSelection.forEach(function(art, index){
				RM.Data.createLink(art, 'umgesetzt von', result.data, function(link){
				});
			})

			//Zu erzeugter Anforderung springen:
			var fenster = window.open("https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+modulInterneAnforderungen.uri +"&artifactInModule="+result.data.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext   , '_blank');
	
		});




}