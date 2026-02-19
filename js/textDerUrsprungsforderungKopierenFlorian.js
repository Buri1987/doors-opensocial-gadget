function textDerUrsprungsforderungKopierenFlorian(){
	
	currentSelection.forEach(function(textInVorlage, index){	

		RM.Data.getAttributes(textInVorlage, RM.Data.Attributes.PRIMARY_TEXT, function(opResAttrTextInSpec){
					opResAttrTextInSpec.data[0].values["Text für Lösungsvorschlag"] = $(opResAttrTextInSpec.data[0].values[RM.Data.Attributes.PRIMARY_TEXT]).text();
					RM.Data.setAttributes(opResAttrTextInSpec.data[0], function(){});

					});
				});

}	