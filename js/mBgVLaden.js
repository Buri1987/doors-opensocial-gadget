//Modulinhalt des MBgrVerzeichnis laden:
async function mBgVLaden(){
	if(typeof inhaltMBgV === "undefined" ){
		let promiseInhaltMBgV = new Promise(function(resolve, reject){                  
			RM.Data.getContentsStructure(refBgV, ["Baugruppennummer",RM.Data.Attributes.NAME], function(res){
				resolve(res.data);
			});
		});	
		inhaltMBgV = await promiseInhaltMBgV;
	}
}