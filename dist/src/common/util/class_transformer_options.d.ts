interface TargetMap {
    target: Function;
    properties: {
        [key: string]: Function;
    };
}
interface ClassTransformOptions {
    strategy?: "excludeAll" | "exposeAll";
    excludeExtraneousValues?: boolean;
    groups?: string[];
    version?: number;
    excludePrefixes?: string[];
    ignoreDecorators?: boolean;
    targetMaps?: TargetMap[];
    enableCircularCheck?: boolean;
    enableImplicitConversion?: boolean;
}
export declare const transformOptionsMsgToRoom: ClassTransformOptions;
export declare const transformOptionsMsgToClient: ClassTransformOptions;
export {};
