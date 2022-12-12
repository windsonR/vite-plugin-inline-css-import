import type { Plugin, } from 'vite'
const CSS_REGEX = /\.(css)['"]/g
interface appendAndMatch {
  append: number,
  matched: string,
}
export default (): Plugin => {
  return {
    name: 'vite-plugin-inline-css-import',
    transform(code) {
      const aCode = code
      const codeArray = aCode.split('')
      const appendArr: Array<appendAndMatch> = []
      for (const match of aCode.matchAll(CSS_REGEX)) {
        // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
        const [_, matched] = match
        const append = match.index
        if (append) {
          appendArr.push({
            append,
            matched,
          })
        }
      }
      if (appendArr.length > 0) {
        appendArr.sort((a, b) => b.append - a.append).forEach(a => {
          codeArray.splice(a.append + a.matched.length + 1, 0, '?inline')
        })
        return {
          code: codeArray.join(''),
        }
      }
      return {
        code,
      }
    },
  }
}
