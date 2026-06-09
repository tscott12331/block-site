import browser from "webextension-polyfill";


export type TRuntimeMessageSender = any;
export type TRuntimeMessageType = 'store-site' | 'delete-site';

export interface IStoreSiteData {
    url: string
}

export interface IStoreSiteReturn {
    result: boolean
}

export interface IDeleteSiteData {
    url: string
}

export interface IDeleteSiteReturn {
    result: boolean;
}

export type TRuntimeMessage = 
IRuntimeMessage<'store-site', IStoreSiteData> |
IRuntimeMessage<'delete-site', IDeleteSiteData>

interface IRuntimeMessage<M extends TRuntimeMessageType, T> {
    messageType: M;
    data: T;
}

// enforce 1-1 releationship between message type and return type for runtime events
type TMessageReturnMap = {
    [K in TRuntimeMessage['messageType']]: Extract<TRuntimeEventReturn, { messageType: K }>
}

interface IRuntimeEventReturn<M extends TRuntimeMessageType, R> {
    messageType: M;
    data: R;
}

export type TRuntimeEventReturn =
    | IRuntimeEventReturn<'store-site', IStoreSiteReturn>
    | IRuntimeEventReturn<'delete-site', IDeleteSiteReturn>

export type TRuntimeEventListener<M extends TRuntimeMessageType, T> = (message: IRuntimeMessage<M, T>, sender: TRuntimeMessageSender) => Promise<TMessageReturnMap[M]>


export function AddRuntimeEventListener<M extends TRuntimeMessageType, T>(listener: TRuntimeEventListener<M, T>) {
    browser.runtime.onMessage.addListener(async (msg: any, sender: any) => await listener(msg, sender));
}

export async function SendRuntimeEvent<M extends TRuntimeMessageType, T>(message: IRuntimeMessage<M, T>): Promise<TMessageReturnMap[M]> {
    return browser.runtime.sendMessage(message);
}

export function wrapRuntimeEventReturnData<T>(data: T, messageType: TRuntimeMessageType): IRuntimeEventReturn<TRuntimeMessageType, T> {
    return {
        messageType,
        data,
    }
}
