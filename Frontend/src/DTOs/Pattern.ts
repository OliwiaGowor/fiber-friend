import { NeedleworkType } from "./Enums"
import { Notes } from "./Notes";
import { MyFile } from "./MyFile";
import { Yarn } from "./Yarn"
import { User } from "./User";

interface PatternBase {
    id?: string;
    name: string;
    type: NeedleworkType;
    authorId: string;
    author?: User;
    category: string;
    notes: Notes[];
    photos?: MyFile[];
    files?: MyFile[];
    yarns: Yarn[];
    tools: Tool[];
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