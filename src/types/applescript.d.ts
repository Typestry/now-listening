declare module "applescript" {
  // Add methods as needed. Currently this is the only method used in this project.
  const execString = (
    script: string,
    args: (
      err: unknown,
      result: string | Array<string> | number
    ) => Promise<void>
  ) => void 0;
}
