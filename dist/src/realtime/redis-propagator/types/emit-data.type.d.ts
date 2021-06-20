import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
export declare class EmitDataType {
    readonly type: EnumEmitTypes;
    readonly event: string;
    readonly data: unknown;
}
