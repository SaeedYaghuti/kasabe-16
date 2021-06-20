import { EnumEmitTypes } from "src/realtime/redis-propagator/types/emit_types.enum";
import { EmittoFrontendDto } from './emit-to-frontend.dto';
import { EnumClientStatusTypes } from '../types/emit_status_types.enum';
import { IsEnum, IsNotEmpty, IsDate, IsInt, Min, IsArray, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

// Subscribe to event emitted by a celebrity
export class WatchClientStatusDto {
    @IsNotEmpty()
    @IsInt({each: true})
    public readonly followed_client_ids: number[];

    @IsNotEmpty()
    @IsInt()
    public readonly emitted_at: number; // milisecond
}