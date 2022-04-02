import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ManagerService {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    private readonly configService: ConfigService
  ) {}

  bucketName = this.configService.get('S3_BUCKET_NAME');

  createBucket() {
    return new Promise((res, rej) => {
      this.s3.createBucket(
        {
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          ACL: 'authenticated-read',
        },
        (err, data) => {
          if (err) {
            rej(err);
          } else {
            res(data);
          }
        }
      );
    });
  }

   uploadImage(entity, id, file) {
    const { originalname,buffer: data } = file;
    const path = `${entity}/${id}/${new Date().getTime()}${originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: path,
      Body: data,
    };
    return new Promise((res, rej) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          rej(err.message);
        }
        res(data);
      });
    });
  }
}
