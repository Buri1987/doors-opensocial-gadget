async function beziehungsgflechtUebertragen(aktuellBetrachteteAnforderung, ebene){
	for(let n = 0; n<aktuellBetrachteteAnforderung["umsetzende Anforderungen"].length;n++){	
		console.log(ebene +"."+n+ ":  "+ aktuellBetrachteteAnforderung["umsetzende Anforderungen"][n]["attribute"].values[RM.Data.Attributes.IDENTIFIER]);
		if(typeof aktuellBetrachteteAnforderung["umsetzende Anforderungen"][n]["umsetzende Anforderungen"] === "undefined" ){

		}
		else{
			await beziehungsgflechtUebertragen(beziehungsgeflechtAltprojekt["umsetzende Anforderungen"][n], ebene+1);
		}
	}
}