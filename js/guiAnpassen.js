function guiAnpassen(ref){
	//Falls FD-StudienProjekt, dann Übernahmefunktion anzeigen, sonst nicht:
	RM.Data.getAttributes(ref, [RM.Data.Attributes.ARTIFACT_TYPE, RM.Data.Attributes.FORMAT], function(opResAttributes){
		//Oberfläche ja nach Modultyp anpassen
		if(opResAttributes.data[0].values[RM.Data.Attributes.FORMAT]=="Module"){


			//Das Widget "Anf in Bauspec übertragen" für Kundenanforderung anpassen:
			document.getElementById("textAnfInBauspecUebertragen").innerHTML = "<b>[W3]</b> Markierte Anforderung in Bauspec...";
			//document.getElementById("btnAnfInBauspecAbleiten").classList.remove("invisible");

			switch(opResAttributes.data[0].values[RM.Data.Attributes.ARTIFACT_TYPE].name){
				case "Konzept":
					widgetsEinblenden(["intZusammenfassen","intAbleiten","intBgVerlinken","aenderungen","textAnfInBauspecUebertragen"]);
				break;

				case "Band Bauspec":	
					widgetsEinblenden(["ÜberschriftInBauspec","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","AnfAusAltprojektUebernehmen","afoBezugAktualisierenUndLvLöschen"]);
				break;

				case "Interne Anforderungen":
					widgetsEinblenden(["ÜberschriftInBauspec","AnfInBauspecUebertragen","intAbleiten","intBgVerlinken","AnfAusAltprojektUebernehmen"]);
				break;

				case "Kundenanforderungen":
					//Das Widget "Anf in Bauspec übertragen" für Kundenanforderung anpassen:
					document.getElementById("textAnfInBauspecUebertragen").innerHTML = "<b>[W3]</b> Markierte Kundenanforderung...";
					document.getElementById("btnAnfInBauspecAbleiten").innerText = "...direkt in Bauspec beantworten";
					//document.getElementById("btnAnfInBauspecAbleiten").classList.add("invisible");
					widgetsEinblenden(["ÜberschriftInBauspec", "AnfInBauspecUebertragen", "intBgVerlinken","AnfAusAltprojektUebernehmen", "intAbleiten"/*,"aendAnf"*/]);
				break;

				default:
					widgetsEinblenden([]);
				break;
			}
		}
		else{
			widgetsEinblenden([]);
		}
		if(ref.componentUri == "https://jazz.dnet.lan/rm/rm-projects/_leTu4KwDEeupW5W8IOZKvw/components/_lji0MKwDEeupW5W8IOZKvw" ){
			document.getElementById("fuerUebernahmeVormerken").classList.remove("invisible");

		}
		else{
			document.getElementById("fuerUebernahmeVormerken").classList.add("invisible");
		}
	});
}

//selektierte Artefakte laden:
var currentSelection;

RM.Event.subscribe(RM.Event.ARTIFACT_SELECTED, function(refs){
	document.getElementById("anzSelektierteArt").innerText =refs.length;

    	currentSelection = refs;
/*
		if(document.getElementById("aendAnf").className != "invisible"){
			aenderungsManagementWidgetAktualisieren(0);
		}
*/





		if (currentSelection.length ==1){
		
		
			//wenn ja, links "umgesetzt von" und "Change Requests" auslesen:
			RM.Data.getLinkedArtifacts(currentSelection[0], ["Änderungsbedarf (direkt)", "Änderungsbedarf (indirekt)"], async function(res){
	
				linksChangeObject = res.data.artifactLinks.find((element) => element.linktype == "Änderungsbedarf (direkt)");
				//Falls es keinen direkt verlinkten Aenderungsbedarf gibt, eventuelle indirekte betrachten:
				if(typeof linksChangeObject == "undefined" ){		
					linksChangeObject = res.data.artifactLinks.find((element) => element.linktype == "Änderungsbedarf (indirekt)");
					if(typeof linksChangeObject != "undefined" ){
						$("#aendAnf").removeClass("invisible");
						aenderungsManagementWidgetAktualisieren(0);
					}
					else{
						$("#aendAnf").addClass("invisible");
					}
				}
				else if(typeof linksChangeObject != "undefined" ){
					$("#aendAnf").removeClass("invisible");
					aenderungsManagementWidgetAktualisieren(0);
				}

			});
		}
		else if(currentSelection.length > 1 || currentSelection.length == 0){
			$("#aendAnf").addClass("invisible");
		}

});


//Alle Baugruppennummern und dazugehörigen URIs in Dictionary laden:
baugruppenNummerLaden();

//In Altprojekt zur Übernahme vorgemerkte Artefakte auslesen und speichern:
//Prüfenob, Channal zum Übertragen der Selektion an anderes Fenster schon existiert:
const bc = new BroadcastChannel("datenuebernahme");


var beziehungsgeflechtAltprojekt;
bc.addEventListener("message", e=>{
	beziehungsgeflechtAltprojekt =e.data;
	console.log(beziehungsgeflechtAltprojekt );
	
	if(beziehungsgeflechtAltprojekt["anzAnf"]==1){
		document.getElementById("spanAnzVorgemerkteAnf").innerText = "1 vorgemerkte Anforderung";
	}
	else{
		document.getElementById("spanAnzVorgemerkteAnf").innerText = beziehungsgeflechtAltprojekt["anzAnf"] + " vorgemerkte Anforderungen";
	}


	document.getElementById("anfAusProjektUebernehmen").disabled = false;


});
