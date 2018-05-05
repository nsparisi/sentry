let addCheckBoxes = function () {
    
    // insert th (header)
    let table = document.body.getElementsByTagName("Table")[0];
    let thead = table.getElementsByTagName("thead")[0];
    let tr = thead.getElementsByTagName("tr")[0];

    let newItem = document.createElement("th");
    let textnode = document.createTextNode("Print");
    newItem.setAttribute("scope", "col")
    newItem.appendChild(textnode);
    tr.insertBefore(newItem, tr.childNodes[0]);

    // find title column
    let titleIndex = 0;
    let all_th = tr.getElementsByTagName("th");
    let i;
    for (i = 0; i < all_th.length; i++) {
        if (all_th[i].childNodes.length > 0 &&
            all_th[i].childNodes[0].textContent &&
            all_th[i].childNodes[0].textContent == "Title") {
            titleIndex = i;
            break;
        }
    }
    console.log("titleIndex " + titleIndex);


    // insert td (checkbox)
    let tbody = table.getElementsByTagName("tbody")[0];
    let all_tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < all_tr.length; i++) {
        let current_tr = all_tr[i];
        let firstNode = current_tr.childNodes[0];
        let id = "p: " + current_tr.childNodes[titleIndex].innerText;
        
        chrome.storage.sync.get(id, function(data) {
            let newItem = document.createElement("td");
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", id);
            checkbox.addEventListener('click', clickCheckBox);
            checkbox.style.cssText = "transform: scale(1.7);";
            checkbox.checked = data[id];
            if(!data[id])
            {
                console.log("Not printed", id);
                current_tr.style.cssText = "background: #90ff9f;";
            }
            newItem.appendChild(checkbox);
            current_tr.insertBefore(newItem, firstNode);
        });
    }
}

let dumb1 = function ()
{
    let form = document.body.getElementsByTagName("form")[0];
    let div1 = form.getElementsByClassName("container body-content")[0];
    let div2 = div1.getElementsByTagName("div")[0];
    let dl = div2.getElementsByTagName("dl")[0];
    let all_dd = dl.getElementsByTagName("dd");

    let i;
    for (i = 0; i < all_dd.length; i++) {
        let id = "test_" + i;
        let current_dd = all_dd[i];
    
        chrome.storage.sync.get(id, function(data) {
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", id);
            checkbox.addEventListener('click', clickCheckBox);
            checkbox.style.cssText = "transform: scale(1.7);";
            checkbox.checked = data[id];
            if(!data[id])
            {
                console.log("Not printed", id);
                current_dd.style.cssText = "background: #90ff9f;";
            }
            current_dd.appendChild(checkbox);
        });
    }
}

let clickCheckBox = function (event) {
    let checkbox = event.srcElement;
    let key = checkbox.id;
    let val = checkbox.checked;

    chrome.storage.sync.set({ [key]:val }, function () {
        console.log('Storage set ' + checkbox.id + ' to ' + checkbox.checked);
    });
}

console.log("content script");
addCheckBoxes();
// dumb1();
