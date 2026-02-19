async function getBauSpecKapitelZuBg(refBg){
		
	// Prüfen ob Link zu BauspecKapitel vorhanden ist:
	let promiseLinkedArti = new Promise(function(resolve, reject){                  
		RM.Data.getLinkedArtifacts(refBg,"Bauspec-Kapitel", function(res){  
			resolve(res.data.artifactLinks);
		});
	});
	var linkDef = await promiseLinkedArti;
	
	if(linkDef.length == 0){
		return "";
	}
	else{
		return linkDef[0].targets[0];
	}
}