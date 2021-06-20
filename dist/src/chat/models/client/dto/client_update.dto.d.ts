export declare class ClientUpdateDto {
    client_id: number;
    client_socket_id?: string;
    client_socket_authname?: string;
    client_fname?: string;
    client_lname?: string;
    client_mname?: string;
    email?: string;
    phone?: string;
    last_seen?: Date;
    last_typed?: Date;
    is_active?: boolean;
    is_reported?: boolean;
    is_blocked?: boolean;
    updated_at?: Date;
}
