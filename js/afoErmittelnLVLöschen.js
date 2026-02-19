//Funktion um die Afo eines Bauspectextes zu ermitteln (rekursicve Funktion):
async function afoErmittelnLVLöschen(anforderung, textInSpec, nterAufruf){

/*
	RM.Data.getLinkedArtifacts(anforderung, "setzt um", function(opResLinkedDataSet ){
		opResLinkedDataSet.forEach(function(linkedArtifactAttributes, index)){
			RM.Data.deleteLink(anforderung,)
		}
	}
*/		
RM.Data.getLinkedArtifacts(anforderung, "Afo", function(opResLinkedDataSet){

	//Für alle ermittelten Artefakte den Artifakttyp ermitteln:
	RM.Data.getAttributes(opResLinkedDataSet.data.artifactLinks[0].targets, ["ID-Kunde", RM.Data.Attributes.ARTIFACT_TYPE], function(opResArtifactAttributes){

		//Durch alle Artefakte iterieren:
			opResArtifactAttributes.data.forEach(function(linkedArtifactAttributes, index){

			//Wenn das Artefakt eine Afo ist,...
			if(linkedArtifactAttributes.values[RM.Data.Attributes.ARTIFACT_TYPE].name == "Kundenanforderung"){
								
					RM.Data.deleteLink(textInSpec, "Afo", linkedArtifactAttributes.ref, function(res){ 
						//resolve(linkedArtifactAttributes);
					});				
			}
			else{
				
			}
		});
	});
});

	//Alle über den LinkTyp "setzt um" verlinkten Artifacte ermitteln
	RM.Data.getLinkedArtifacts(anforderung, "setzt um", function(opResLinkedDataSet ){

		//Für alle ermittelten Artefakte den Artifakttyp ermitteln:
		RM.Data.getAttributes(opResLinkedDataSet.data.artifactLinks[0].targets, ["ID-Kunde", RM.Data.Attributes.ARTIFACT_TYPE], function(opResArtifactAttributes){

			//Durch alle Artefakte iterieren:
   	 		opResArtifactAttributes.data.forEach(function(linkedArtifactAttributes, index){

				//Wenn das Artefakt eine Afo ist,...
				if(linkedArtifactAttributes.values[RM.Data.Attributes.ARTIFACT_TYPE].name == "Kundenanforderung"){
					
					var promisDel = new Promise(function(resolve){
						RM.Data.deleteLink(textInSpec, "Afo", linkedArtifactAttributes.ref, function(res){ 
							resolve(linkedArtifactAttributes);
						});
					});
					
					//let promDel = await promisDel;
					promisDel.then(function(value){
						let text = value.values["ID-Kunde"];
							if(text.startsWith("X1")){
								console.log("Der gefundene LV wurde nicht verlinkt.");
							}
							else{
								//... dann mit dem BauspecText verlinken:
								RM.Data.createLink(textInSpec, "Afo", value.ref, function(res){});
								console.log("Die gefundene Anforderung wurde verlinkt.");
							}
					});
				}
				else{

					/*
					...wenn nicht, dann diese Funktion rekusiv erneut aufrufen, 
					allerdings mit dem ermittelten verlinkten Attributen, 
					um sich so lange durch die verlinkten Artefakte durchzuhangeln, bis eine Afo erreicht ist:
					*/
					if(nterAufruf<20){
						afoErmittelnLVLöschen(linkedArtifactAttributes.ref, textInSpec, nterAufruf+1);
					}
					else{
						console.log("überlauf");
					}
				}
			});
		});
	});
}