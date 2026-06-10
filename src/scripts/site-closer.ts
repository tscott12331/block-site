import browser from 'webextension-polyfill';
import { getStoredSites } from '../util/site';

export function initSiteClose() {
    browser.tabs.onCreated.addListener(handleTabCreate);

    browser.tabs.onUpdated.addListener(handleTabUpdate);
}


async function handleTabCreate(tab: browser.Tabs.Tab) {
    removeIfBlocked(tab);
}

async function handleTabUpdate(_tabId: number, _tabUpdateInfo: browser.Tabs.OnUpdatedChangeInfoType, tab: browser.Tabs.Tab) {
    removeIfBlocked(tab);
}

async function removeIfBlocked(tab: browser.Tabs.Tab) {
    if(!tab.url || !tab.id) return;

    const blockedSites = Object.keys(await getStoredSites());
    console.log(blockedSites);

    for(const site of blockedSites) {
        if(site.includes(tab.url) || tab.url.includes(site)) {
            console.log('should remove');
            browser.tabs.remove(tab.id)
        }
    }
}
