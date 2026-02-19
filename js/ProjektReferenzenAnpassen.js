var komponenteDesLetztGeoeffnetenArt = "";
var alleBgUri = new Object(); 
function projektReferenzenAnpassen(refNeuGeoeffnet){

	if(refNeuGeoeffnet.componentUri != komponenteDesLetztGeoeffnetenArt){
		komponenteDesLetztGeoeffnetenArt = refNeuGeoeffnet.componentUri;



		switch(refNeuGeoeffnet.componentUri){

			//Referenzen setzen, falls das geöffnete Projekt MBV707 ist:
			case "https://jazz.dnet.lan/rm/rm-projects/_mlXacMOlEeuRSvYS2KB3cA/components/_mp_bwMOlEeuRSvYS2KB3cA":
				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_mlXacMOlEeuRSvYS2KB3cA/components/_mp_bwMOlEeuRSvYS2KB3cA";
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_mp_byMOlEeuRSvYS2KB3cA";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_wejfQcUoEeuRSvYS2KB3cA";
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_xccbwTLBEeyRSvYS2KB3cA", "https://jazz.dnet.lan/rm/rm-projects/_mlXacMOlEeuRSvYS2KB3cA/components/_mp_bwMOlEeuRSvYS2KB3cA", "", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/BI_CbaNwDMDEeyRSvYS2KB3cA", "https://jazz.dnet.lan/rm/rm-projects/_mlXacMOlEeuRSvYS2KB3cA/components/_mp_bwMOlEeuRSvYS2KB3cA", "https://jazz.dnet.lan/rm/resources/MD_xccbwTLBEeyRSvYS2KB3cA", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_mlXacMOlEeuRSvYS2KB3cA/components/_mp_bwMOlEeuRSvYS2KB3cA");

			break;


			//Referenzen setzen, falls das geöffnete Projekt MBV707 Spielschiff ist:
			case "https://jazz.dnet.lan/rm/rm-projects/__JlkwEkIEeyRSvYS2KB3cA/components/__NmiEEkIEeyRSvYS2KB3cA":
				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/__JlkwEkIEeyRSvYS2KB3cA/components/__NmiEEkIEeyRSvYS2KB3cA";	
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/__NmiGEkIEeyRSvYS2KB3cA";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_IrD7HkkJEeyRSvYS2KB3cA";
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_IrD7K0kJEeyRSvYS2KB3cA", "https://jazz.dnet.lan/rm/rm-projects/__JlkwEkIEeyRSvYS2KB3cA/components/__NmiEEkIEeyRSvYS2KB3cA", "", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/BI_JeKzEkkJEeyRSvYS2KB3cA", "https://jazz.dnet.lan/rm/rm-projects/__JlkwEkIEeyRSvYS2KB3cA/components/__NmiEEkIEeyRSvYS2KB3cA", "https://jazz.dnet.lan/rm/resources/MD_IrD7K0kJEeyRSvYS2KB3cA", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/__JlkwEkIEeyRSvYS2KB3cA/components/__NmiEEkIEeyRSvYS2KB3cA");

			break;


			//Referenzen setzen, falls das geöffnete Projekt die Entwurfsphase FD424 ist:
			case "https://jazz.dnet.lan/rm/rm-projects/_KRK58JeQEeupW5W8IOZKvw/components/_LGEhoJeQEeupW5W8IOZKvw":

				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_KRK58JeQEeupW5W8IOZKvw/components/_LGEhoJeQEeupW5W8IOZKvw";
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_LGXclpeQEeupW5W8IOZKvw";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_jKWvLJeSEeupW5W8IOZKvw";
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_jKWvIZeSEeupW5W8IOZKvw", "https://jazz.dnet.lan/rm/rm-projects/_KRK58JeQEeupW5W8IOZKvw/components/_LGEhoJeQEeupW5W8IOZKvw", "", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/BI_lIa-WZeSEeupW5W8IOZKvw", "https://jazz.dnet.lan/rm/rm-projects/_KRK58JeQEeupW5W8IOZKvw/components/_LGEhoJeQEeupW5W8IOZKvw", "https://jazz.dnet.lan/rm/resources/MD_jKWvIZeSEeupW5W8IOZKvw", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_KRK58JeQEeupW5W8IOZKvw/components/_LGEhoJeQEeupW5W8IOZKvw");

			break;
			
			//Referenzen setzen, falls das geöffnete Projekt die Studie FD 424 ist:
			case  "https://jazz.dnet.lan/rm/rm-projects/_leTu4KwDEeupW5W8IOZKvw/components/_lji0MKwDEeupW5W8IOZKvw":

				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_leTu4KwDEeupW5W8IOZKvw/components/_lji0MKwDEeupW5W8IOZKvw";
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_lji0OKwDEeupW5W8IOZKvw";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_YQDTsethEemqloz-jI4Q3Q";
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_S-mzdDhpEeqT29naKiuUVA", "https://jazz.dnet.lan/rm/rm-projects/_XAqTsNhuEemllfJXG060HA/components/_X2TiQNhuEemllfJXG060HA", "", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module")
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/BI_DVSJoVr6EeuuYMdwRuVZvA","https://jazz.dnet.lan/rm/rm-projects/_XAqTsNhuEemllfJXG060HA/components/_X2TiQNhuEemllfJXG060HA","https://jazz.dnet.lan/rm/resources/MD_S-mzdDhpEeqT29naKiuUVA", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_XAqTsNhuEemllfJXG060HA/components/_X2TiQNhuEemllfJXG060HA");
			break;	
	
			//Referenzen setzen, falls das geöffnete Projekt MMPV ist:
			case  "https://jazz.dnet.lan/rm/rm-projects/_YZYPwFpQEeuuYMdwRuVZvA/components/_YgPFsFpQEeuuYMdwRuVZvA":

				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_YZYPwFpQEeuuYMdwRuVZvA/components/_YgPFsFpQEeuuYMdwRuVZvA";
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_Yg-sllpQEeuuYMdwRuVZvA";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_19DSklpcEeuuYMdwRuVZvA"
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_osdGYVylEeuuYMdwRuVZvA","https://jazz.dnet.lan/rm/rm-projects/_YZYPwFpQEeuuYMdwRuVZvA/components/_YgPFsFpQEeuuYMdwRuVZvA","", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/BI_2uxxoFylEeuuYMdwRuVZvA","https://jazz.dnet.lan/rm/rm-projects/_YZYPwFpQEeuuYMdwRuVZvA/components/_YgPFsFpQEeuuYMdwRuVZvA","https://jazz.dnet.lan/rm/resources/MD_osdGYVylEeuuYMdwRuVZvA", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_YZYPwFpQEeuuYMdwRuVZvA/components/_YgPFsFpQEeuuYMdwRuVZvA");	
			break;

			//Referenzen setzen, falls das geöffnete Projekt das Schulschiff ist:
			case "https://jazz.dnet.lan/rm/rm-projects/_GoohYKvmEeupW5W8IOZKvw/components/_GuJTgKvmEeupW5W8IOZKvw":
				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_GoohYKvmEeupW5W8IOZKvw/components/_GuJTgKvmEeupW5W8IOZKvw";
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_GuJTiKvmEeupW5W8IOZKvw";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/CO_oLGgkqvoEeupW5W8IOZKvw"
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_oJdh06voEeupW5W8IOZKvw","https://jazz.dnet.lan/rm/rm-projects/_GoohYKvmEeupW5W8IOZKvw/components/_YgPFsFpQEeuuYMdwRuVZvA","", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_oJdh06voEeupW5W8IOZKvw","https://jazz.dnet.lan/rm/rm-projects/_GoohYKvmEeupW5W8IOZKvw/components/_YgPFsFpQEeuuYMdwRuVZvA","https://jazz.dnet.lan/rm/resources/MD_oJdh06voEeupW5W8IOZKvw", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_GoohYKvmEeupW5W8IOZKvw/components/_GuJTgKvmEeupW5W8IOZKvw");
			break;

			//Referenzen setzen, falls das geöffnete Projekt das Timos Flugfahrschiff ist:
			case "https://jazz.dnet.lan/rm/rm-projects/_NNzEgLV0EeykHdUVm4h3Pw/components/_NTnYoLV0EeykHdUVm4h3Pw": //neu
				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_NNzEgLV0EeykHdUVm4h3Pw/components/_NTnYoLV0EeykHdUVm4h3Pw"; //neu
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_NTwilrV0EeykHdUVm4h3Pw"; //neu
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_O0b-L7v2EeykHdUVm4h3Pw"
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_OEKg97u4EeykHdUVm4h3Pw","https://jazz.dnet.lan/rm/rm-projects/_NNzEgLV0EeykHdUVm4h3Pw/components/_NTnYoLV0EeykHdUVm4h3Pw","", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_oJdh06voEeupW5W8IOZKvw","https://jazz.dnet.lan/rm/rm-projects/_NNzEgLV0EeykHdUVm4h3Pw/components/_NTnYoLV0EeykHdUVm4h3Pw","https://jazz.dnet.lan/rm/resources/MD_OEKg97u4EeykHdUVm4h3Pw", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_NNzEgLV0EeykHdUVm4h3Pw/components/_NTnYoLV0EeykHdUVm4h3Pw");
			break;

			//Referenzen setzen, falls das geöffnete Projekt Beispielprojekt MBSE-Prozessentwicklung ist:
			case  "https://jazz.dnet.lan/rm/rm-projects/_K8794JrVEeyfnazYjFzx3Q/components/_LJwR4JrVEeyfnazYjFzx3Q":

				urlComponent = "https://jazz.dnet.lan/rm/rm-projects/_K8794JrVEeyfnazYjFzx3Q/components/_LJwR4JrVEeyfnazYjFzx3Q";
				uriKonfiKontext = "https://jazz.dnet.lan/rm/cm/stream/_LJ6C5prVEeyfnazYjFzx3Q";
				modulBgUrl="https://jazz.dnet.lan/rm/resources/MD_eqoRQJrVEeyfnazYjFzx3Q"
				modulInterneAnforderungen = new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/MD_eqoRP5rVEeyfnazYjFzx3Q","https://jazz.dnet.lan/rm/rm-projects/_K8794JrVEeyfnazYjFzx3Q/components/_LJwR4JrVEeyfnazYjFzx3Q","", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Module");
				ersteAnfInterneAnforderungen =  new RM.ArtifactRef("https://jazz.dnet.lan/rm/resources/BI_jLtPXprVEeyfnazYjFzx3Q","https://jazz.dnet.lan/rm/rm-projects/_K8794JrVEeyfnazYjFzx3Q/components/_LJwR4JrVEeyfnazYjFzx3Q","https://jazz.dnet.lan/rm/resources/MD_eqoRP5rVEeyfnazYjFzx3Q", "http://www.ibm.com/xmlns/rdm/types/ArtifactFormats#Text");
				baugruppenNummerLaden("https://jazz.dnet.lan/rm/rm-projects/_K8794JrVEeyfnazYjFzx3Q/components/_LJwR4JrVEeyfnazYjFzx3Q");	

			break;


			//Ausgabe, wenn das geöffnete Projekt noch nicht im Widget implementiert ist:
			default:
				alert('Dat geöffnete Projekt kennt keine Sau. Bitte an ZKKS wenden!');

			break;

		}
	}
	//RefObjekt für MBgV erzeugen:
	refBgV =  new RM.ArtifactRef(modulBgUrl, modulInterneAnforderungen.componentUri,"", modulInterneAnforderungen.format);
}
