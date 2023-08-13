/// <reference types="vite/client" />

declare namespace App {
  export namespace DTO {
    export interface Login {
      username: string
      password: string
    }
    export interface Logout {}
  }
}
