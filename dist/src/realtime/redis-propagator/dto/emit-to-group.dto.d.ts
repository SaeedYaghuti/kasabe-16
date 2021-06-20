import { EmittoFrontendDto } from './emit-to-frontend.dto';
export declare class EmittoGroupDto extends EmittoFrontendDto {
    readonly groupId: number;
    readonly reciverAuthsId: number[];
    readonly senderAuthId: number;
    readonly senderSocketId: string;
}
