export interface ObjectStorageAdapterOptions {
  accessId: string;
  accessKey: string;
  region: string;
  bucket: string;
  prefix: string;
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

  abstract getToken(): string | Promise<string>;

  abstract getURL(key: string): string | Promise<string>;
}
