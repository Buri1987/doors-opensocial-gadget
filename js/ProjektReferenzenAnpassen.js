var komponenteDesLetztGeoeffnetenArt = "";
var alleBgUri = new Object(); 
function projektReferenzenAnpassen(refNeuGeoeffnet){

	if(refNeuGeoeffnet.componentUri != komponenteDesLetztGeoeffnetenArt){
		komponenteDesLetztGeoeffnetenArt = refNeuGeoeffnet.componentUri;



		switch(refNeuGeoeffnet.componentUri){



			//Referenzen setzen, falls das geöffnete Projekt Beispielprojekt MBSE-Prozessentwicklung ist:
			case  "https://auewsv.elmcloud.de/rm/rm-projects/_wv9jMO6rEe-YW9HoRy0Nmw/components/_wypq0O6rEe-YW9HoRy0Nmw":

				urlComponent = "https://auewsv.elmcloud.de/rm/rm-projects/_wv9jMO6rEe-YW9HoRy0Nmw/components/_wypq0O6rEe-YW9HoRy0Nmw";
				uriKonfiKontext = "https://auewsv.elmcloud.de/rm/cm/stream/_wyw_lu6rEe-YW9HoRy0Nmw";
				modulBgUrl="https://auewsv.elmcloud.de/rm/resources/MD_vtuCgBDDEfGDdaqHsaPgYg";
				modulInterneAnforderungen = new RM.ArtifactRef("https://auewsv.elmcloud.de/rm/resources/MD_KAL4ERfHEfGOZdEZ4efH3w",urlComponent,"", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://auewsv.elmcloud.de/rm/resources/BI_QvjTEBfHEfGOZdEZ4efH3w",urlComponent,"https://auewsv.elmcloud.de/rm/resources/MD_KAL4ERfHEfGOZdEZ4efH3w", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://auewsv.elmcloud.de/rm/resources/MD_vtuCgBDDEfGDdaqHsaPgYg");	

			break;


			//Ausgabe, wenn das geöffnete Projekt noch nicht im Widget implementiert ist:
			default:
				alert('Dat geöffnete Projekt kennt keine Sau. Bitte an ZKKS wenden!');

			break;

		}
	}
	//RefObjekt für MBgV erzeugen:
	refBgV =  new RM.ArtifactRef(modulBgUrl,urlComponent,"", modulInterneAnforderungen.format);
}
