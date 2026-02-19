//var geladenerBauspecBand = "";
async function contentBauspecBandAuslesen(uberschriftInBauspec, bgNrNeuUeberschrift){
	let modulInhaltMussNeuGeladenWerden = false;
	let inhaltModul;
	let geladenerBauspecBand;
	/*if(geladenerBauspecBand !=""){
		if(geladenerBauspecBand[0].ref.moduleUri != uberschriftInBauspec.moduleUri){
			modulInhaltMussNeuGeladenWerden = true;
		}	
	}
	else{
		modulInhaltMussNeuGeladenWerden = true;
	}	

	if(modulInhaltMussNeuGeladenWerden){*/
		let promiseInhaltModul = new Promise(function(resolve, reject){                  
			RM.Data.getContentsStructure(new RM.ArtifactRef(uberschriftInBauspec.moduleUri, modulInterneAnforderungen.componentUri, "", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module"), [RM.Data.Attributes.NAME, RM.Data.Attributes.ARTIFACT_TYPE], function(res){
				resolve(res.data);
			});
		});	
		geladenerBauspecBand = await promiseInhaltModul;
	//}

	//Nur StructureNode der gewolltenUeberschriftermitteln:
	let strNodeUeberschrift = geladenerBauspecBand.find(element=>element.ref.uri==uberschriftInBauspec.uri);
	strNodeUeberschrift = strNodeUeberschrift.children.filter(element=>element.values[RM.Data.Attributes.ARTIFACT_TYPE].name == "Überschrift");
	let kinder = [] ;
	neueBg = [bgNrNeuUeberschrift, ""];
	kinder[0] = neueBg;
	for(let i = 1; i<=strNodeUeberschrift.length;i++){

		//let bgNr =  strNodeUeberschrift[i-1].values[RM.Data.Attributes.NAME].match(/\d{4}/g)[0]
		//kinder[i] = [bgNr , strNodeUeberschrift[i-1]];
		
		let bgNr =  strNodeUeberschrift[i-1].values[RM.Data.Attributes.NAME].match(/\d{4}/g)
		if(bgNr==null){
			kinder[i] = ["9999" , strNodeUeberschrift[i-1]];
		}
		else{
			kinder[i] = [bgNr[0] , strNodeUeberschrift[i-1]];
			
		}
		
	}

	kinder.sort((a,b)=>a[0]-b[0]);
	positionBg = kinder.indexOf(neueBg);
	
	let strategy;

	if(kinder.length > 1){
		if(positionBg==0){	
			strategy = new RM.LocationSpecification(kinder[1][1].ref, RM.Data.PlacementStrategy.BEFORE);
		}
		else{
			strategy = new RM.LocationSpecification(kinder[positionBg-1][1].ref, RM.Data.PlacementStrategy.AFTER);
		}
	}
	else{
		strategy = new RM.LocationSpecification(uberschriftInBauspec, RM.Data.PlacementStrategy.BELOW);
	}
	
	
	return strategy;
}