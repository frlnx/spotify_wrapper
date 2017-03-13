$(document).ready(function() {
    var results = document.getElementById("results"),
        inputbox = document.getElementById("formGroupInputLarge"),
        counter = document.getElementById("counter"),
        qtype_dropdown = document.getElementById("qtype_dropdown"),
        qtype_selected = document.getElementById("qtype_selected"),
        qtype = "album",
        xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               presentResult(JSON.parse(xmlhttp.responseText));
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    inputbox.onkeydown = function(key){
        if (key['keyCode'] == 13) {
            key.preventDefault();
            clearSearchResults();
            doSearch();
        }
    };

    for (var i = 0; i < qtype_dropdown.children.length; i++) {
         listElement = qtype_dropdown.children[i];
         aLink = listElement.getElementsByTagName("a")[0];
         aLink.onclick = function(e){
            e.preventDefault();
            qtype = this.getAttribute("x-qtype");
            qtype_selected.innerHTML = qtype;
         }
    }

    function presentResult(result) {
        counter.innerHTML = result["total_count"];
        result["items"].forEach(appendSearchResult);
    }

    function appendSearchResult(result) {
        li_el = document.createElement("li");

        img_el = formatThumbnailElement();
        img_el.src = result["image"];
        li_el.appendChild(img_el);

        text_el = createResultNameElement(result["name"]);
        li_el.appendChild(text_el);

        results.appendChild(li_el);
    }

    function createResultNameElement(name) {
        text_el = document.createElement("span");
        text_el.innerHTML = name;
        return text_el;
    }

    function formatThumbnailElement() {
        img_el = document.createElement("img");
        img_el.width = "64";
        img_el.height = "64";
        img_el.className = "thumb";
        return img_el;
    }

    function clearSearchResults() {
        results.innerHTML = "";
    }

    function doSearch() {
        term = inputbox.value;
        xmlhttp.open("GET", "/search/" + qtype + "/" + term, true);
        xmlhttp.send();
    }
});