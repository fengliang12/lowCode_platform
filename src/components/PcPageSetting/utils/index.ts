export const typeOf = (obj: any) => {
  const str: string = Object.prototype.toString.call(obj)
  return str.match(/\[object (.*?)\]/)?.[1].toLowerCase()
}
