import { NeedleworkType } from "./Enums"
import { Notes } from "./Notes";
import { File } from "./File";
import { Yarn } from "./Yarn"
import { Pattern } from "./Pattern";

export interface Project {
    id?: string;
    name: string;
    type: NeedleworkType;
    startDate: Date;
    endDate?: Date;
    finished?: boolean;
    category: string;
    notes: Notes[];
    photos?: File[];
    files?: File[];
    userId: string;
    yarns: Yarn[];
    connectedPattern?: Pattern;
}