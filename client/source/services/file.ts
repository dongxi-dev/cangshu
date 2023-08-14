import client from '@j-l/request'
import { upload } from 'qiniu-js'
import COS from 'cos-js-sdk-v5'

export async function getFilePage(
  params?: Partial<DTI.PageNote<{ parentId?: string }>>,
): Promise<DTI.Page> {
  const result: any = await client.get('files', params)

  return result
}

export const addFileEntry = async (params: {
  // type 0 文件夹 1 图片 2 视频 3 音频 10 文本 11 html 12 css 13 js 14 json 15 xml 16 md 17 yaml 18 ts 19 svg 30 pdf 31 7 Word 32 Excel 33 Ppt 99 未知
  type: number
  name: string
  size?: number
  url?: string
  parentId?: string
}) => {
  // 暂时只考虑 文件夹
  const result: any = await client.put('files', params)
}

export const updateFileEntry = async (id: string, params: { name: string }) => {
  const result: any = await client.patch('files/' + id, params)
}

export const removeFileEntry = async (id: string) => {
  const result: any = await client.delete(
    'files/' + id,
    {},
    {
      payload: {},
    },
  )
}

export const removeBatchFileEntries = async (idList: string[]) => {
  const result: any = await client.delete(
    'files/batch',
    {
      idList,
    },
    {
      payload: {},
    },
  )
}

export const uploadFile = async (file: File) => {
  const { token, prefix, type, ...rest }: any = await client.get(
    'file-transfer/credential',
  )

  if (type === 'tencent') {
    const cos = new COS({
      getAuthorization(options, callback) {
        callback({
          TmpSecretId: rest.accessId,
          TmpSecretKey: rest.accessKey,
          SecurityToken: token,
          StartTime: rest.startAt,
          ExpiredTime: rest.expiredAt,
        })
      },
    })

    const result = await cos.uploadFile({
      Body: file,
      Key: prefix + file.name,
      Region: rest.region,
      Bucket: rest.bucket,
    })

    return 'https://' + result.Location
  }

  const observable = upload(
    file,

    prefix + Math.random() + 'test.jpg',
    token,
    undefined,
    {
      useCdnDomain: true,
    },
  )

  return new Promise<string>((resolve, reject) => {
    observable.subscribe({
      error: (error) => {
        console.log(3333333, error)

        reject(error)
      },
      complete(data) {
        const base = 'http://cdn99.jiluo.cc/'
        console.log(data)
        resolve(base + data.key)
      },
    })
  })
}
