import { Injectable } from '@nestjs/common';
import { MessageType } from '../util/type/message.type';

@Injectable()
export class KasabeService {

    async testQuery(message: string): Promise<MessageType> {
        return { message: "HardCoded Hello" }
    }

}
