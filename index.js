var cont = document.getElementById("container");
document.getElementsByTagName("h3")[0].style.backgroundColor = "yellow";

var currentTab = null;
chrome.tabs.query({"currentWindow": true, "active": true}, function (tabs) {
    currentTab = tabs[0];

    if (chrome.extension.getBackgroundPage().urls.length == 0) {

        chrome.tabs.query({"currentWindow": true}, getTabs);

        function getTabs(tabs) {
            var tabCount = tabs.length;
            var currentTabIndex = currentTab.index;


            for (var i = 0; i < tabCount; i++) {
                if (i === currentTabIndex) {
                    chrome.extension.getBackgroundPage().urls.push(tabs[i].url);
                    continue;
                }

                var elems = document.createElement("p");
                var link = document.createElement("a");
                link.textContent = tabs[i].url;
                link.href = tabs[i].url.toString();
                elems.appendChild(link);
               
                chrome.tabs.remove(tabs[i].id);
                cont.appendChild(elems);

                chrome.extension.getBackgroundPage().urls.push(tabs[i].url);
            }


            var paras = document.getElementsByTagName('a');
            for(var k = 0; k < paras.length; k++)
            {

                paras[k].addEventListener('click', myfunc.bind(paras[k], paras[k].href));
            }

            function myfunc(j, event){
                chrome.tabs.create({url: j});
            }
}

    }else{

        for(var j = 0; j < chrome.extension.getBackgroundPage().urls.length; j++){
            if (chrome.extension.getBackgroundPage().urls[j] == currentTab.url) {
               continue;
            }
            var elems = document.createElement("p");
            var link = document.createElement("a");
            link.textContent = chrome.extension.getBackgroundPage().urls[j];
            link.href = link.textContent.toString();
            elems.appendChild(link);


            cont.appendChild(elems);
        }

        var paras = document.getElementsByTagName('a');
        for(var k = 0; k < paras.length; k++)
        {
           paras[k].addEventListener('click', myfunc.bind(paras[k], paras[k].href));
        }

        function myfunc(j, event){
            chrome.tabs.create({url: j});
        }

    }

});



