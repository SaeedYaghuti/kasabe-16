"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_type_enum_1 = require("../../../chat/models/room/room_type.enum");
exports.SampleRoomEntities = [
    {
        room_type: room_type_enum_1.RoomType.GROUP,
        title: 'All Hassan',
        status: 'Hasan Legendery',
        profile_image_url: 'Hassan.jpg',
        is_active: true,
        is_reported: false,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        room_type: room_type_enum_1.RoomType.CHANEL,
        title: 'Sahra bagh news',
        status: 'Fast and Relieble news',
        profile_image_url: 'sahra.jpg',
        is_active: true,
        is_reported: false,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
    }
];
//# sourceMappingURL=sample_room.entities.js.map