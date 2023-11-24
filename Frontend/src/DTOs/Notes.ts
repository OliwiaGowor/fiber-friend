export interface Notes {
    children: NotesChildren[];
    type?: string;
}

interface NotesChildren {
    text: string;
    italic?: boolean;
    bold?: boolean;
    code?: boolean;
    underline?: boolean;
}