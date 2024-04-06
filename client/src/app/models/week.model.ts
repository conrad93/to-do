export class Week {
    public day: string;
    public fullDate: string;
    public isToday: boolean;
    public date: string;
    public month: string;
    public year: string;
    public isExpired: boolean;
    constructor(day: string, fullDate: string, isToday: boolean, date: string, month: string, year: string, isExpired: boolean){
        this.day = day;
        this.fullDate = fullDate;
        this.isToday = isToday;
        this.date = date;
        this.month = month;
        this.year = year;
        this.isExpired = isExpired;
    }
}

