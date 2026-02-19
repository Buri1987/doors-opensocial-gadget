function zuIntAnfZusammenfassen(){

	//Primärtext aller markierten Artefakte laden:
	RM.Data.getAttributes(currentSelection, [RM.Data.Attributes.ARTIFACT_TYPE, RM.Data.Attributes.PRIMARY_TEXT], function(opResAttributes){

		//durch alle Primärtexte außer den ersten gehen...:
		for(let i = opResAttributes.data.length - 2; i>=0; i--){			
			//...und jeweils an den Primärtext des ersten elements hängen...:
			opResAttributes.data[opResAttributes.data.length - 1].values[RM.Data.Attributes.PRIMARY_TEXT] += opResAttributes.data[i].values[RM.Data.Attributes.PRIMARY_TEXT];
			//console.log(opResAttributes.data[opResAttributes.data.length - 1].values[RM.Data.Attributes.PRIMARY_TEXT]);
			
			//...und dann die Anforderung löschen: --> Timo: 23.5.22: Durch das Löschen an dieser Stelle stürzt die Funktion immer ab.
			//RM.Data.Module.removeArtifact(opResAttributes.data[i].ref, true, function(res){console.log(res)});				
		}

		//Den Artefakttyp zu "Text in Spec" ändern:
		opResAttributes.data[opResAttributes.data.length - 1].values[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";
		/*
		if (opResAttributes.data[opResAttributes.data.length -1].values[RM.Data.Attributes.ARTIFACT_TYPE].name != "Text in Spec"){
			opResAttributes.data[opResAttributes.data.length - 1].values[RM.Data.Attributes.ARTIFACT_TYPE] = "Text in Spec";
			console.log(opResAttributes.data[opResAttributes.data.length -1].values[RM.Data.Attributes.ARTIFACT_TYPE].name);

		}
		*/

		//Aus diesen geänderten Attributen ein Element erzeugen. 
		var strategy = new RM.LocationSpecification(opResAttributes.data[opResAttributes.data.length - 1].ref , RM.Data.PlacementStrategy.AFTER);
		
		RM.Data.Module.createArtifact(opResAttributes.data[opResAttributes.data.length - 1].values, strategy, function(result){
			//console.log(result.code);
			if(result.code === RM.OperationResult.OPERATION_OK){
				opResAttributes.data.forEach(function(info, index){
					RM.Data.Module.removeArtifact(info.ref, true, function(res){});
					//console.log("Artefakt gelöscht");
				});
			}else{
				alert("Es hat leider etwas nicht geklappt. Bitte Fenster neu laden und erneut versuchen!!!!");
			}				
		});
	});
}