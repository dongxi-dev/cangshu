import client from "@j-l/request";

export async function getFilePage(): Promise<DTI.Page> {
  const result: any = await client.get("/files");

  return result;
}

export const addFileEntry = async (params: { type: number; name: string }) => {
  // 暂时只考虑 文件夹
  const result: any = await client.put("/files", params);
};
