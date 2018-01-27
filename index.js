var cont = document.getElementById("container");
document.getElementsByTagName("h3")[0].style.backgroundColor = "yellow";   // SYLING

function remOnClick(textCon){
    chrome.extension.getBackgroundPage().urls.forEach(function(value){
        if(textCon == value){
            chrome.extension.getBackgroundPage().urls.delete(value);
        }
    });
}

var currentTab = null;
chrome.tabs.query({"currentWindow": true, "active": true}, function(tabs){
    var add_this = document.getElementById('add_this');
    add_this.addEventListener('click', function(event){
        currentTab = tabs[0];
        var elems = document.createElement("p");
        var link = document.createElement("a");
        link.textContent = currentTab.url;
        link.href = currentTab.url.toString();
        elems.appendChild(link);
        if(tabs.length == 1){
            chrome.tabs.create({});
        }
        chrome.tabs.remove(currentTab.id);
        cont.appendChild(elems);
        // chrome.extension.getBackgroundPage().urls.push(tabs[i].url);
        chrome.extension.getBackgroundPage().urls.add(currentTab.url);

        link.addEventListener('click', function (link, event){            // Is The Order Correct? TODO: Check
            chrome.tabs.create({url: link.href});
            remOnClick(link.textContent);
        });
    });

    var add_more = document.getElementById('add_more');
    var flag = false;
    add_more.addEventListener('click', function(event){
        console.log("add more was clicked");
        flag = true;
        // console.log(flag+"out");
        currentTab = tabs[0];   // THIS ASSUMPTION IS INVALID. TODO: WORKAROUND
        // if (chrome.extension.getBackgroundPage().urls.length == 0 || flag) {
        if (chrome.extension.getBackgroundPage().urls.size == 0 || flag) {
            // console.log(flag+"in");
            chrome.tabs.query({"currentWindow": true}, getTabs);
            function getTabs(tabs) {
                var tabCount = tabs.length;
                var currentTabIndex = currentTab.index; // IT SHOULD ALWAYS BE ZERO DUE TO ABOVE ASSUMPTION
                for (var i = 0; i < tabCount; i++) {
                    if (i === currentTabIndex) {
                        // chrome.extension.getBackgroundPage().urls.push(tabs[i].url);
                        chrome.extension.getBackgroundPage().urls.add(tabs[i].url);
                        continue;
                    }
                    var elems = document.createElement("p");
                    var link = document.createElement("a");
                    link.textContent = tabs[i].url;
                    link.href = tabs[i].url.toString();
                    elems.appendChild(link);
                    chrome.tabs.remove(tabs[i].id);
                    cont.appendChild(elems);
                    // chrome.extension.getBackgroundPage().urls.push(tabs[i].url);
                    chrome.extension.getBackgroundPage().urls.add(tabs[i].url);
                }
                var paras = document.getElementsByTagName('a');
                for(var k = 0; k < paras.length; k++){
                    paras[k].addEventListener('click', myfunc.bind(paras[k], paras[k].href));
                }
                function myfunc(j, event){            // Is The Order Correct? TODO: Check
                    chrome.tabs.create({url: j});
                    remOnClick(j);
                }
            }
        }else{
            // // for(var j = 0; j < chrome.extension.getBackgroundPage().urls.length; j++){
            // for(var j = 0; j < chrome.extension.getBackgroundPage().prototype.size; j++){
            //
            //
            //     // if (chrome.extension.getBackgroundPage().urls[j] == currentTab.url) {
            //     //     continue;
            //     // }
            //
            //
            //     var elems = document.createElement("p");
            //     var link = document.createElement("a");
            //     link.textContent = chrome.extension.getBackgroundPage().urls[j];
            //     link.href = link.textContent.toString();
            //     elems.appendChild(link);
            //
            //
            //     cont.appendChild(elems);
            // }
            console.log("In else");
            chrome.extension.getBackgroundPage().urls.forEach(function(value){
                var elems = document.createElement("p");
                var link = document.createElement("a");
                link.textContent = value;
                link.href = link.textContent.toString();
                elems.appendChild(link);

                cont.appendChild(elems);
            });
            var paras = document.getElementsByTagName('a');
            for(var k = 0; k < paras.length; k++){
                paras[k].addEventListener('click', myfunc.bind(paras[k], paras[k].href));
            }
            function myfunc(j, event){
                chrome.tabs.create({url: j});
                remOnClick(j);
            }
        }
    });


    currentTab = tabs[0];   // THIS ASSUMPTION IS INVALID. TODO: WORKAROUND

    // if (chrome.extension.getBackgroundPage().urls.length == 0) {
    if (chrome.extension.getBackgroundPage().urls.size == 0) {
        console.log(flag+"in");

        chrome.tabs.query({"currentWindow": true}, getTabs);

        function getTabs(tabs) {
            var tabCount = tabs.length;
            var currentTabIndex = currentTab.index;


            for (var i = 0; i < tabCount; i++) {
                if (i === currentTabIndex) {
                    chrome.extension.getBackgroundPage().urls.add(tabs[i].url);
                    continue;
                }

                var elems = document.createElement("p");
                var link = document.createElement("a");
                link.textContent = tabs[i].url;
                link.href = tabs[i].url.toString();
                elems.appendChild(link);

                chrome.tabs.remove(tabs[i].id);
                cont.appendChild(elems);

                chrome.extension.getBackgroundPage().urls.add(tabs[i].url);
            }


            var paras = document.getElementsByTagName('a');
            for(var k = 0; k < paras.length; k++){
                paras[k].addEventListener('click', myfunc.bind(paras[k], paras[k].href));
            }

            function myfunc(j, event){
                chrome.tabs.create({url: j});
                remOnClick(j);
            }
        }

    }else{

        // for(var j = 0; j < chrome.extension.getBackgroundPage().urls.length; j++){
        //     // if (chrome.extension.getBackgroundPage().urls[j] == currentTab.url) {
        //     //     continue;
        //     // }
        //     var elems = document.createElement("p");
        //     var link = document.createElement("a");
        //     link.textContent = chrome.extension.getBackgroundPage().urls[j];
        //     link.href = link.textContent.toString();
        //     elems.appendChild(link);
        //
        //
        //     cont.appendChild(elems);
        // }

        chrome.extension.getBackgroundPage().urls.forEach(function(value){
            var elems = document.createElement("p");
            var link = document.createElement("a");
            link.textContent = value;
            link.href = link.textContent.toString();
            elems.appendChild(link);

            cont.appendChild(elems);
        });

        var paras = document.getElementsByTagName('a');
        for(var k = 0; k < paras.length; k++)
        {
            paras[k].addEventListener('click', myfunc.bind(paras[k], paras[k].href));
        }

        function myfunc(j, event){
            chrome.tabs.create({url: j});
            remOnClick(j);
        }

    }

});

// NO NEED FOR THIS ANYMORE
// (function removeOnClick(){
//     chrome.extension.getBackgroundPage().urls.forEach(function(value){
//         // if(textCont == value){
//             chrome.extension.getBackgroundPage().urls.delete(value);
//             console.log("ye-eah");
//         // }
//     });
// })();


// ENCOUNTERED BUGS
// No.0: disturbed UI sometimes
// No.1: Left mein there is a tab, uske right mein there is a tab(currently active), and i choose to "Add only this tab", and the left tab remains as it is and this one shuts, AND A NEW TAB IS CREATED(With Focus)
// No.3: I add some urls to the list, then start clicking them, and thus they vanish one-by-one. Now when I click the extension icon when the list is already empty, it acts the same as if the 'first-time': shutting all open tabs in the window and saving their urls in the list.
//       Now this isnt exactly a bug. If I want to remove it, then when the extension icon is clicked for the first time in the window, it shouldn't perform the original functionality, just open the popup and provide options for "add more tabs" and "add only this tab", which will then becone the only ways to add urls to the list. 
//       Otherwise, I should let it be as it is. BUT, the above seems more logical.
// TODO: LATER: I CAN GIVE A SETTINGS FEATURE, WHERE USER CAN CUSTOMISE WHAT HE/SHE WANT SOME THINGS TO DO. Eg. ENCOUNTERED BUGS No.3

