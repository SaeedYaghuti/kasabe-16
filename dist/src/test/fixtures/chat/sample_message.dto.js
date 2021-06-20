"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messag_recipiant_enum_1 = require("../../../chat/models/message/messag_recipiant.enum");
exports.SampleMessageDtos = [
    {
        to: messag_recipiant_enum_1.MessageRecipiant.Client,
        reciver_client_id: 2,
        text: "first message",
    },
    {
        to: messag_recipiant_enum_1.MessageRecipiant.Room,
        reciver_room_id: 1,
        text: "second message",
    },
    {
        to: messag_recipiant_enum_1.MessageRecipiant.Client,
        reciver_client_id: 2,
        text: "third message",
        msg_photo_id: 1,
        msg_audio_id: 1,
        msg_video_id: 1,
        msg_sticker_id: 1,
    },
    {
        to: messag_recipiant_enum_1.MessageRecipiant.Room,
        reciver_room_id: 1,
        text: "fourth message",
        msg_photo_id: 2,
        msg_audio_id: 2,
        msg_video_id: 2,
        msg_sticker_id: 2,
    },
];
//# sourceMappingURL=sample_message.dto.js.map