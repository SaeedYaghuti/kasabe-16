import { transformAndValidate } from "class-transformer-validator";
import { BadGatewayException } from "@nestjs/common";
import { async } from 'rxjs/internal/scheduler/async';

export const classValidator = async (rawData, Dto): Promise<any> => {
    // transform the JSON to class instance and validate it correctness
    transformAndValidate(Dto, rawData)
    .then((result) => {
      // now you can access all your class prototype method
      console.log(`data converted to MessageCreateDto Successfully: ${result}`); // prints "Hello World!" on console
      return result;
    })
    .catch(err => {
      // here you can handle error on transformation (invalid JSON)
      // or validation error (e.g. invalid email property)
      console.error(err);
      throw new BadGatewayException();
    });
}
