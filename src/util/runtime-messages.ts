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

export type TRuntimeEventMessageUnion = 
    | IRuntimeMessage<'store-site', IStoreSiteData>
    | IRuntimeMessage<'delete-site', IDeleteSiteData>

interface IRuntimeMessage<M extends TRuntimeMessageType, T> {
    messageType: M;
    data: T;
}

// enforce 1-1 releationship between message type and return type for runtime events
type TRuntimeEventMessageReturnMap = {
    [K in TRuntimeMessageType]: {
        Message: Extract<TRuntimeEventMessageUnion, { messageType: K }>
        Return: Extract<TRuntimeEventReturnUnion, { messageType: K }>
    }
}
type TRuntimeEventMessage<M extends TRuntimeMessageType> = TRuntimeEventMessageReturnMap[M]['Message']
type TRuntimeEventReturn<M extends TRuntimeMessageType> = TRuntimeEventMessageReturnMap[M]['Return']

interface IRuntimeEventReturn<M extends TRuntimeMessageType, R> {
    messageType: M;
    data: R;
}

export type TRuntimeEventReturnUnion =
    | IRuntimeEventReturn<'store-site', IStoreSiteReturn>
    | IRuntimeEventReturn<'delete-site', IDeleteSiteReturn>

export type TRuntimeEventListener<M extends TRuntimeMessageType> = (message: TRuntimeEventMessage<M>, sender: TRuntimeMessageSender) => Promise<TRuntimeEventReturn<M>>


export function AddRuntimeEventListener<M extends TRuntimeMessageType>(listener: TRuntimeEventListener<M>) {
    browser.runtime.onMessage.addListener(async (msg: any, sender: any) => await listener(msg, sender));
}

export async function SendRuntimeEvent<M extends TRuntimeMessageType>(message: TRuntimeEventMessage<M>): Promise<TRuntimeEventReturn<M>> {
    return browser.runtime.sendMessage(message);
}

export function wrapRuntimeEventReturnData<T>(data: T, messageType: TRuntimeMessageType): IRuntimeEventReturn<TRuntimeMessageType, T> {
    return {
        messageType,
        data,
    }
}
