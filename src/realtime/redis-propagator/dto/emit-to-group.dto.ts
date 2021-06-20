import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
import { EmittoFrontendDto } from './emit-to-frontend.dto';

// TODO: data must be defined

// data to emit for specific auth
export class EmittoGroupDto extends EmittoFrontendDto {
    public readonly groupId: number;
    public readonly reciverAuthsId: number[];
    public readonly senderAuthId: number;
    public readonly senderSocketId: string;
}