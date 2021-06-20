import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
import { EmittoFrontendDto } from './emit-to-frontend.dto';
import { EnumClientStatusTypes } from '../types/emit_status_types.enum';
import { IsEnum, IsNotEmpty, IsDate, IsInt, Min } from 'class-validator';

// argument type for handler of event emitStatus
export class EmitClientStatusDto {
    @IsNotEmpty()
    @IsEnum(EnumClientStatusTypes)
    public readonly status: EnumClientStatusTypes;

    @IsNotEmpty()
    @IsInt()
    public readonly emitted_at: number; // milisecond
}