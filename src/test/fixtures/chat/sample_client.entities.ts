import { Client } from '../../../chat/models/client/client.entity';

export const SampleClientEntities: Partial<Client> [] = [
    {
        // client_id: 1,
        client_fname: 'saeid',
        client_lname: 'yaghouti',
        password: '12345678',
        phone: '09194846922',
        client_mname: 'poker face',
        email: 'saeid@yahouti.com',

        last_seen: new Date(),
        // last_typed: "2020-09-27T05:38:56.805Z",
        last_typed: new Date(),
        is_active: true,
        is_reported: true,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
        client_socket_id: null,
        client_socket_authname: null,
    },
    {
        // client_id: 2,
        client_fname: 'hamid',
        client_lname: 'shahbazi',
        password: '12345678',
        phone: '09194846922',
        client_mname: 'poker face',
        email: 'hamid@shahbazi.com',

        // last_seen: "2020-09-27T05:38:57.989Z",
        last_seen: new Date(),
        last_typed: new Date(),
        is_active: true,
        is_reported: true,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
        client_socket_id: null,
        client_socket_authname: null,
        
    },
    {
        // client_id: 3,
        client_fname: 'asity',
        client_lname: 'yaghouti',
        password: '12345678',
        phone: '09194846922',
        client_mname: 'poker face',
        email: 'asity@yahouti.com',

        // last_seen: "2020-09-27T05:38:58.047Z",
        last_seen: new Date(),
        last_typed: new Date(),
        is_active: true,
        is_reported: true,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
        client_socket_id: null,
        client_socket_authname: null,
        
    },
    {
        // client_id: 4,
        client_fname: 'hasti',
        client_lname: 'yaghouti',
        password: '12345678',
        phone: '09194846922',
        client_mname: 'poker face',
        email: 'hasti@yahouti.com',

        // last_seen: "2020-09-27T05:38:58.075Z",
        last_seen: new Date(),
        last_typed: new Date(),
        is_active: true,
        is_reported: true,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
        client_socket_id: null,
        client_socket_authname: null,
        
    }
   
]
