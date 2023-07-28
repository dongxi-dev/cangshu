export interface ObjectStorageAdapterOptions {
  accessId: string;
  accessKey: string;
  region: string;
  bucket: string;
  prefix: string;
}

export interface StorageCredential {
  accessId?: string;
  accessKey?: string;
  region?: string;
  bucket?: string;
  prefix?: string;
  startAt?: number;
  expiredAt?: number;
  token?: string;
}

export abstract class ObjectStorageAdapter {
  protected accessId: string;
  protected accessKey: string;
  protected region: string;
  protected bucket: string;
  protected prefix: string;

  constructor(options: ObjectStorageAdapterOptions) {
    this.accessId = options.accessId;
    this.accessKey = options.accessKey;
    this.region = options.region;
    this.bucket = options.bucket;
    this.prefix = options.prefix;
  }

  abstract getCredential(): StorageCredential | Promise<StorageCredential>;

  // abstract getURL(key: string): string | Promise<string>;
}
