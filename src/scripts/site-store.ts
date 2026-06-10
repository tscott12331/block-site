import browser from 'webextension-polyfill';

import { addRuntimeEventListener, type IStoreSiteReturn, type IDeleteSiteReturn, type IGetSitesReturn } from "../util/runtime-messages";
import type { Site } from '../util/site';

async function getStoredSites(): Promise<Record<string, boolean>> {
    const res = await browser.storage.local.get("sites");

    return res['sites'] as Record<string, boolean>
}

async function getSites(): Promise<IGetSitesReturn> {
    const sites = await getStoredSites();;
    return { sites: Object.keys(sites) }
}

async function storeSite(site: Site): Promise<IStoreSiteReturn> {
    const storedSites = await getStoredSites();
    storedSites[site] = true;

    await browser.storage.local.set({ sites: storedSites });

    return { result: Object.keys(storedSites) };
}

async function deleteSite(site: Site): Promise<IDeleteSiteReturn> {
    const storedSites = await getStoredSites();
    delete storedSites[site];

    await browser.storage.local.set({ "sites": storedSites });

    return { result: Object.keys(storedSites) };
}

export function initSiteStore() {
    addRuntimeEventListener(async (message, _sender) => {
        switch(message.messageType) {
            case 'store-site':
                return { data: await storeSite(message.data.site), messageType: 'store-site' };
            case 'delete-site':
                return { data: await deleteSite(message.data.site), messageType: 'delete-site' };
            case 'get-sites':
                return { data: await getSites(), messageType: 'get-sites' };
        }
    })
}
