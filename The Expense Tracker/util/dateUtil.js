export function getFormattedDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
}

export function getRecentDateByDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
}