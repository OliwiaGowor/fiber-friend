import { NeedleworkType } from "./Enums"
import { Notes } from "./Notes";
import { File } from "./File";
import { Yarn } from "./Yarn"
import { User } from "./User";

interface PatternBase {
    id?: string;
    name: string;
    type: NeedleworkType;
    authorId: string;
    author?: string;
    category: string;
    notes: Notes[];
    photos?: File[];
    files?: File[];
    yarns: Yarn[];
    tools?: Tool[];//TODO: change to obligatory
    otherSupplies?: OtherSupply[];
    isShared: boolean;
}

export interface Pattern extends PatternBase {
    isAuthorial: boolean;
    startDate: Date;
    endDate?: Date;
    finished: boolean;
}

export interface CommunityPattern extends PatternBase {
    savedByUsers: User[];
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