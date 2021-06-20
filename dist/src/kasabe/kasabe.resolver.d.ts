import { KasabeService } from './kasabe.service';
import { MessageType } from '../util/type/message.type';
export declare class KasabeResolver {
    private kasabeService;
    constructor(kasabeService: KasabeService);
    kasabeTestQuery(message: string): Promise<MessageType>;
    kasabeTestMutation(message: string): Promise<MessageType>;
    hello(): Promise<string>;
}
