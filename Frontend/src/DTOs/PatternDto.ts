import { NeedleworkType } from "./Enums"
import { YarnDto } from "./YarnDto"

export interface PatternDto {
    id?: string,
    name: string
    type: NeedleworkType
    isAuthorial: boolean
    category: string
    notes: string
    //Photos: Photo[]
    //Files: File[]
    userId: string
    yarns: YarnDto[]
}