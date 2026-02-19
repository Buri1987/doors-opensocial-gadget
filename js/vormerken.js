//Selektierte Elemente an andere Fenster senden:
async function vormerken(){
	//Von vorheriger Datenselektion angezeigte Anzahl der Vorgemerkten Anf entfernen:
	document.getElementById("spanAnzAnf").innerText = "";
	hinzugefuegteAnf = 0;
													
	//Beziehungsgeflecht auslesen:
	beziehungsgeflecht = await beziehungsgeflechtAuslesen(currentSelection, new Object());

	//Die Anzahl der für die Datenübernahme vorgemerkten Anforderungen anzeigen und dem Objekt hinzufügen:
	beziehungsgeflecht["anzAnf"] = hinzugefuegteAnf;
	document.getElementById("spanAnzAnf").innerText = hinzugefuegteAnf +" Anforderungen vorgemerkt";

	//Über diesen die aktuelle Selektion senden:
	bc.postMessage(beziehungsgeflecht);
}