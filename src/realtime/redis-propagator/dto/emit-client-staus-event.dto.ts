import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
import { EmittoFrontendDto } from './emit-to-frontend.dto';
import { EnumClientStatusTypes } from '../types/emit_status_types.enum';

// return type of handler of event emitStatus
export class EmitClientStatusEvent extends EmittoFrontendDto {
    // public readonly type: EnumEmitTypes;
    // public readonly event: EnumActTypes;
    // public readonly data: unknown;
    
    public readonly client_status: EnumClientStatusTypes;
    public readonly senderAuthId: number;
    public readonly senderSocketId: string;
}