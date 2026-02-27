function bgVerlinken(){
	let baugruppenname;
	document.getElementById("bgVerlinken").disabled = true;
	
	if(alleBgUri[document.getElementById("inputBG").value.toUpperCase()]){
		let refBg = new RM.ArtifactRef(alleBgUri[document.getElementById("inputBG").value.toUpperCase()], modulInterneAnforderungen.componentUri, modulBgUrl, ersteAnfInterneAnforderungen.format);
		RM.Data.getAttributes(refBg , function(allAtt){
			baugruppenname = allAtt.data[0].values[RM.Data.Attributes.NAME];

			currentSelection.forEach(function(anf, index){
				RM.Data.createLink(anf, 'Zugeordnete Baugruppen', refBg, function(link){	
					if(index == currentSelection.length -1 ){
						alert('Verlinkungen mit der BG: "' + baugruppenname + '" wurden erstellt:' );
					}
				});
			});
		});
	}
	else{
		detailfelderLeeren();
		document.getElementById("inputBG").focus();
		alert("Die eingetragene Baugruppe konnte nicht gefunden werden. Bitte geben Sie eine gültige Baugruppennummer ein!");

	}
	document.getElementById("bgVerlinken").disabled = false;

	

}