/* When the user clicks on the button of the Änderungswidget
toggle between hiding and showing the dropdown content */
function myFunction(statusImAna) {
	if(statusImAna == 1){
		document.getElementById("myDropdown").classList.toggle("show");
	}
	else if(statusImAna == 2){
		document.getElementById("myDropdown2").classList.toggle("show");
	}
  //document.getElementById("myDropdown").classList.toggle("show");

}



	// Close the dropdown menu for the Änderungswidget if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

	/*Übernahme des ausgewählten Werts des Dropdown Buttons und ändern der Anzeige zu dem ausgewählten Wert.
	Weiterhin wird abhängig von dem ausgewählten Werts des Dropdown Buttons die Funktion aenderungsManagementWidgetAktualisieren mit dem zugehörigen
	Übergabeparameter aufgerufen. So kann der Bearbeitungsfortschritt angepasst werden.*/
	function auswahl(fall, statusImAna){
		if(statusImAna == 1){
			document.getElementById('btnFall1').innerText= fall;
			switch(fall){
				case "Bitte wählen!!!":
					aenderungsManagementWidgetAktualisieren(statusImpaktAnalyse.nochNichtDurchgefuehrt)
					break;
				case "Ja":
					aenderungsManagementWidgetAktualisieren(statusImpaktAnalyse.AenderungNotwendig)
					break;
				case "Nein":
					aenderungsManagementWidgetAktualisieren(statusImpaktAnalyse.keineAenderungNotwendig)
					break;
				default:
					alert("Fehler!  Bitte bei ZKKS melden.");
					break;

			}
		}
		else if(statusImAna == 2){
			document.getElementById('btnFall2').innerText= fall;
			switch(fall){
				case "Bitte wählen!!!":
					aenderungsManagementWidgetAktualisieren(statusImpaktAnalyse.AenderungNotwendig)
					break;
				case "Ja":
					aenderungsManagementWidgetAktualisieren(statusImpaktAnalyse.AenderungDurchgeführt)
					break;
				case "Nein":
					aenderungsManagementWidgetAktualisieren(statusImpaktAnalyse.AenderungNotwendig)
					break;
				default:
					alert("Fehler!  Bitte bei ZKKS melden.");
					break;

			}
		}
	}


	//Funktion um das Widget ÄM darzustellen:
	const statusImpaktAnalyse = {
	nochNichtDurchgefuehrt: 1,
	keineAenderungNotwendig: 2,
	AenderungNotwendig: 3,
	/*AenderungNochNichtDurchgefuehrt: 4,*/ //Status wird nicht verwendet
	/*AenderungDurchgeführt: 5*/
	AenderungDurchgeführt: 4
    };