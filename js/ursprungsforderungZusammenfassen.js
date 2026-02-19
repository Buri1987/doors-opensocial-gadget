async function ursprungsforderungZusammenfassen(){
	//Die Zielartefakte der "Setzt um" und "Afo"-Links speichern:
	


	//Primärtext, ursprungsforderungsdtext aller markierten Artefakte laden:

	//Attribute ohne Primärtext abfregen:
	let promisAttr1 = new Promise(function(resolve, reject){
		RM.Data.getAttributes(currentSelection, [RM.Data.Attributes.ARTIFACT_TYPE, "Ursprungsanforderung (Afo/Interne/Vorschrift)"], function(res){ 
			resolve(res);
		});
	});

	//Nur Primärtext abfragen:
	let promisAttr2 = new Promise(function(resolve, reject){
		RM.Data.getAttributes(currentSelection, RM.Data.Attributes.PRIMARY_TEXT, function(res){ 
			resolve(res);
		}); 
	});

	let opResAttributes = await promisAttr1;
	let att2 = await promisAttr2;

	//Beide Ergebnisse vereinen
	for(let i = 0; i<opResAttributes.data.length;i++){
		opResAttributes.data[i].values[RM.Data.Attributes.PRIMARY_TEXT] = att2.data.find(item=>item.ref.uri == opResAttributes.data[i].ref.uri).values[RM.Data.Attributes.PRIMARY_TEXT];
	}


	
		
		let isNurTextInSpec = true;		
		
		for(let n = 0; n<opResAttributes.data.length;n++){
			console.log(opResAttributes.data[n].values[RM.Data.Attributes.ARTIFACT_TYPE].name);
			if(opResAttributes.data[n].values[RM.Data.Attributes.ARTIFACT_TYPE].name !=  "Text in Spec"){
				isNurTextInSpec = false;		
			}
		}

		if(isNurTextInSpec ){
			//Variable für alle setzt-um-Ziele       let setztUmTargets
			setztUmTargetsErstesElement =[];
			afoTargetsErstesElement =[];
	
			setztUmTargetsRestlicheElemente =[];
			afoTargetsRestlicheElemente =[];
		
		

			//get Links des nicht zu löschenden ELements ermettelt: 	opResAttributes.data[opResAttributes.data.length - 1].ref	"setzt um"	
			async function pause1(){
				let promisePause1 = new Promise1(function(resolve, reject){	
					RM.Data.getLinkedArtifacts(opResAttributes.data[opResAttributes.data.length - 1].ref, ["setzt um" ,"Afo"], function(res){
						afoTargetsErstesElement  = res.data.artifactLinks[0].targets;
						setztUmTargetsErstesElement  = res.data.artifactLinks[1].targets;
						resolve();
					});
				});
				await pause1	
			}


			//durch alle Primärtexte außer den ersten gehen...:
			for(let i = opResAttributes.data.length - 2; i>=0; i--){

				//...und jeweils an den Primärtext des ersten elements hängen...:
				opResAttributes.data[opResAttributes.data.length - 1].values[RM.Data.Attributes.PRIMARY_TEXT] += "\n" +opResAttributes.data[i].values[RM.Data.Attributes.PRIMARY_TEXT];
				opResAttributes.data[opResAttributes.data.length - 1].values["Ursprungsanforderung (Afo/Interne/Vorschrift)"] += "\n" +opResAttributes.data[i].values["Ursprungsanforderung (Afo/Interne/Vorschrift)"];

			
			
				//get Links: 	opResAttributes.data[opResAttributes.data.length - 1].ref	"setzt um"		"Afo"
					//wenn ziel noch nicht dabei dann hinzufügen

				let promiseResAfo = new Promise(function(resolve, reject){
					RM.Data.getLinkedArtifacts(opResAttributes.data[i].ref, "Afo", function(res){

						if(typeof res.data.artifactLinks[0] != "undefined" ){
							afoTargetsRestlicheElemente = afoTargetsRestlicheElemente.concat( res.data.artifactLinks[0].targets);
					 	}
						resolve();
					});
				});

				let promiseResSetztUm = new Promise(function(resolve, reject){
					RM.Data.getLinkedArtifacts(opResAttributes.data[i].ref, "setzt um", function(res){
						if(typeof res.data.artifactLinks[0] != "undefined" ){
							setztUmTargetsRestlicheElemente = setztUmTargetsRestlicheElemente.concat( res.data.artifactLinks[0].targets);
						}
						resolve();
					});
				});
				await promiseResAfo;
				await promiseResSetztUm;
			}
			

		
			opResAttributes.data[opResAttributes.data.length - 1].values[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";	
			RM.Data.setAttributes(opResAttributes.data[opResAttributes.data.length - 1], function(res){
				if(res.code == RM.OperationResult.OPERATION_OK){	
					opResAttributes.data.forEach(function(info, index){
						if(index != opResAttributes.data.length - 1){
							RM.Data.Module.removeArtifact(info.ref, true, function(res){
							
							});
						}
					});
				
					setztUmTargetsRestlicheElemente.forEach(function(target, index){
						RM.Data.createLink(opResAttributes.data[opResAttributes.data.length - 1].ref,"setzt um",target );
					});

					afoTargetsRestlicheElemente.forEach(function(target, index){
						RM.Data.createLink(opResAttributes.data[opResAttributes.data.length - 1].ref,"Afo",target );
					});
				
				
				}
			});

		}
		else{
			alert('Sie haben mindestens ein Artefakt markiert, dass nicht vom Typ "Text in Spec" ist. Bitte wählen Sie die zusammenzufassenden Artefakte neu aus und achten darauf, dabei keine Überschriften, Bilder etc. zu markieren!');
		}


}