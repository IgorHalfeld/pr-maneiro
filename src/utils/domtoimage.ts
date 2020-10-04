import domtoimage from 'dom-to-image'
import { Ref } from 'vue'
import { Win } from '../types'

export function buildCopyFn (w: Win) {
  return async (element: Ref) => {
    const dataUrl = await domtoimage.toBlob(element, { quality: 0.95 })
    const item = new w.ClipboardItem({ 'image/png': dataUrl })
    w.navigator.clipboard.write([item])
  }
}

export function buildDownloadFn (doc: Document) {
  return async (element: Ref) => {
    const dataUrl = await domtoimage.toPng(element, { quality: 0.95 })
    const link = doc.createElement('a')
    link.download = 'pr-maneiro.png'
    link.href = dataUrl
    link.click()
    return link
  }
}
