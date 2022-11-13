declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string,
      DB_PORT: number,
    }
  }
}
export {}
