"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const common_1 = require("@nestjs/common");
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new common_1.HttpException('Only image files are allowed!', common_1.HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};
exports.editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString(10))
        .join('');
    callback(null, `${name}${randomName}${fileExtName}`);
};
//# sourceMappingURL=file-upload.utils.js.map