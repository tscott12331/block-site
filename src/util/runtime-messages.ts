import browser from "webextension-polyfill";
import type { Site } from "./site";


export type TRuntimeMessageSender = any;
export type TRuntimeMessageType = 'store-site' | 'delete-site' | 'get-sites';

type TGetSitesData = any;

export interface IGetSitesReturn {
    sites: Site[];
}

export interface IStoreSiteData {
    site: Site;
}

export interface IStoreSiteReturn {
    result: Site[];
}

export interface IDeleteSiteData {
    site: Site;
}

export interface IDeleteSiteReturn {
    result: Site[];
}

interface IRuntimeMessage<M extends TRuntimeMessageType, T> {
    messageType: M;
    data: T;
}

export type TRuntimeEventMessageUnion = 
    | IRuntimeMessage<'store-site', IStoreSiteData>
    | IRuntimeMessage<'delete-site', IDeleteSiteData>
    | IRuntimeMessage<'get-sites', TGetSitesData>

export type TRuntimeEventReturnUnion =
    | IRuntimeEventReturn<'store-site', IStoreSiteReturn>
    | IRuntimeEventReturn<'delete-site', IDeleteSiteReturn>
    | IRuntimeEventReturn<'get-sites', IGetSitesReturn>

// enforce 1-1 releationship between message type and return type for runtime events
type TRuntimeEventMessageReturnMap = {
    [K in TRuntimeMessageType]: {
        Message: Extract<TRuntimeEventMessageUnion, { messageType: K }>
        Return: Extract<TRuntimeEventReturnUnion, { messageType: K }>
    }
}
export type TRuntimeEventMessage<M extends TRuntimeMessageType> = TRuntimeEventMessageReturnMap[M]['Message']
export type TRuntimeEventReturn<M extends TRuntimeMessageType> = TRuntimeEventMessageReturnMap[M]['Return']

interface IRuntimeEventReturn<M extends TRuntimeMessageType, R> {
    messageType: M;
    data: R;
}

export type TRuntimeEventListener<M extends TRuntimeMessageType> = (message: TRuntimeEventMessage<M>, sender: TRuntimeMessageSender) => Promise<TRuntimeEventReturn<M>>


export function addRuntimeEventListener<M extends TRuntimeMessageType>(listener: TRuntimeEventListener<M>) {
    browser.runtime.onMessage.addListener(async (msg: any, sender: any) => await listener(msg, sender));
}

export async function sendRuntimeEvent<M extends TRuntimeMessageType>(message: TRuntimeEventMessage<M>): Promise<TRuntimeEventReturn<M>> {
    return browser.runtime.sendMessage(message);
}

// TODO: fix typing on this
// export function wrapRuntimeEventReturnData<M extends TRuntimeMessageType, T extends TRuntimeEventMessage<M>['data']>(data: T, messageType: M): TRuntimeEventReturn<M> {
//     return {
//         messageType: messageType,
//         data: data,
//     }
// }
