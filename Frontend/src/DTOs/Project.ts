import { NeedleworkType } from "./Enums"
import { Notes } from "./Notes";
import { MyFile } from "./MyFile";
import { Yarn } from "./Yarn"
import { Pattern } from "./Pattern";
import { User } from "./User";

export interface Project {
    id?: string;
    name: string;
    type: NeedleworkType;
    startDate: Date;
    endDate?: Date;
    finished?: boolean;
    category: string;
    notes: Notes[];
    photos?: MyFile[];
    files?: MyFile[];
    userId: string;
    user?: User;
    yarns: Yarn[];
    connectedPattern?: Pattern;
}