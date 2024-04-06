export class ToDo {
    public id: number;
    public title: string;
    public description: string;
    public date: string;
    public status: boolean;
    constructor(id: number, title: string, description: string, date: string, status: boolean){
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = status;
    }
}
