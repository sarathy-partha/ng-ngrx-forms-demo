export interface Status {
    id: string;
    status: string;
}

export interface ToDo {
    id: string;
    title: String;
    description: String;
    date: Date;
    status: Status;
}