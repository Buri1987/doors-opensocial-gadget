async function getBgNrZuTestInSpec(refTextInSpec){
	//Struktur des Moduls laden:
	let refModul = new RM.ArtifactRef(refTextInSpec.moduleUri, refTextInSpec.componentUri, "", modulInterneAnforderungen.format);

	let promiseGetContentStructure = new Promise(async  function(resolve, reject){
		RM.Data.getContentsStructure(refModul,function(str){
		resolve(str.data);
		});
	});

	let contStructureModul = await promiseGetContentStructure;

	//Überschrift zu TextInSpec finden:
	baugruppennummer = await getBgBummerVonUeberschriftStructureNode(contStructureModul.find(item=>item.ref.uri==refArt.data.ref.uri));

	
	
}