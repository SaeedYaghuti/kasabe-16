import { MessageRecipiant } from '../../../chat/models/message/messag_recipiant.enum';
import { MessageCreateDto } from '../../../chat/models/message/dto/message_create.dto';

export const SampleMessageDtos: MessageCreateDto[] = [
    // 💡 sender_client_id is assign at server
    {
        to: MessageRecipiant.Client,

        // sender_client_id: 1,
        reciver_client_id: 2,
        // reciver_room_id: null,
        text: "first message",
        // msg_photo_id: null,
        // msg_audio_id: null,
        // msg_video_id: null,
        // msg_sticker_id: null,
    },
    {
        to: MessageRecipiant.Room,
        // sender_client_id: 1,
        // reciver_client_id: null,
        reciver_room_id: 1,
        text: "second message",
        // msg_photo_id: null,
        // msg_audio_id: null,
        // msg_video_id: null,
        // msg_sticker_id: null,
    },
    {
        to: MessageRecipiant.Client,
        // sender_client_id: 1,
        reciver_client_id: 2,
        // reciver_room_id: null,
        text: "third message",
        msg_photo_id: 1,
        msg_audio_id: 1,
        msg_video_id: 1,
        msg_sticker_id: 1,
    },
    {
        to: MessageRecipiant.Room,
        // sender_client_id: 1,
        // reciver_client_id: null,
        reciver_room_id: 1,
        text: "fourth message",
        msg_photo_id: 2,
        msg_audio_id: 2,
        msg_video_id: 2,
        msg_sticker_id: 2,
    },
]