// define retur type of handler, to whome data must be send
export enum EnumEmitTypes {
    FEEDBACK = 'feedback', // send to auth itseld that send this message
    ALL = 'all', // to all; authenticated and un_authenticated
    AUTHENTICATED = 'authenticated', // to all authenticated auth
    USER = 'auth', // to specific auth
    GROUP = 'group', // to a group
    CLIENTSTATUS = 'CLIENTSTATUS', // client is emitting it's status
    WATCHSTATUS = 'WATCHSTATUS', // we want to know about flowers status
}