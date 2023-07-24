export const OS_MAP = {
  darwin: "mac_os" as const,
  win32: "windows" as const,
  linux: "linux" as const,
}

const currentOS = process.platform as keyof typeof OS_MAP

export const getCurrentOS = () => {
  return OS_MAP[currentOS]
}
