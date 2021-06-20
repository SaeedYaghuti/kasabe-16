import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
import { EmittoFrontendDto } from './emit-to-frontend.dto';
import { EnumClientStatusTypes } from '../types/emit_status_types.enum';

// return type of handler of event emitStatus
export class WatchClientStatusEvent extends EmittoFrontendDto {
    // public readonly type: EnumEmitTypes;
    // public readonly event: EnumActTypes;
    // public readonly data: unknown;
    
    public readonly followed_client_ids: number[];
    public readonly emitted_at: number;
    
    public readonly senderAuthId: number;
    public readonly senderSocketId: string;
}