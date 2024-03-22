function updateTabCount() {
    chrome.storage.sync.get('showBadge', function(data) {
        if (data.showBadge) {
            chrome.windows.getCurrent({populate: true}, function(window) {
                const tabCount = String(window.tabs.length);
                chrome.action.setBadgeText({text: tabCount});
            });
        } else {
            chrome.action.setBadgeText({text: ''});
        }
    });
}

chrome.runtime.onInstalled.addListener(updateTabCount);
chrome.runtime.onStartup.addListener(updateTabCount);
chrome.windows.onCreated.addListener(updateTabCount);
chrome.windows.onRemoved.addListener(updateTabCount);
chrome.tabs.onAttached.addListener(updateTabCount);
chrome.tabs.onDetached.addListener(updateTabCount);
chrome.windows.onFocusChanged.addListener(updateTabCount);

chrome.action.onClicked.addListener(() => {
    chrome.storage.sync.get(['randomTab', 'randomOrder'], function(data) {
        if (data.randomTab || data.randomOrder) {
            chrome.windows.getCurrent({populate: true}, function(window) {
                if (data.randomOrder) {
                    shuffleArray(window.tabs);
                }
                if (data.randomTab) {
                    const tabs = window.tabs;
                    const randomTabIndex = Math.floor(Math.random() * tabs.length);
                    chrome.tabs.update(tabs[randomTabIndex].id, {active: true});
                }
            });
        }
    });
});


function shuffleArray(tabs) {
    for (let i = tabs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tabs[i], tabs[j]] = [tabs[j], tabs[i]]; // Swap elements

        // Move tab i to new position j
        chrome.tabs.move(tabs[i].id, { index: j });
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({randomTab: true, randomOrder: false, showBadge: true}, function() {
    });
});
