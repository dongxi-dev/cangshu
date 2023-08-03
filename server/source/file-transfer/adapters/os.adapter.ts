export interface ObjectStorageAdapterOptions {
  accessId: string;
  accessKey: string;
  region: string;
  bucket: string;
  prefix: string;
  origin?: string;
}

export interface StorageCredential {
  type: string;
  accessId?: string;
  accessKey?: string;
  region?: string;
  bucket?: string;
  prefix?: string;
  origin?: string;
  startAt?: number;
  expiredAt?: number;
  token?: string;
}

export abstract class ObjectStorageAdapter {
  protected abstract type: string;
  protected accessId: string;
  protected accessKey: string;
  protected region: string;
  protected bucket: string;
  protected prefix: string;
  protected origin: string;

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
