let on_off_button = document.getElementById('on_off_check');
on_off_button.onclick = on_off_function;

document.getElementById('client_ip').innerHTML = "";
chrome.storage.sync.get(['ip_info'], function(result) {
    document.getElementById('client_ip').append(result.ip_info.ip);
});

chrome.storage.sync.get(['st_is_on'], function(result) {
    if (result.st_is_on){
        on_off_button.setAttribute("checked" , "")
    }else {
        on_off_button.removeAttribute("checked")
    }
});

function on_off_function() {
    chrome.storage.sync.get(['st_is_on'], function(result) {
        if (result.st_is_on){
            chrome.storage.sync.set({st_is_on: false});
        }else {
            chrome.storage.sync.set({st_is_on: true});
        }
    });
}