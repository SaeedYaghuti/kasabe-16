import { EnumClientStatusTypes } from '../types/emit_status_types.enum';
export declare class EmitClientStatusDto {
    readonly status: EnumClientStatusTypes;
    readonly emitted_at: number;
}
