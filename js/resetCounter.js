    /**
     * 
     * 
     **/
    function resetCounter() {
        if (typeof(Storage) !== "undefined") {
            if (sessionStorage.clickcount > 1){
                sessionStorage.clickcount = 0;
                document.getElementById("result").innerHTML = "Your counter was reset to " + sessionStorage.clickcount + " time(s) in this session.";
            }
        }
    }
