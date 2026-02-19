//Anforderung aus Altprojekt übernehmen:
var hinzugefuegteAnf = 0;
async function beziehungsgeflechtAuslesen(refs, betrachteteAnf){

	//Fako ermitteln:
	let promiseGetAttr = new Promise(function(resolve, reject){
		RM.Data.getAttributes(refs, ["Verantwortlich", RM.Data.Attributes.ARTIFACT_TYPE, RM.Data.Attributes.PRIMARY_TEXT, RM.Data.Attributes.IDENTIFIER], function(res){
			let attrRichtigeReihenfolge = [];
			for(let i = 0; i<refs.length; i++){
				attrRichtigeReihenfolge[i] = res.data.find(item=>item.ref.uri == refs[i].uri);
			}
			resolve(attrRichtigeReihenfolge);
		});
	});

	//Baugruppen und Kinder (umgesetzt von) ermitteln:

	let links;
	let linksBg=[];
	let linksUm=[];
	let bgNr = [];
	for(let n = 0; n<refs.length;n++){
		let promiseGetLinks1 = new Promise(function(resolve, reject){
			RM.Data.getLinkedArtifacts(refs[n], ["umgesetzt von", "Zugeordnete Baugruppen"] , function(res){
				resolve(res.data);
			});
		});		
		links = await promiseGetLinks1;
		linksBg[n] = links.artifactLinks.find((element) => element.linktype == "Zugeordnete Baugruppen");
		linksUm[n] = links.artifactLinks.find((element) => element.linktype == "umgesetzt von");				

		if(typeof linksBg[n] === "undefined" ){
			
		}
		else{
			let promiseGetBgNr = new Promise(function(resolve, reject){
				RM.Data.getAttributes(linksBg[n].targets , "Baugruppennummer",function(res){
					resolve(res.data);
				});
			});
			bgNr[n] = await promiseGetBgNr ;
		}


		
	}

	let attr= await promiseGetAttr;

	//Objekt zusammenbauen:
	betrachteteAnf["umsetzende Anforderungen"]=[];
	for(let n = 0; n<refs.length;n++){
		
		betrachteteAnf["umsetzende Anforderungen"][n] = new Object();
		hinzugefuegteAnf++;
		betrachteteAnf["umsetzende Anforderungen"][n]["attribute"] =  attr[n];

		//Die Baugruppennummern eintragen, falls es keine gibt (zB bei TextInSpec) dann die der übergeordneten Anf übernehmen:
		if(bgNr[n]){

			betrachteteAnf["umsetzende Anforderungen"][n]["baugruppennummer"] = bgNr[n];
		}
		else{
			if(betrachteteAnf["baugruppennummer"].length >0){
				betrachteteAnf["umsetzende Anforderungen"][n]["baugruppennummer"] = betrachteteAnf["baugruppennummer"];
			}
			else{
				alert("Bei den ausgewählten Anforderungen fehlen Verlinkungen zu den Baugruppen");
			}
			
		}

		//Fall Unterscheiden (Anforderung hat wiederum Anforderungen, die auf Grundlage der betrachteten Anforderung abgeleitet wurden)
		if(typeof linksUm[n] === "undefined" ){
			
		}
		else{
			await beziehungsgeflechtAuslesen(linksUm[n].targets, betrachteteAnf["umsetzende Anforderungen"][n])			
		}
	}
	return betrachteteAnf;
}