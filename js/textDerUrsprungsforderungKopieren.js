function textDerUrsprungsforderungKopieren(){
	
		
	//durch alle selktierten parallel iterieren
	currentSelection.forEach(function(textInSpec, index){
		RM.Data.getLinkedArtifacts(textInSpec, "setzt um", function(opResLinkTypeDef){
    			RM.Data.getAttributes(opResLinkTypeDef.data.artifactLinks[0].targets[0], RM.Data.Attributes.PRIMARY_TEXT, function(opResAttrUrsprungsFord){
				RM.Data.getAttributes(textInSpec, RM.Data.Attributes.PRIMARY_TEXT, function(opResAttrTextInSpec){
					opResAttrTextInSpec.data[0].values[RM.Data.Attributes.PRIMARY_TEXT] = opResAttrUrsprungsFord.data[0].values[RM.Data.Attributes.PRIMARY_TEXT];
					RM.Data.setAttributes(opResAttrTextInSpec.data[0], function(){});
				});
			});
		});
	});

	//mit setzt um verlinkte Artefakte laden

	//text kopieren
}