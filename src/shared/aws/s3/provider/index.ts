import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StreamingBlobPayloadOutputTypes } from '@smithy/types';
import { logger } from '@shared/logger';
import { S3Config } from '@shared/aws/s3/config';
import { Readable } from 'stream';
import { createWriteStream } from 'node:fs';
import { envConfig } from '@config/env';
import { singleton } from 'tsyringe';

/**
 * S3Provider is responsible for make upload and download file of AWS S3.
 */
@singleton()
export class S3Provider {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = S3Config.getClient();
  }

  public async downloadS3Stream(bucketName: string, keyFile: string): Promise<StreamingBlobPayloadOutputTypes> {
    try {
      const command = new GetObjectCommand({ Bucket: bucketName, Key: keyFile });
      const response = await this.s3Client.send(command);
      if (!response.Body || typeof (response.Body as any).pipe !== 'function') {
        throw new Error('S3 retornou um Body que não é stream legível (Node Readable).');
      }
      return response.Body;
    } catch (error) {
      logger.error({ error }, `Falha fazer download do arquivo: ${bucketName}/${keyFile}`);
      throw new Error(`Falha fazer download do arquivo: ${keyFile}`);
    }
  }

  public async downloadS3Storage(bucketName: string, keyFile: string, filenameDir: string): Promise<void> {
    try {
      const command = new GetObjectCommand({ Bucket: bucketName, Key: keyFile });
      const response = await this.s3Client.send(command);
      if (!response.Body || typeof (response.Body as any).pipe !== 'function') {
        throw new Error('S3 retornou um Body que não é stream legível (Node Readable).');
      }

      await new Promise<void>((resolve, reject) => {
        if (response.Body instanceof Readable) {
          response.Body.pipe(createWriteStream(filenameDir))
            .on('error', (error) => {
              return reject(error);
            })
            .on('close', () => {
              return resolve();
            });
        }
      });
    } catch (error) {
      logger.error({ error }, `Falha fazer download e salvar arquivo: ${bucketName}/${keyFile}`);
      throw new Error(`Falha fazer download e salvar arquivo: ${keyFile}`);
    }
  }

  public async getS3SignedUrl(bucketName: string, keyFile: string, expiresIn: number): Promise<string> {
    try {
      const command = new GetObjectCommand({ Bucket: bucketName, Key: keyFile });
      return getSignedUrl(this.s3Client, command, { expiresIn: expiresIn });
    } catch (error) {
      logger.error({ error }, `Falha ao obter signed url: ${bucketName}/${keyFile}`);
      throw new Error(`Falha ao obter signed url: ${keyFile}`);
    }
  }

  public async maxEstimatedRecordsOfFile(bucketName: string, keyFile: string, approxBytesPerRow: number): Promise<number> {
    try {
      const head = await this.s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: keyFile }));
      if (!head.ContentLength) {
        throw new Error('Não foi possível determinar o tamanho do arquivo no S3');
      }
      return Math.floor(head.ContentLength / approxBytesPerRow);
    } catch (error) {
      logger.error({ error }, `Falha obter tamanho do arquivo: ${bucketName}/${keyFile}`);
      throw new Error(`Falha obter tamanho do arquivo: ${keyFile}`);
    }
  }

  public async uploadFileToS3(bucketName: string, keyFile: string, body: Buffer | Readable | string, contentType?: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: keyFile,
        Body: body,
        ContentType: contentType
      });

      await this.s3Client.send(command);

      return `https://${bucketName}.s3.${envConfig.AWS_REGION}.amazonaws.com/${keyFile}`;
    } catch (error) {
      logger.error({ error }, `Falha fazer upload do arquivo: ${bucketName}/${keyFile}`);
      throw new Error(`Falha fazer upload do arquivo: ${keyFile}`);
    }
  }
}
