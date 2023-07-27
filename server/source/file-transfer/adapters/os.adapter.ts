export interface ObjectStorageAdapterOptions {
  accessId: string;
  accessKey: string;
  region: string;
  bucket: string;
  prefix: string;
}

export interface Credential {
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
  accessId: string;
  accessKey: string;
  region: string;
  bucket: string;
  prefix: string;

  constructor(options: ObjectStorageAdapterOptions) {
    this.accessId = options.accessId;
    this.accessKey = options.accessKey;
    this.region = options.region;
    this.bucket = options.bucket;
    this.prefix = options.prefix;
  }

  abstract getCredential(): Credential | Promise<Credential>;

  abstract getToken(): string | Promise<string>;

  abstract getURL(key: string): string | Promise<string>;
}
