import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';
import { UseRoles, ACGuard, UserRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';

@Controller('file')
export class FileController {

  constructor() {}

  // upload single file
  @Post()
  
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: 'file',
    action: 'create',
    possession: 'own',
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file,
    @UserRoles() role,
  ) {
    console.log("<file.controller| uploadedFile| role>", role);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Post('uploadMultipleFiles')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}