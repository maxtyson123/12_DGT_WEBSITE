function startMweb() {
    console.log(".");
    console.log(".");
    console.log(".");
    console.log(".");
    console.log(".");
    console.log(".");
    console.log("Hello, World! This is v2.0 of mweb");
    console.log(".");
    console.log(".");
    console.log("Getting json...");
    console.log("============");
    var mwebContainer = document.getElementById("mweb");
    if (mwebContainer === null) {
        throw new Error("Mweb Container not found");
    }
    mwebJson = mwebContainer.getAttribute('data-json_location');
    if (mwebJson === null) {
        throw new Error("Json location not found");
    }
    console.log("Json source = " + mwebJson);
    fetch(mwebJson)
        .then(jsonData => jsonData.json())
        .then(data => compileMweb(data))
    let compileMweb = (data) => {
        console.log('Data from json', data)
        console.log("============");
        var ids = [];
        console.log("Getting mweb ids...");
        var children = document.getElementById("mweb").children; //get container element children.
        for (var i = 0, len = children.length; i < len; i++) {
            children[i].className = 'new-class'; //change child class name.
            ids.push(children[i].id); //get child id.
        }
        console.log("Found these ids: " + ids);
        console.log("============");
        console.log("Compiling with ids...");

        for (let i = 0; i < ids.length; i++) { // for every id
            const htmlcode = [];
            for (let x = 0; x < data.length; x++) {
                if (ids[i] == data[x].aspect) {
                    console.log("Div: " + ids[i] + " == Aspect: " + data[x].aspect);
                    for (let y = 0; y < data[x].code.length; y++) {
                        var newCode = data[x].code[y]
                        for (let z = 0; z < data[x].varibles.length; z++) {
                            var currentMwebElement = document.getElementById(ids[i]);
                            var varibleData = currentMwebElement.getAttribute('data-varibles');
                            var varibles = varibleData.split("&");
                            varibles.shift();
                            if (newCode == data[x].varibles[z]) {
                                newCode = varibles[z];
                            }

                        }
                        console.log(" " + ids[i] + "(code) = " + newCode);
                        htmlcode.push(newCode)
                    }
                }
            }
            if (i == ids.length) {
                htmlcode.push("<!-- MWEB 2.0 BY MAX TYSON -->")
                htmlcode.push("<!-- MWEB 2.0 AT http://mweb.maxinc.cf/ -->")
            }
            document.getElementById(ids[i]).innerHTML = htmlcode.join(" ");
        }


    }


}