declare module "applescript" {
  const execString = (
    script: string,
    args: (
      err: unknown,
      result: string | Array<string> | number
    ) => Promise<void>
  ) => void 0;
}
