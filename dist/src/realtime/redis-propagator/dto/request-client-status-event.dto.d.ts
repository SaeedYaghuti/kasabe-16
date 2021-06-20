import { EmittoFrontendDto } from './emit-to-frontend.dto';
export declare class WatchClientStatusEvent extends EmittoFrontendDto {
    readonly followed_client_ids: number[];
    readonly emitted_at: number;
    readonly senderAuthId: number;
    readonly senderSocketId: string;
}
