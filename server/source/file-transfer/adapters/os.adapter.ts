export interface ObjectStorageAdapterOptions {
  accessId: string;
  accessKey: string;
  region: string;
  bucket: string;
  prefix: string;
  origin?: string;
}

export interface StorageCredential {
  type: ObjectStorageAdapter['type'];
  accessId?: ObjectStorageAdapter['accessId'];
  accessKey?: ObjectStorageAdapter['accessKey'];
  region?: ObjectStorageAdapter['region'];
  bucket?: ObjectStorageAdapter['bucket'];
  prefix?: ObjectStorageAdapter['prefix'];
  origin?: ObjectStorageAdapter['origin'];
  startAt?: number;
  expiredAt?: number;
  token?: string;
}

export abstract class ObjectStorageAdapter {
  protected abstract type: string;
  protected accessId: ObjectStorageAdapterOptions['accessId'];
  protected accessKey: ObjectStorageAdapterOptions['accessKey'];
  protected region: ObjectStorageAdapterOptions['region'];
  protected bucket: ObjectStorageAdapterOptions['bucket'];
  protected prefix: ObjectStorageAdapterOptions['prefix'];
  protected origin?: ObjectStorageAdapterOptions['origin'];

  constructor(options: ObjectStorageAdapterOptions) {
    this.accessId = options.accessId;
    this.accessKey = options.accessKey;
    this.region = options.region;
    this.bucket = options.bucket;
    this.prefix = options.prefix;
    this.origin = options.origin;
  }

  abstract getCredential(): StorageCredential | Promise<StorageCredential>;

  // abstract getURL(key: string): string | Promise<string>;
}
