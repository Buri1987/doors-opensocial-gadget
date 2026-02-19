function intAnfAbleiten(){
	//Fehler "Mehr als eine Anforderung markiert" abfangen und Nutzer hinweisen:
	if(currentSelection.length == 1){

		//Letztes Artefakt in diesem Modul laden und mit  Miteinfügestrategie versehen:
		RM.Data.getAttributes(currentSelection[0], [RM.Data.Attributes.ARTIFACT_TYPE, RM.Data.Attributes.PRIMARY_TEXT], function(opResAttr){
		let artType = opResAttr.data[0].values[RM.Data.Attributes.ARTIFACT_TYPE].name;
		let artPrimText = opResAttr.data[0].values[RM.Data.Attributes.PRIMARY_TEXT];
			
			//Fehler "Falsche Ausgangsbasis für Ableitung einer Internen Anforderung" abfangen und Nutzer hinweisen:
			if(artType =="Interne Anforderung" || artType =="Anforderungen Studie" || artType =="Kundenanforderung")
			{

				//Erste Anforderung des Moduls Interne Anforderung ermitteln und diese als Ort angeben an der die neue Anfordetrung eingefügt werden soll:
				RM.Data.getContentsStructure(modulInterneAnforderungen, function(modulstruktur){
					var strategy = new RM.LocationSpecification(modulstruktur.data[0].ref, RM.Data.PlacementStrategy.AFTER);

					//Attribute der neuen Anforderung setzen:
					var attrs = new RM.AttributeValues();
					attrs[RM.Data.Attributes.ARTIFACT_TYPE] = 'Interne Anforderung';
					attrs[RM.Data.Attributes.PRIMARY_TEXT] = artPrimText;
					//Atrefakt erstellen:
					RM.Data.Module.createArtifact(attrs, strategy, function(result) {
						if (result.code === RM.OperationResult.OPERATION_OK) {
	
							//Anforderung mit Vorschriftenzuordnung verlinken:
							RM.Data.createLink(result.data, 'setzt um', currentSelection[0], function(link){

								//Erzeuge InterneAnforderun in neuen Fenster öffnen:
								alert('Es wird nun ein neues Fenster geöffnet, welches die neu erstelle Interne Anforderung zueigt. Stellen Sie sicher, dass Sie im Modul "Interne Anforderungen" keine Filter aktiviert haben. Anderenfalls filter entfernen und Fenster oben im Browser aktualisieren!');
								
								var fenster = window.open("https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+modulInterneAnforderungen.uri+"&artifactInModule="+result.data.uri+"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext   , '_blank');
								
							});				
						} else {
							showWarning('Creation unsuccessful.');
						}
					});	
				});
			}
			else{
				alert('Es können nur auf Grundlage von "Interne Anforderungen", "Anforderungen aus Studien" und "Kundenanforderung aus dem PFK" interne Anforderungen abgeleitet werden. Bitte wählen sie einen entsprechenden Anforderungstyp!!!');
			}
		});
	}
	else{
		alert("Bitte nur ein Artefakt selektieren, um eine Interne Anforderung auf dessen Basis abzuleiten!!!");
		
	}
}