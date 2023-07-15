import client from "@j-l/request";
import { upload, region, getUploadUrl } from "qiniu-js";

export async function getFilePage(
  params?: Partial<DTI.PageNote<{ parentId?: string }>>
): Promise<DTI.Page> {
  const result: any = await client.get("/files", params);

  console.log(JSON.stringify(result), 999);

  return result;
}

export const addFileEntry = async (params: {
  // type 0 文件夹 1 图片 2 视频 3 音频 10 文本 11 html 12 css 13 js 14 json 15 xml 16 md 17 yaml 18 ts 19 svg 30 pdf 31 7 Word 32 Excel 33 Ppt 99 未知
  type: number;
  name: string;
  size?: number;
  url?: string;
  parentId?: string;
}) => {
  // 暂时只考虑 文件夹
  const result: any = await client.put("/files", params);
};

export const updateFileEntry = async (id: string, params: { name: string }) => {
  const result: any = await client.patch("/files/" + id, params);
};

export const removeFileEntry = async (id: string) => {
  const result: any = await client.delete("/files/" + id);
};

export const removeBatchFileEntries = async (idList: string[]) => {
  const result: any = await client.delete("/files/batch", {
    idList,
  });
};

export const uploadFile = async (file: File) => {
  const { token }: any = await client.get("/file-transfer/token");

  const observable = upload(
    file,
    "test/" + Math.random() + "test.jpg",
    token,
    undefined,
    {
      useCdnDomain: true,
    }
  );

  return new Promise<string>((resolve, reject) => {
    observable.subscribe({
      error: (error) => {
        console.log(3333333, error);

        reject(error);
      },
      complete(data) {
        const base = "http://cdn99.jiluo.cc/";
        console.log(data);
        resolve(base + data.key);
      },
    });
  });
};
