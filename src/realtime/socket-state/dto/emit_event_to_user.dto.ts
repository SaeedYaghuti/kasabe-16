export class EmitEventToAuthDto {
    public readonly event: string;
    public readonly data: unknown;
    public readonly authId: number; 
    // we don't want to reach emit to this socketId; It is emitter itself
    public readonly excludedSocketId: string; 
}