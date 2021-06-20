import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
import { EmittoFrontendDto } from "./emit-to-frontend.dto";

// TODO: data must be defined

// data to emit for specific auth
export class EmittoAuthDto extends EmittoFrontendDto {
    // public readonly type: EnumEmitTypes;
    // public readonly event: string;
    // public readonly data: unknown;

    public readonly authId: number;
    public readonly excludedSocketId: string;

}