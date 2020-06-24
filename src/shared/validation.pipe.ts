import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No value submitted',
        HttpStatus.BAD_REQUEST,
      );
    }
    // console.log(value);

    const { error } = this.schema.validate(value);
    // console.log(error);

    if (error) {
      throw new HttpException(
        `Validation Failed: ${error.details[0].message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) return false;
    return true;
  }
}
