import { HttpStatus } from '@nestjs/common';
export declare class FileController {
    constructor();
    uploadedFile(file: any, role: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            originalname: any;
            filename: any;
        };
    }>;
    uploadMultipleFiles(files: any): Promise<{
        status: HttpStatus;
        message: string;
        data: any[];
    }>;
    getImage(image: any, res: any): {
        status: HttpStatus;
        data: any;
    };
}
