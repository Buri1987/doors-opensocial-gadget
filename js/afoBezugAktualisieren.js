async function afoBezugAktualisieren(){
	//1. Schleife durch alle selectierten Artefacte:
	currentSelection.forEach(function(selektiertesArtefakt, index){
		afoErmitteln(selektiertesArtefakt, selektiertesArtefakt, 1);
	});
}