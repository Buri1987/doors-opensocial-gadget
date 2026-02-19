var anfUndCheckboxen;
var currentAenderungsbedarfAem;
//Parameter artArteAusge zeigt wie die Funktion aufgerufen wird. Der Wert 0 bedeutet durch Event.subscribe. 1-4 durch die in der Funktion gezeichneten Links
async function aenderungsManagementWidgetAktualisieren(artArteAusge){

	anfUndCheckboxen = new Object();

	document.getElementById("contentAeM").innerHTML= "";
	document.getElementById("unterInfoAenderungen").innerHTML= "";
	//prüfen, ob nur eine Artefakt selektiert ist:
	if (currentSelection.length ==1){
		
		
		//wenn ja, links "umgesetzt von" und "Change Requests" auslesen:
		RM.Data.getLinkedArtifacts(currentSelection[0], ["umgesetzt von", "Änderungsbedarf (direkt)", "Änderungsbedarf (indirekt)"], async function(res){

			linksChangeObject = res.data.artifactLinks.find((element) => element.linktype == "Änderungsbedarf (direkt)");
			//Falls es keinen direkt verlinkten Aenderungsbedarf gibt, eventuelle indirekte betrachten:
			if(typeof linksChangeObject == "undefined" ){		
				linksChangeObject = res.data.artifactLinks.find((element) => element.linktype == "Änderungsbedarf (indirekt)");
			}
			linksUmgesetztVon = res.data.artifactLinks.find((element) => element.linktype == "umgesetzt von");	

			//pürfen ob es verlinkte Change Requests gibt:
			if(typeof linksChangeObject != "undefined" ){
				//document.getElementById("verdaechtigeArt").innerHTML= '<div class="grid-container" id="verdaechtigeArt"></div>';
				currentAenderungsbedarfAem = linksChangeObject.targets[0];

				document.getElementById("unterInfoAenderungen").innerHTML= '<p class="UnterInfoHeader">Änderungsbedarf</p><p class="UnterInfoBody" id="Aenderungsbedarf"></p><p class="UnterInfoHeader">Begründente Unterlage</p><p class="UnterInfoBody" id="begruendendeUnterlage"></p><p class="UnterInfoHeader">Analyse Zusammenfassung</p><input class="UnterInfoBody" style="margin:4px;">';
				//Details des Aenderungsbedarfs auslesen:
				RM.Data.getAttributes(linksChangeObject.targets[0], [RM.Data.Attributes.NAME,RM.Data.Attributes.IDENTIFIER,"Begründende Unterlage", "Bearbeitungsfortschritt"], async function(opResArtifactAttributes){
					document.getElementById("Aenderungsbedarf").innerText = opResArtifactAttributes.data[0].values[RM.Data.Attributes.NAME];
					document.getElementById("begruendendeUnterlage").innerText = opResArtifactAttributes.data[0].values["Begründende Unterlage"];
					fortschritt = JSON.parse(opResArtifactAttributes.data[0].values["Bearbeitungsfortschritt"]);
					let promiseAttrCurSel = new Promise(function(resolve, reject){
						RM.Data.getAttributes(currentSelection[0], RM.Data.Attributes.IDENTIFIER, function(opResArtifactAttributes){
							resolve(opResArtifactAttributes.data[0]);	
						});
					});
					let curSelPrimText = await promiseAttrCurSel;

					let fallDerBearbeitung = 0;
					let idAenderungsverlangenUndAnf = opResArtifactAttributes.data[0].values[RM.Data.Attributes.IDENTIFIER]+"."+curSelPrimText.values[RM.Data.Attributes.IDENTIFIER];
					if(fortschritt[idAenderungsverlangenUndAnf]!=null){
						/*Abfrage ob die Funktion durch subscribe aufgerufen wurde(Fall 0), wenn ja keine Änderung.
						Wenn 1-4, durch einen der gezeichneten Links aufgerufen und der Wert des Bearbeitungsfortschritts wird dementsprechend geändert.*/
						switch(artArteAusge){
							case 0:
							break;
							case statusImpaktAnalyse.nochNichtDurchgefuehrt:
								fortschritt[idAenderungsverlangenUndAnf] = statusImpaktAnalyse.nochNichtDurchgefuehrt;
								opResArtifactAttributes.data[0].values["Bearbeitungsfortschritt"] = JSON.stringify(fortschritt);
								RM.Data.setAttributes(opResArtifactAttributes.data[0],function(){});			
								break;
							case statusImpaktAnalyse.keineAenderungNotwendig:
								fortschritt[idAenderungsverlangenUndAnf] = statusImpaktAnalyse.keineAenderungNotwendig;
								opResArtifactAttributes.data[0].values["Bearbeitungsfortschritt"] = JSON.stringify(fortschritt);
								RM.Data.setAttributes(opResArtifactAttributes.data[0],function(){});
								break;
							case statusImpaktAnalyse.AenderungNotwendig:
								fortschritt[idAenderungsverlangenUndAnf] = statusImpaktAnalyse.AenderungNotwendig;
								opResArtifactAttributes.data[0].values["Bearbeitungsfortschritt"] = JSON.stringify(fortschritt);
								RM.Data.setAttributes(opResArtifactAttributes.data[0],function(){});
								break;
							case statusImpaktAnalyse.AenderungDurchgeführt:
								fortschritt[idAenderungsverlangenUndAnf] = statusImpaktAnalyse.AenderungDurchgeführt;
								opResArtifactAttributes.data[0].values["Bearbeitungsfortschritt"] = JSON.stringify(fortschritt);
								RM.Data.setAttributes(opResArtifactAttributes.data[0],function(){});


								//Speichern der Artefakte die über "umgesetzt von" verlinkt sind
								linksUmgesetztVon = res.data.artifactLinks.find((element) => element.linktype == "umgesetzt von");
								

								/*In den umgesetzten Artefakte werden alle direkten Änderungsbedarfe 
								des ursprünglichen vom Benutzer ausgewählten Artefakts als indirekte Änderungsbedarfe verlinkt.
								Vorher Überprüfung, ob es überhaupt Link zu Artefakten gibt. Wenn nicht wird der case abgebrochen.*/
								if(linksUmgesetztVon === undefined){
									break;
								}
								linksUmgesetztVon.targets.forEach(function(target, index){
								RM.Data.createLink(target, 'Änderungsbedarf (indirekt)', opResArtifactAttributes.data[0].ref, function(link){});
								})
								

								/*Es werden alle über "umgesetzt von" verlinkten Artefakte durchlaufen und von dem aktuellen Artefakt die "ID" in "umgeID" gespeichert.
								Dann wird von jedem dieser Artefakte alle durch "Änderungsbedarf (direkt)" verlinkten Änderungsbedarfe 
								durchlaufen. Bei jedem verlinkten Artefakt wird die "ID" und der "Bearbeitungsfortschritt" geholt. Aus den beiden IDs
								wird der "Bearbeitungsfortschritt" erzeugt und dem "direkten Änderungsbedarf" Artefakt übergeben. 
								Dies geschieht, um den Bearbeitungsfortschritt zu bearbeiten.*/

								linksUmgesetztVon.targets.forEach(async function(target, index){
									var umgeID = "";

									let promiseUmgeID = new Promise(function(resolve, reject){
										RM.Data.getAttributes(target, RM.Data.Attributes.IDENTIFIER, function(resUmgeID){
											resolve(resUmgeID);
										});
									});
									umgeID = await promiseUmgeID;
									let idAendUndUmge = opResArtifactAttributes.data[0].values[RM.Data.Attributes.IDENTIFIER]+"."+umgeID.data[0].values[RM.Data.Attributes.IDENTIFIER];
									const entries = new Array([idAendUndUmge, 1]);
									const fortschrittUmge = Object.fromEntries(entries);
									fortschritt = {...fortschritt, ...fortschrittUmge};
									opResArtifactAttributes.data[0].values["Bearbeitungsfortschritt"] = JSON.stringify(fortschritt);
									RM.Data.setAttributes(opResArtifactAttributes.data[0],function(){});
								});
							break;
							default:
								alert("Fehler!  Bitte bei ZKKS melden.");
								break;
						}
						fallDerBearbeitung = fortschritt[idAenderungsverlangenUndAnf];
						switch (fallDerBearbeitung) {
  							case statusImpaktAnalyse.nochNichtDurchgefuehrt:
								 	let html = '<p>Muss die markierte Anforderung wegen des Änderungsverlangen geändert werden?</p>'+
                								'<div class="dropdown">'+
                  								'	<button id="btnFall1" onclick="myFunction(1)" class="dropbtn">Bitte wählen!!!</button>'+
                  								'	<div id="myDropdown" class="dropdown-content">'+
                    								'		<a onclick="auswahl(\'Bitte wählen!!!\',1)">Bitte wählen!!!</a>'+
                    								'		<a onclick="auswahl(\'Ja\',1)">Ja</a>'+
                    								'		<a onclick="auswahl(\'Nein\',1)">Nein</a>'+
                  								'	</div>'+
                								'</div>';
									document.getElementById("contentAeM").innerHTML= html;
							break;
  							case statusImpaktAnalyse.keineAenderungNotwendig:
							  	let html1a = '<p>Muss die markierte Anforderung wegen des Änderungsverlangen geändert werden?</p>'+
                								'<div class="dropdown">'+
                  								'	<button id="btnFall1" onclick="myFunction(1)" class="dropbtn">Nein</button>'+
                  								'	<div id="myDropdown" class="dropdown-content">'+
                    								'		<a onclick="auswahl(\'Bitte wählen!!!\',1)">Bitte wählen!!!</a>'+
                    								'		<a onclick="auswahl(\'Ja\',1)">Ja</a>'+
                    								'		<a onclick="auswahl(\'Nein\',1)">Nein</a>'+
                  								'	</div>'+
                								'</div>';
				  				document.getElementById("contentAeM").innerHTML= html1a;
							break;
  							case statusImpaktAnalyse.AenderungNotwendig:
							  let html1b = '<p>Muss die markierte Anforderung wegen des Änderungsverlangen geändert werden?</p>'+
                								'<div class="dropdown">'+
                  								'	<button id="btnFall1" onclick="myFunction(1)" class="dropbtn">Ja</button>'+
                  								'	<div id="myDropdown" class="dropdown-content">'+
                    								'		<a onclick="auswahl(\'Bitte wählen!!!\',1)">Bitte wählen!!!</a>'+
                    								'		<a onclick="auswahl(\'Ja\',1)">Ja</a>'+
                    								'		<a onclick="auswahl(\'Nein\',1)">Nein</a>'+
                  								'	</div>'+
                								'</div>';
							  let html2 = '<p>Haben Sie die markierte Anforderung schon entsprechend des Änderungsverlangen geändert?</p>'+
							  					'<div class="dropdown">'+
												'	<button id="btnFall2" onclick="myFunction(2)" class="dropbtn">Bitte wählen!!!</button>'+
												'	<div id="myDropdown2" class="dropdown-content">'+
								  				'		<a onclick="auswahl(\'Bitte wählen!!!\',2)">Bitte wählen!!!</a>'+
								  				'		<a onclick="auswahl(\'Ja\',2)">Ja</a>'+
								  				/*'		<a onclick="auswahl(\'Nein\',2)">Nein</a>'+*/
												'	</div>'+
							  					'</div>';
				 				document.getElementById("contentAeM").innerHTML = html1b + html2;
							break;
  							case statusImpaktAnalyse.AenderungDurchgeführt:
							  let html1c = '<p>Muss die markierte Anforderung wegen des Änderungsverlangen geändert werden?</p>'+
                								'<div class="dropdown">'+
                  								'	<button id="btnFall1" onclick="myFunction(1)" class="dropbtn">Ja</button>'+
                  								'	<div id="myDropdown" class="dropdown-content">'+
                    								'		<a onclick="auswahl(\'Bitte wählen!!!\',1)">Bitte wählen!!!</a>'+
                    								'		<a onclick="auswahl(\'Ja\',1)">Ja</a>'+
                    								'		<a onclick="auswahl(\'Nein\',1)">Nein</a>'+
                  								'	</div>'+
                								'</div>';
							  let html2b = '<p>Haben Sie die markierte Anforderung schon entsprechend des Änderungsverlangen geändert?</p>'+
							  					'<div class="dropdown">'+
												'	<button id="btnFall2" onclick="myFunction(2)" class="dropbtn">Ja</button>'+
												'	<div id="myDropdown2" class="dropdown-content">'+
								  				//'		<a onclick="auswahl(\'Bitte wählen!!!\',2)">Bitte wählen!!!</a>'+
								  				'		<a onclick="auswahl(\'Ja\',2)">Ja</a>'+
								  				'		<a onclick="auswahl(\'Nein\',2)">Nein</a>'+
												'	</div>'+
							  					'</div>';
				 				document.getElementById("contentAeM").innerHTML = html1c + html2b;
							break;
 							default:
								alert("Fehler!  Bitte bei ZKKS melden.");
							break;
						}	
					}
				});
			}
		});
	}
}