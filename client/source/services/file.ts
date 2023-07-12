import client from "@j-l/request";
import { upload } from "qiniu-js";

export async function getFilePage(
  params?: Partial<DTI.PageNote>
): Promise<DTI.Page> {
  const result: any = await client.get("/files", params);

  return result;
}

export const addFileEntry = async (params: { type: number; name: string }) => {
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
  const token: any = await client.get("/file-transfer/token");
  const observable = upload(
    file,
    Math.random() + "test.jpg",
    token,
    undefined,
    {
      useCdnDomain: true,
    }
  );

  return new Promise((resolve, reject) => {
    observable.subscribe({
      error: reject,
      complete(data) {
        console.log(data);
        resolve(data);
      },
    });
  });
};
