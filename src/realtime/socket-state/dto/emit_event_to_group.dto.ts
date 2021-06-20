export class EmitEventToGroupDto {
    public readonly event: string;
    public readonly data: any;

    public readonly groupId: number; 
    public readonly excludedSocketId: string;
}
