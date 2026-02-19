//Da die Verantortlichkeiten nicht in allen Projekten gleich heißen müssen diese gemappt werden. Bsp: In der FD424-Studie gabe es den Fako "E-Technik & Waffensysteme". In der Auschreibung gibt es einen Fako "E-Technik" und einen Fako "Waffensysteme":
function verantwortlichkeitUebersetzen(verantwortlichkeit){
	switch(verantwortlichkeit){
		case "E-Technik & Waffensysteme":
			verantwortlichkeit = "E-Technik";
		break;
	}
	return verantwortlichkeit;
}