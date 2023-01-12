const toUnit8Array = (base64Data: string) => {
  const byteString = Buffer.from(base64Data, 'base64').toString('binary')

  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return byteArray
}

const Unit8ArrayToFile = (array: Uint8Array) => new File([array], 'music')

const base64ToFile = (base64: string) => {
  const byteArray = toUnit8Array(base64)
  const file = Unit8ArrayToFile(byteArray)
  return file
}

export default base64ToFile