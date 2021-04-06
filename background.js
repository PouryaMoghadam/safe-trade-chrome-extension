async function postData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json();
}

const binance_forbidden_countries = ['IR','BY','RS','BA','MM'];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['st_is_on'], function(result) {
        if (typeof result.st_is_on === 'undefined'){
            chrome.storage.sync.set({st_is_on: false});
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    postData('https://api.myip.com/')
        .then(data => {
            chrome.storage.sync.set({ip_info: data});
        });
    let url = tab.url;
    if (url.search('https://www.binance.com/') !== -1 ){
        chrome.storage.sync.get(['st_is_on'], function(result) {
            if (result.st_is_on){
                chrome.storage.sync.get(['ip_info'], function(result) {
                    binance_forbidden_countries.map((cun,index)=>{
                        if (cun === result.ip_info.cc){
                            chrome.tabs.update({url: 'chrome-extension://'+chrome.runtime.id+'/views/wrong-ip.html'});
                        }
                    })
                });
            }
        });
    }
    if (url.search('https://www.bitforex.com/') !== -1 ){
        chrome.storage.sync.get(['st_is_on'], function(result) {
            if (result.st_is_on){
                chrome.storage.sync.get(['ip_info'], function(result) {
                    binance_forbidden_countries.map((cun,index)=>{
                        if (cun === result.ip_info.cc){
                            chrome.tabs.update({url: 'chrome-extension://'+chrome.runtime.id+'/views/wrong-ip.html'});
                        }
                    })
                });
            }
        });
    }
});