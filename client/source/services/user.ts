import client from "@j-l/request";

export const loginUser = async (params: { password: string; username: string }) => {
  const result: any = await client.post("/auth/login", params);
  return result.body
};
