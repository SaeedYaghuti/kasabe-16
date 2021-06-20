import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";

// TODO: data must be defined

// data to emit for specific auth
export class EmittoFrontendDto {
    public readonly type: EnumEmitTypes;
    public readonly event: string;
    public readonly data: unknown;
}