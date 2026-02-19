async function anfInBauspecAbleiten(){
	//1. Stelle in Bauspec finden bzw. anlegen:
	//1.1 Modulinhalt des MBgrVerzeichnis laden:
	await mBgVLaden();

	//1.2 Prüfen, ob nur eine Anf selektiert wurde:
	console.log(typeof currentSelection);
	if(typeof currentSelection != "undefined"){
		document.getElementById("btnAnfInBauspecAbleiten").disabled = true;
		if(currentSelection.length == 1){
			//1.3 Referenz der Bg ermitteln:
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
			let promiseAttrCurSel = new Promise(function(resolve, reject){
				RM.Data.getAttributes(currentSelection[0], RM.Data.Attributes.PRIMARY_TEXT, function(opResArtifactAttributes){
					resolve(opResArtifactAttributes.data[0].values[RM.Data.Attributes.PRIMARY_TEXT]);	
				});
			});
			let curSelPrimText = await promiseAttrCurSel;

			//2.2 SpecText erzeugen:
			let attrs = new RM.AttributeValues();
			attrs[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";
			attrs[RM.Data.Attributes.PRIMARY_TEXT] = curSelPrimText ;
			//Alte Strategy
			//let strategy = new RM.LocationSpecification(refUeberschrift, RM.Data.PlacementStrategy.BELOW);	
			let strategy;

			//Positionierung in der BauSpec direkt unter der jeweiligen Überschrift, bzw. unter der Vorschriftentabelle
			var aktuellerBand = new RM.ArtifactRef(refUeberschrift.moduleUri, urlComponent, "", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module")
			let promiseGetStruct = new Promise(function(resolve, rej){
    			RM.Data.getContentsStructure(aktuellerBand, RM.Data.Attributes.PRIMARY_TEXT , function(res){
        	    	resolve (res); 
        		});
    		});
    		let modulGrpStrkture = await promiseGetStruct;
			let promiseGetChildAttributes = new Promise(function(resolve, reject){
				if(typeof modulGrpStrkture.data.find(element=>element.ref.uri==refUeberschrift.uri).children[0] != "undefined"){
					RM.Data.getAttributes(modulGrpStrkture.data.find(element=>element.ref.uri==refUeberschrift.uri).children[0].ref, RM.Data.Attributes.PRIMARY_TEXT, function(res){
						//resolve(res.data[0].values[RM.Data.Attributes.PRIMARY_TEXT]);	
						//console.log(res);
						//resolve(res);
						if(res.data[0].values[RM.Data.Attributes.PRIMARY_TEXT].search('table') > -1){
							strategy = new RM.LocationSpecification(res.data[0].ref, RM.Data.PlacementStrategy.AFTER);
							resolve(res);
						}
						else{
							//strategy = new RM.LocationSpecification(refUeberschrift, RM.Data.PlacementStrategy.BELOW);
							strategy = new RM.LocationSpecification(res.data[0].ref, RM.Data.PlacementStrategy.BEFORE);	
							resolve(res);
						}
					});
				}else{
					strategy = new RM.LocationSpecification(modulGrpStrkture.data.find(element=>element.ref.uri==refUeberschrift.uri).ref, RM.Data.PlacementStrategy.BELOW);
					resolve();
				}
			});

			let childAttributes = await promiseGetChildAttributes;
     			RM.Data.Module.createArtifact(attrs,  strategy, function(newArt){

				//2.3 Die Anforderungen ermitteln, die von der Selektierten Anforderungen umgesetzt werden:

				RM.Data.createLink(newArt.data, "setzt um", currentSelection[0], function(res){});	
				
			



				//3. Zum erzeugten BauspecText springen:
				var fenster = window.open("https://jazz.dnet.lan/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI="+newArt.data.moduleUri +"&artifactInModule="+newArt.data.uri +"&componentURI="+modulInterneAnforderungen.componentUri+"&vvc.configuration="+uriKonfiKontext, '_blank');				

				//4. Afos ermitteln:
				afoErmitteln(newArt.data, newArt.data, 1);
			});									
		}else{
			//Fehlermeldung, falls Schritt 1.2 negativ war:
			alert("Bitte nur ein Artefakt selektieren, das in die Bauspec verschoben werden soll!!!");	
		}
	}else{
		alert("Es ist keine Anforderung makiert! Bitte genau eine Anforderung selektieren und nochmals versuchen!");
	}
	document.getElementById("btnAnfInBauspecAbleiten").disabled = false;
}