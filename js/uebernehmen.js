var erzeugteAnf = new Object();
var uebernommeneAnf = 0;

async function uebernehmen(ausschnittBeziehungsgeflecht, refsAnfDieUmgesetztWird){
	//Angabe nach welchem Artefakt das neue Artefakt erzeugt werden soll: 
	let strategyIntAnf;			
	

	
	// alle im Altprojekt selektierten Anforderungen parallel durchlaufen:
	//beziehungsgeflechtAltprojekt["umsetzende Anforderungen"].forEach(async function(anf, index){
	for(let i=0; i<ausschnittBeziehungsgeflecht.length; i++){
		let neuErzeugteKopieDerBetrachtetenAnf;	
		let attrs = new RM.AttributeValues();
		
		attrs["Verantwortlich"] = verantwortlichkeitUebersetzen(ausschnittBeziehungsgeflecht[i]["attribute"].values["Verantwortlich"]); 			//Verantwortlichkeit setzen und gegeben Falls uebersetzen
		attrs[RM.Data.Attributes.ARTIFACT_TYPE] = ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.ARTIFACT_TYPE].name;
		attrs[RM.Data.Attributes.PRIMARY_TEXT] = ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.PRIMARY_TEXT].replace(/<a\s*href="[^>]*>/g, "").replace(/<\/a>/g, "").replace(/\s*id="[^"]*"/g, "");
		attrs["ID Altprojekt"] = ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.IDENTIFIER];

		uebernommeneAnf++;
		document.getElementById("spanAnzUebernommeneAnf").innerText = uebernommeneAnf  +" von " + beziehungsgeflechtAltprojekt["anzAnf"]+ " Anforderungen übernommen";

		//Prüfen ob die Anforderung schon erstellt wurde:
		if(erzeugteAnf[ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.IDENTIFIER]]){
			//link zwi´schen elternelement und Kind setzen:
			refsAnfDieUmgesetztWird.forEach(function(ref, index){
				RM.Data.createLink(ref, 'umgesetzt von',erzeugteAnf[ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.IDENTIFIER]] , function(link){
			
								
				});
			});
		}
		else{
			switch (ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.ARTIFACT_TYPE].name) {
  				case "Interne Anforderung":
		
			
					//Angabe nach welchem Artefakt das neue Artefakt erzeugt werden soll: 
					strategyIntAnf = new RM.LocationSpecification(ersteAnfInterneAnforderungen, RM.Data.PlacementStrategy.BEFORE);		
			
					let promiseArtErzeugen = new Promise(async  function(resolve, reject){
						RM.Data.Module.createArtifact(attrs, strategyIntAnf, function(result) {
							if (result.code === RM.OperationResult.OPERATION_OK) {
								erzeugteAnf[ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.IDENTIFIER]] =result.data;
								neuErzeugteKopieDerBetrachtetenAnf = result.data;
								refsAnfDieUmgesetztWird.forEach(function(ref, index){
									//link zwi´schen elternelement und Kind setzen:
									RM.Data.createLink(ref, 'umgesetzt von', result.data, function(link){
										resolve();
							
						
									});	
								});
								
								//Denn Link zu Baugruppe erzeugen:
						
								ausschnittBeziehungsgeflecht[i]["baugruppennummer"].forEach(function(bgNummern, index){
									let refBg = new RM.ArtifactRef(alleBgUri[bgNummern.values["Baugruppennummer"]], modulInterneAnforderungen.componentUri, modulBgUrl, ersteAnfInterneAnforderungen.format);
									RM.Data.createLink( result.data, 'Zugeordnete Baugruppen',refBg , function(link){
										console.log(link);
						

									});
							
								});
							}
							else{
								reject();
							}
						});
					});

					await promiseArtErzeugen;
	
		
				break;	

  				case "Text in Spec":
								
					//Der Baugruppennummer entsprechende Überschrift in der Bauspec finden/erstellen:
					let refUeberschriftInSpec = await ueberschriftZuBgFindenBzwAnlegen(ausschnittBeziehungsgeflecht[i]["baugruppennummer"][0].values["Baugruppennummer"]);

					//Angabe nach welchem Artefakt das neue Artefakt erzeugt werden soll: 
					strategyIntAnf = new RM.LocationSpecification(refUeberschriftInSpec, RM.Data.PlacementStrategy.BELOW);	

					let promiseArtErzeugen2 = new Promise(async  function(resolve, reject){
						RM.Data.Module.createArtifact(attrs, strategyIntAnf, function(result) {
							if (result.code === RM.OperationResult.OPERATION_OK) {
								erzeugteAnf[ausschnittBeziehungsgeflecht[i]["attribute"].values[RM.Data.Attributes.IDENTIFIER]] =result.data;
								neuErzeugteKopieDerBetrachtetenAnf = result.data;
								refsAnfDieUmgesetztWird.forEach(function(ref, index){
									//link zwischen elternelement und Kind setzen:
									RM.Data.createLink(ref, 'umgesetzt von', result.data, function(link){
										resolve();
									});	
								});
							}
						});
					});
					await promiseArtErzeugen2;
				break;	
	
				default:
   	
 					neuErzeugteKopieDerBetrachtetenAnf = currentSelection[0];
				break;
			}
		} 


		//Auch die umsetzenden Anforderungen der betrachteten Anforderung übernehmen:
		if(ausschnittBeziehungsgeflecht[i]["umsetzende Anforderungen"]){

			let betrachteteAnforderung = [];
			betrachteteAnforderung[0] = neuErzeugteKopieDerBetrachtetenAnf;	//(muss als Array mit einem Element abgespeichert werden, damit es dem Interface dieser rekursiven Funktion entspricht)
			await uebernehmen(ausschnittBeziehungsgeflecht[i]["umsetzende Anforderungen"], betrachteteAnforderung);
		}
	}
}