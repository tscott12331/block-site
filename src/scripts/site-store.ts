import browser from 'webextension-polyfill';

import { AddRuntimeEventListener, type TRuntimeMessageType, type TRuntimeMessage, type IStoreSiteReturn, wrapRuntimeEventReturnData, type IDeleteSiteReturn } from "../util/runtime-messages";

AddRuntimeEventListener<TRuntimeMessageType, TRuntimeMessage>(async (message, _sender) => {
    switch(message.messageType) {
        case 'store-site':
            return wrapRuntimeEventReturnData(await storeSite(message.data.data.url), 'store-site');
        case "delete-site":
            return wrapRuntimeEventReturnData(await deleteSite(message.data.data.url), 'delete-site');
    }
})

async function storeSite(url: string): Promise<IStoreSiteReturn> {
    console.log(`storing ${url}`);
    return { result: true };
    // return { messageType: 'store-site' as TRuntimeMessageType, data: { result: true }};
}

async function deleteSite(url: string): Promise<IDeleteSiteReturn> {
    console.log(`deleting ${url}`);
    return { result: true };
}
