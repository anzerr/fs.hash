
declare const hash: (dir: string, option?: {max?: number, type?: string, raw?: boolean}) => Promise<string | {[key: string]: string}>;
export default hash;
export {};