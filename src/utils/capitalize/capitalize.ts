export const capitalize = (text: string) => {
  const firstChar = text.charAt(0)
  const capitalized = firstChar.toUpperCase() + text.split(firstChar)[1]
  return capitalized
}
