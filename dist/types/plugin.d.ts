export declare type TransformCallback = (fileLine: string) => object | null;
export declare type FinishCallback = () => void;
export declare type StartCallback = () => void;
export declare type allCallbacks = {
    transformCallback?: TransformCallback;
    finishCallback?: FinishCallback;
    startCallback?: StartCallback;
};
export declare function tapFlat(configObj: any, newHandlers?: allCallbacks): any;
