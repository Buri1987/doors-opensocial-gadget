async function anfInBauspecVerschieben(){
	//1. Stelle in Bauspec finden bzw. anlegen:
	//1.1 Modulinhalt des MBgrVerzeichnis laden:
	await mBgVLaden();

	//1.2 Prüfen, ob nur eine Anf selektiert wurde:
	console.log(typeof currentSelection);
	if(typeof currentSelection != "undefined"){
		if(currentSelection.length == 1){
			//1.3 Refferenz der Bg ermitteln:
			let promiseLinkedArt = new Promise(function(resolve, reject){                  
				RM.Data.getLinkedArtifacts(currentSelection[0],"Zugeordnete Baugruppen", function(res){  
					resolve(res.data.artifactLinks[0].targets);
				});
			});
			let refBg = await promiseLinkedArt;

			//1.4 Nutzer darüber informieren, dass nur ein Bauspec-Text angelegt wird, aber mehrere BG verlinkt sind:
			if(refBg.length>1){
				alert("Bitte beachten: Die selektierte Anforderung ist mit mehreren Baugruppen verlinkt. Verschoben wird die Anforderung aber nur in ein Bauspec-Kapitel!");
			}

			//1.5 Aus Ref Structer Node des BgV ermitteln:
			let strucNodeBg = inhaltMBgV.find(item=>item.ref.uri == refBg[0].uri);

			//1.6 Überschrift zu Bg-Structer-Node finden:
			let refUeberschrift = await getUeberschriftenRefZuBgRef(strucNodeBg);

			//2. Text in Spec erzeugen:
			//2.1 Primärtext der selektierten Anforderung ermitteln:
			//------------------------------------------------------------------type auslesen
			let promiseAttrCurSel = new Promise(function(resolve, reject){
				RM.Data.getAttributes(currentSelection[0], [RM.Data.Attributes.PRIMARY_TEXT, RM.Data.Attributes.ARTIFACT_TYPE], function(opResArtifactAttributes){
					resolve(opResArtifactAttributes.data[0]);	
				});
			});
			let curSelPrimText = await promiseAttrCurSel;

			//------------------------------------------------------------------ist Kundenanforderung
			let isKundenanforderung = false;
			if(curSelPrimText.values[RM.Data.Attributes.ARTIFACT_TYPE].name == "Kundenanforderung" || curSelPrimText.values[RM.Data.Attributes.ARTIFACT_TYPE].name == "Anforderung"){
				isKundenanforderung = true;
			}

			//2.2 SpecText erzeugen:
			let attrs = new RM.AttributeValues();
			attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";
			//------------------------------------------------------------------primtext auswählen
			attrs[RM.Data.Attributes.PRIMARY_TEXT] = curSelPrimText.values[RM.Data.Attributes.PRIMARY_TEXT] ;
			let strategy = new RM.LocationSpecification(refUeberschrift , RM.Data.PlacementStrategy.BELOW);	
     			RM.Data.Module.createArtifact(attrs,  strategy, function(newArt){

				//2.3 Die Anforderungen ermitteln, die von der Selektierten Anforderungen umgesetzt werden:
				//------------------------------------------------------------------Link zu current Selection setzen
				if(isKundenanforderung){
					RM.Data.createLink(newArt.data, "setzt um", currentSelection[0], function(res){
					
						//4. Zum erzeugten BauspecText springen:
						var fenster = window.open("https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+newArt.data.moduleUri +"&artifactInModule="+newArt.data.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext, '_blank');				

						//5. Afos ermitteln:
						afoErmitteln(newArt.data, newArt.data, 1);
					});
					

				}
				else{
					RM.Data.getLinkedArtifacts(currentSelection[0],"setzt um", function(resLinkedArt){  
						resLinkedArt.data.artifactLinks[0].targets.forEach(function(target, index){
							RM.Data.createLink(newArt.data, "setzt um", target, function(res){
								//4. Zum erzeugten BauspecText springen:
								var fenster = window.open("https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+newArt.data.moduleUri +"&artifactInModule="+newArt.data.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext, '_blank');				
				

								//5. Afos ermitteln:
								afoErmitteln(newArt.data, newArt.data, 1);

								//3. Selektierte Anforderung löschen:
								RM.Data.Module.removeArtifact(currentSelection[0], true, function(res){});
							});	
						});	


					});
				}



							});									
		}	
		else{
			//Fehlermeldung, falls Schritt 1.2 negativ war:
			alert("Bitte nur ein Artefakt selektieren, das in die Bauspec verschoben werden soll!!!");	
		}
	}
	else{
		alert("Es ist keine Anforderung makiert! Bitte genau eine Anforderung selektieren und nochmals versuchen!");
	}





}