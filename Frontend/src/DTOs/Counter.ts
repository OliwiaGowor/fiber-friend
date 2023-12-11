export interface Counter {
    id?: string;
    name: string;
    value: number;
    countersGroupId?: string;
}

export interface CountersGroup {
    id: string;
    name: string;
    counters: Counter[];
    patternId?: string;
    projectId?: string;

}