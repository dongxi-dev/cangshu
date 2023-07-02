import * as http from "~/utils/https";
const base ='http://localhost:3000'
export async function loginUser(params: any) {
  const response = await http.post<any>(base+"/users/login", params);
  return response; 
}
