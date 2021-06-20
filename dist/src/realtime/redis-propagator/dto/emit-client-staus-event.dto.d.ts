import { EmittoFrontendDto } from './emit-to-frontend.dto';
import { EnumClientStatusTypes } from '../types/emit_status_types.enum';
export declare class EmitClientStatusEvent extends EmittoFrontendDto {
    readonly client_status: EnumClientStatusTypes;
    readonly senderAuthId: number;
    readonly senderSocketId: string;
}
