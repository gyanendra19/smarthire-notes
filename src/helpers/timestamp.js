export const timeStamp = (date) => {
    const now = new Date()
    const past = new Date(date)
    const difference = Math.floor((now - past) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for(let interval in intervals){
        const time = Math.floor(difference / intervals[interval])
        if(time >= 1){
            return `${time} ${interval}${time > 1 ? 's' : ''} ago`
        }
    }
    
    return 'Just now'
}