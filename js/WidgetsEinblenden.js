
//RefObjekt für MBgV erzeugen:
let refBgV; 

//Funktion blendet nur die Widgets ein, dessen CSS-id ihr in einem Array von Strings übergeben werden:
function widgetsEinblenden(idDerSichtbaren){

	//Alle Divs selektieren, die einem Widget innerhalb des Containers entsprechen und durch diese iterieren:
	let alleWidgetsZwischenspeicher = $("#container>div");
	for(let i = 0; i<alleWidgetsZwischenspeicher.length; i++){
		//Jedes dieser Divs einblenden, wenn dessen id im Array idDerSichtbaren enthalten ist, ansonsten ausblenden:
		if(idDerSichtbaren.indexOf(alleWidgetsZwischenspeicher[i].id)>=0){
			$("#"+alleWidgetsZwischenspeicher[i].id).removeClass("invisible");
		}
		else{
			$("#"+alleWidgetsZwischenspeicher[i].id).addClass("invisible");
		}
	}
}