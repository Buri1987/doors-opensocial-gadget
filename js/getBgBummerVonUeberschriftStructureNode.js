async function getBgBummerVonUeberschriftStructureNode(structureNoteTextInSpec){
	//Prüfen, ob Überschrift Link zu Bg hat:
	let promiseGetLinkedArtifacts = new Promise(async  function(resolve, reject){
		RM.Data.getLinkedArtifacts(structureNoteTextInSpec.parent.ref, "System-/Baugruppennummer", function(linkedArt){
			resolve(linkedArt.data);
		});
	});
	let linkedArt = await promiseGetLinkedArtifacts;

	if(linkedArt.artifactLinks.length != 0){
		let promiseGetAttr = new Promise(async  function(resolve, reject){
			RM.Data.getAttributes(linkedArt.artifactLinks[0].targets[0], "System-/Baugruppennummer", function(attrBg){
				resolve(attrBg.data[0].values["System-/Baugruppennummer"]);
			});
		});
		return(await promiseGetAttr); 
	}
	else{
		if(structureNoteTextInSpec.parent){	
			return(getBgBummerVonUeberschriftStructureNode(structureNoteTextInSpec.parent));
		}
		else{
			return("");
		}
	}		
}