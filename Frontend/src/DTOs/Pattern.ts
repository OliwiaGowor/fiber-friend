import { NeedleworkType } from "./Enums"
import { Notes } from "./Notes";
import { File } from "./File";
import { Yarn } from "./Yarn"

export interface Pattern {
    id?: string;
    name: string;
    type: NeedleworkType;
    author?: string;
    isAuthorial: boolean;
    startDate?: Date;
    endDate?: Date;
    finished?: boolean;
    category: string;
    notes: Notes[];
    photos?: File[];
    files?: File[];
    userId: string;
    yarns: Yarn[];
    tools?: Tool[];
    otherSupplies?: OtherSupply[];
    isShared: boolean;
}

export interface Tool {
    id?: string;
    name: string;
    quantity: number;
    size: string;
    patternId?: string;
}

export interface OtherSupply {
    id?: string;
    name: string;
    quantity: number;
    note?: string;
    patternId?: string;
}