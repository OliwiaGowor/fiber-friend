export interface File {
    id?: string;
    name?: string;
    src: string;
    alt?: string;
    width: number;
    height: number;
    type: string;
    parentId: string;
}