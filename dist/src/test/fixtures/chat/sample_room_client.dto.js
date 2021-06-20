"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_role_enum_1 = require("../../../chat/models/client/client_role.enum");
exports.SampleRoomClientDtos = [
    { room_id: 1, client_id: 1, client_role: client_role_enum_1.ClientRole.ADMIN },
    { room_id: 1, client_id: 2, client_role: client_role_enum_1.ClientRole.ADMIN },
    { room_id: 1, client_id: 3, client_role: client_role_enum_1.ClientRole.ADMIN },
    { room_id: 2, client_id: 2, client_role: client_role_enum_1.ClientRole.ADMIN },
    { room_id: 2, client_id: 3, client_role: client_role_enum_1.ClientRole.ADMIN },
    { room_id: 2, client_id: 4, client_role: client_role_enum_1.ClientRole.READER },
];
//# sourceMappingURL=sample_room_client.dto.js.map