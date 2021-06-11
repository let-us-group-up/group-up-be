declare module 'mongoose' {
  export type MakePopulated<Type, Parts, K extends keyof Parts> =
    Omit<Type, K> & {
      [P in K]: Parts[P];
    }
}
