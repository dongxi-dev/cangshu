import client from "@j-l/request";
import { ElMessage } from "element-plus";

export async function getFilePage(): Promise<DTI.Page> {
  const result: any = await client.get("/files");

  return result.body;
}

export const addFileEntry = async (params: { type: number; name: string }) => {
  // 暂时只考虑 文件夹
  const result: any = await client.put("/files", params);

  if (result.status >= 400) {
    ElMessage("失败");
    throw new Error("88");
  }
};
