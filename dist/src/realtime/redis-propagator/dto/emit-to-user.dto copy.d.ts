import { EmittoFrontendDto } from "./emit-to-frontend.dto";
export declare class EmittoAuthDto extends EmittoFrontendDto {
    readonly authId: number;
    readonly excludedSocketId: string;
}
