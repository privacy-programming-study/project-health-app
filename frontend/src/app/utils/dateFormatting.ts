import { formatDate } from "@angular/common";

export const dateFormatting = (date?: string) => {
    let tmp_date = date ? new Date(date.substring(0, 10)) : new Date();
    if(date) tmp_date.setDate(tmp_date.getDate() + 1);
    return formatDate(tmp_date.toString(), 'yyyy-MM-dd', 'en-US');
}

export const dateFormattingCalendar = (date?: string, time?: string) => {
    let tmp_time = time.substring(0, 5);
    let date_tmp = new Date(date.substring(0, 10));
    date_tmp.setDate(date_tmp.getDate() + 1);
    date_tmp.setHours(Number(tmp_time.substring(0,2)), Number(tmp_time.substring(3,6)), 0)
    return date_tmp.toISOString();
}