import { gsap } from 'gsap'

export type Person = {
  name: string;
  username: string;
  msg: string;
  image: string;
};

interface ClipboardItemConstructor {
  new (data: { [mimeType: string]: Blob }): any;
}

interface Clipboard {
  write(item: any): void;
}

interface Navigator {
  clipboard: Clipboard;
}

export type Win = Window & {
  ClipboardItem: ClipboardItemConstructor;
  navigator: Navigator;
};

export type GSAP = typeof gsap;
