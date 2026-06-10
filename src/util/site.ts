import browser from 'webextension-polyfill';

export type Site = string;

export async function getStoredSites(): Promise<Record<string, boolean>> {
    const res = await browser.storage.local.get("sites");

    return res['sites'] as Record<string, boolean>
}

