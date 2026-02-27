async function guiAnpassen(ref){
	
	/*	Debugging	*/
	//let temp = ref.componentUri;
	//console.log = temp;
	console.log("debug");
	//Falls FD-StudienProjekt, dann Übernahmefunktion anzeigen, sonst nicht:
	RM.Data.getAttributes(ref, [RM.Data.Attributes.ARTIFACT_TYPE, RM.Data.Attributes.FORMAT], async function(opResAttributes){
		//Oberfläche ja nach Modultyp anpassen
		if(opResAttributes.data[0].values[RM.Data.Attributes.FORMAT]=="Module"){


			//Das Widget "Anf in Bauspec übertragen" für Kundenanforderung anpassen:
			document.getElementById("textAnfInBauspecUebertragen").innerHTML = "<b>[W3]</b> Markierte Anforderung in Bauspec...";
			//document.getElementById("btnAnfInBauspecAbleiten").classList.remove("invisible");


			//Abfrage ob MOBULA-Projekt, NTV, MWV, OEV90, GMF120, OPV 80
			console.log("guiAnpassenDebug");
			switch(opResAttributes.data[0].ref.componentUri){
				case "https://jazz.dnet.lan/rm/rm-projects/_-GBPUBGEEe2bhY_VELeR3g/components/_-KTSYBGEEe2bhY_VELeR3g":
				case "https://jazz.dnet.lan/rm/rm-projects/__mKCoEKAEe6y5MH2fOa4fg/components/__q708EKAEe6y5MH2fOa4fg": 
				case "https://jazz.dnet.lan/rm/rm-projects/_5OaNYEZlEe6y5MH2fOa4fg/components/_5RZP8EZlEe6y5MH2fOa4fg":
				case "https://jazz.dnet.lan/rm/rm-projects/_tJug4EsCEe6y5MH2fOa4fg/components/_tMfhAEsCEe6y5MH2fOa4fg":
				case "https://jazz.dnet.lan/rm/rm-projects/_RWErYF6YEe6vUqYK6ozE4w/components/_RfQckF6YEe6vUqYK6ozE4w":
				case "https://jazz.dnet.lan/rm/rm-projects/_3pKoYGK1Ee6vUqYK6ozE4w/components/_3sV4MGK1Ee6vUqYK6ozE4w":
								

					document.getElementById("dropdownBgVerlinkungBAs").classList.remove("invisible");
					switch(opResAttributes.data[0].values[RM.Data.Attributes.ARTIFACT_TYPE].name){
						case "Konzept":
							widgetsEinblenden(["intBgVerlinken", "dropdownBgVerlinkungBAs","afoBezugAktualisieren","AnforderungAbleitenInBauspecAusKonzept"]);
						break;

						case "Band Bauspec":	
							let currentuser = "";
							let promiseCurrentuser = new Promise(function(res,rej){
								RM.Data.getCurrentUser(function(result) {
									if (result.code === RM.OperationResult.OPERATION_OK) {
										res(result.data.userId);
									} else {
										rej();
									}
								});
							});

							currentuser = await promiseCurrentuser;
							if(currentuser == "lennard.kienzler" || currentuser == "sebastian.damm" || currentuser == "robert.burmeister" || currentuser == "timo.doergeloh" || currentuser == "thomas.olerich"){
								widgetsEinblenden(["ÜberschriftInBauspec","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","AnfAusAltprojektUebernehmen","afoBezugAktualisierenUndLvLöschen","beistellOption","baugruppeSchnittstellen"]);
							}else{
									widgetsEinblenden(["ÜberschriftInBauspec","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","baugruppeSchnittstellen"]);
							}
						break;

						case "Interne Anforderungen":
							widgetsEinblenden(["ÜberschriftInBauspec","AnfInBauspecUebertragen","intAbleiten","intBgVerlinken", "dropdownBgVerlinkungBAs","AnfAusAltprojektUebernehmen"]);
						break;

						case "Kundenanforderungen":
							//Das Widget "Anf in Bauspec übertragen" für Kundenanforderung anpassen:
							document.getElementById("textAnfInBauspecUebertragen").innerHTML = "<b>[W3]</b> Markierte Kundenanforderung...";
							document.getElementById("btnAnfInBauspecAbleiten").innerText = "...direkt in Bauspec beantworten";
							//document.getElementById("btnAnfInBauspecAbleiten").classList.add("invisible");
							console.log("debug");
							widgetsEinblenden(["ÜberschriftInBauspec", "inKonzeptAbleiten","AnfInBauspecUebertragen", "intBgVerlinken", "dropdownBgVerlinkungBAs","intAbleiten","VerfeinerteIstLbAbleiten"]);
							switch(opResAttributes.data[0].ref.componentUri){
								//Mobula
								case "https://jazz.dnet.lan/rm/rm-projects/_-GBPUBGEEe2bhY_VELeR3g/components/_-KTSYBGEEe2bhY_VELeR3g":
									$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteMobula.txt", function( data ) {
										document.getElementById("myDropdownKonzept").innerHTML = data;
									});
								break;
								//NTV130
								case "https://jazz.dnet.lan/rm/rm-projects/__mKCoEKAEe6y5MH2fOa4fg/components/__q708EKAEe6y5MH2fOa4fg": 
									$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteNTV130.txt", function( data ) {
										document.getElementById("myDropdownKonzept").innerHTML = data;
									});
									break;
								//MWV
								case "https://jazz.dnet.lan/rm/rm-projects/_5OaNYEZlEe6y5MH2fOa4fg/components/_5RZP8EZlEe6y5MH2fOa4fg":
									$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteMWV.txt", function( data ) {
										document.getElementById("myDropdownKonzept").innerHTML = data;
									});
									break;
								//OEV90
								case "https://jazz.dnet.lan/rm/rm-projects/_tJug4EsCEe6y5MH2fOa4fg/components/_tMfhAEsCEe6y5MH2fOa4fg":
									$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteOEV90.txt", function( data ) {
										document.getElementById("myDropdownKonzept").innerHTML = data;
									});
								//GMF120
								case "https://jazz.dnet.lan/rm/rm-projects/_RWErYF6YEe6vUqYK6ozE4w/components/_RfQckF6YEe6vUqYK6ozE4w":
									$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteGMF120.txt", function( data ) {
										document.getElementById("myDropdownKonzept").innerHTML = data;
									});
								//OPV80
								case "https://jazz.dnet.lan/rm/rm-projects/_3pKoYGK1Ee6vUqYK6ozE4w/components/_3sV4MGK1Ee6vUqYK6ozE4w":
									$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteOPV80.txt", function( data ) {
										document.getElementById("myDropdownKonzept").innerHTML = data;
									});
								break;
							}

							
						break;

						case "VergleichsLB":

							widgetsEinblenden(["RefLbMerken"]);

						break;

						case "UserStories":
							widgetsEinblenden(["userStoryInIstLB", "intBgVerlinken", "dropdownBgVerlinkungBAs", "testWidget"]);
						break;

						default:
							widgetsEinblenden([]);
						break;
					}
				break;
					//Abfrage ob SRV 65
				case "https://jazz.dnet.lan/rm/rm-projects/_mA58IJXsEe2AX7GeHYLYsw/components/_mUx6YJXsEe2AX7GeHYLYsw":
					document.getElementById("dropdownBgVerlinkungBAs").classList.remove("invisible");
					switch(opResAttributes.data[0].values[RM.Data.Attributes.ARTIFACT_TYPE].name){
						case "Konzept":
							widgetsEinblenden(["intBgVerlinken", "dropdownBgVerlinkungBAs","afoBezugAktualisieren","AnforderungAbleitenInBauspecAusKonzept"]);
						break;
						case "Band Bauspec":	
							let currentuser = "";
							let promiseCurrentuser = new Promise(function(res,rej){
								RM.Data.getCurrentUser(function(result) {
									if (result.code === RM.OperationResult.OPERATION_OK) {
										res(result.data.userId);
									} else {
										rej();
									}
								});
							});
	
							currentuser = await promiseCurrentuser;
							if(currentuser == "lennard.kienzler" || currentuser == "sebastian.damm" || currentuser == "robert.burmeister" || currentuser == "timo.doergeloh" || currentuser == "thomas.olerich"){
								widgetsEinblenden(["ÜberschriftInBauspec","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","AnfAusAltprojektUebernehmen","afoBezugAktualisierenUndLvLöschen","beistellOption"]);
							}else{
									widgetsEinblenden(["ÜberschriftInBauspec","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen"]);
							}
						break;
	
						case "Interne Anforderungen":
							widgetsEinblenden(["ÜberschriftInBauspec","AnfInBauspecUebertragen","intAbleiten","intBgVerlinken", "dropdownBgVerlinkungBAs","AnfAusAltprojektUebernehmen"]);
						break;
	
						case "Kundenanforderungen":
							//Das Widget "Anf in Bauspec übertragen" für Kundenanforderung anpassen:
							document.getElementById("textAnfInBauspecUebertragen").innerHTML = "<b>[W3]</b> Markierte Kundenanforderung...";
							document.getElementById("btnAnfInBauspecAbleiten").innerText = "...direkt in Bauspec beantworten";
							//document.getElementById("btnAnfInBauspecAbleiten").classList.add("invisible");
							console.log("debug");
							widgetsEinblenden(["intZusammenfassen","ÜberschriftInBauspec", "inKonzeptAbleiten","AnfInBauspecUebertragen", "intBgVerlinken", "dropdownBgVerlinkungBAs","intAbleiten","VerfeinerteIstLbAbleiten"]);
							$.get( "BedienerhilfenWidget/BedienerhilfenUnterprogramme/Subfunctions/DropdownKonzepteSRV65.txt", function( data ) {
								document.getElementById("myDropdownKonzept").innerHTML = data;
							});
						break;
	
						default:
							widgetsEinblenden([]);
						break;
					}
				break;
				default:
					document.getElementById("dropdownBgVerlinkungBAs").classList.add("invisible");
					switch(opResAttributes.data[0].values[RM.Data.Attributes.ARTIFACT_TYPE].name){
						case "Konzept":
							widgetsEinblenden(["intAbleiten","intBgVerlinken","aenderungen","textAnfInBauspecUebertragen","afoBezugAktualisierenUndLvLöschen"]);
						break;

						case "Band Bauspec":	
							if(urlComponent == "https://jazz.dnet.lan/rm/rm-projects/_KRK58JeQEeupW5W8IOZKvw/components/_LGEhoJeQEeupW5W8IOZKvw"){
								let currentuser = "";
								let promiseCurrentuser = new Promise(function(res,rej){
									RM.Data.getCurrentUser(function(result) {
										if (result.code === RM.OperationResult.OPERATION_OK) {
											res(result.data.userId);
										} else {
											rej();
										}
									});
								});
								currentuser = await promiseCurrentuser;
								if(currentuser == "lennard.kienzler" || currentuser == "sebastian.damm" || currentuser == "robert.burmeister" || currentuser == "timo.doergeloh" || currentuser == "thomas.olerich"){
									widgetsEinblenden(["ÜberschriftInBauspec","fuerUebernahmeInTazvVormerken","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","AnfAusAltprojektUebernehmen","afoBezugAktualisierenUndLvLöschen","beistellOption"]);
								}
								else{
									widgetsEinblenden(["ÜberschriftInBauspec","fuerUebernahmeInTazvVormerken","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","AnfAusAltprojektUebernehmen","afoBezugAktualisierenUndLvLöschen"]);
								}
							}else{
								widgetsEinblenden(["ÜberschriftInBauspec","fuerUebernahmeInTazvVormerken","AnforderungAbleitenInBauspec","ursprungsforderungenZusammenfassen","AnfAusAltprojektUebernehmen","afoBezugAktualisieren","getBlockname"]);
							}
						break;

						case "Interne Anforderungen":
							widgetsEinblenden(["ÜberschriftInBauspec","AnfInBauspecUebertragen","fuerUebernahmeInTazvVormerken","intAbleiten","intBgVerlinken","AnfAusAltprojektUebernehmen"]);
						break;

						case "Basis TAzV":
							widgetsEinblenden(["AnfInTazvVerfeinern","AnfinTazvUebernehmen"]);
						break;

						case "System TAzV":
							widgetsEinblenden(["AnfInTazvVerfeinern","AnfinTazvUebernehmen"]);
						break;

						case "Kundenanforderungen":
							//Das Widget "Anf in Bauspec übertragen" für Kundenanforderung anpassen:
							document.getElementById("textAnfInBauspecUebertragen").innerHTML = "<b>[W3]</b> Markierte Kundenanforderung...";
							document.getElementById("btnAnfInBauspecAbleiten").innerText = "...direkt in Bauspec beantworten";
							//document.getElementById("btnAnfInBauspecAbleiten").classList.add("invisible");
							widgetsEinblenden(["ÜberschriftInBauspec", "AnfInBauspecUebertragen","fuerUebernahmeInTazvVormerken", "intBgVerlinken","AnfAusAltprojektUebernehmen", "intAbleiten"/*,"aendAnf"*/]);
						break;

						default:
							widgetsEinblenden([]);
						break;
					}
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
