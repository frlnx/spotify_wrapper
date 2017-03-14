$(document).ready(function() {
    var results = document.getElementById("results"),
        inputbox = document.getElementById("formGroupInputLarge"),
        counter = document.getElementById("counter"),
        qtype_dropdown = document.getElementById("qtype_dropdown"),
        qtype_selected = document.getElementById("qtype_selected"),
        qtype = "album",
        xmlhttp = new XMLHttpRequest(),
        n_results = 0;

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
            clearSearchResults();
         }
    }

    function presentResult(result) {
        counter.innerHTML = result["total_count"];
        result["items"].forEach(appendSearchResult);
        n_results = results.children.length;
        if (result["total_count"] > n_results) {
            appendLoadMoreButton();
        }
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

    function appendLoadMoreButton() {
        li_el = document.createElement("li");

        text_el = createResultNameElement("Load more results ");
        li_el.appendChild(text_el);

        square_down_icon = document.createElement("i");
        square_down_icon.className = "fa fa-caret-square-o-down";
        square_down_icon.setAttribute("aria-hidden", "true");
        li_el.appendChild(square_down_icon)

        li_el.onclick = removeThisAndDoSearch;

        results.appendChild(li_el);
    }

    function removeThisAndDoSearch() {
        results.removeChild(this);
        doSearch();
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
        n_results = 0;
    }

    function doSearch() {
        term = inputbox.value;
        xmlhttp.open("GET", "/search/" + qtype + "/" + term + '?limit=5&offset=' + n_results, true);
        xmlhttp.send();
    }
});