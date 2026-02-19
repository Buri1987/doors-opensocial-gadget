async function afoBezugAktualisierenUndLvLöschen(){
	//1. Schleife durch alle selectierten Artefacte:
	currentSelection.forEach(function(selektiertesArtefakt, index){
		afoErmittelnLVLöschen(selektiertesArtefakt, selektiertesArtefakt, 1);
	});
}
