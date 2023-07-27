declare module "applescript" {
  // Add methods as needed. Currently this is the only method used in this project.
  export const execString = (
    script: string,
    args: (
      err: unknown,
      // In our case we expect a string so there is no need to enforce other possible types
      result?: Array<string>,
    ) => void,
  ): void => void 0
}
