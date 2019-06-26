export declare type TransformCallback = (lineObj: any) => string | null;
export declare type FinishCallback = () => void;
export declare type StartCallback = () => void;
export declare type allCallbacks = {
    transformCallback?: TransformCallback;
    finishCallback?: FinishCallback;
    startCallback?: StartCallback;
};
export declare function targetFlat(configObj: any, newHandlers?: allCallbacks): any;
