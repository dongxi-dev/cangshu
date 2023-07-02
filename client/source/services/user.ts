import * as http from "~/utils/https";
const base ='http://localhost:3000'
export async function loginUser(params: any) {
  const response = await http.get<any>(base+"/users/files", params);
  return response; 
}
