/// <reference types="vite/client" />

declare namespace API.DTO {
  export namespace Login {
    export interface Params {
      username: string
      password: string
    }
  }

  export namespace GetSessionStatus {
    export interface Return {
      isValid: boolean
    }
  }

  export namespace GetSessionUserInfo {
    export interface Return {
      id: number
      name: string
      avatar: string
    }
  }

  export namespace GetSystemInfo {
    export interface Return {
      name: string
      logo: string
    }
  }
}

declare namespace API.Models {
  export interface Global {
    isLogin: boolean
    user?: API.DTO.GetSessionUserInfo.Return
    system?: API.DTO.GetSystemInfo.Return
  }
}
