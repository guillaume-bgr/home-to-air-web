import { DateTime } from 'luxon';

export const getRoundedHourLabelsLast12HoursFrench = () => {
    const labels = [];
    const locale = 'fr'; 
    const currentTime = DateTime.local();
    
    const roundedCurrentTime = currentTime.startOf('hour');
    labels.push(roundedCurrentTime.setLocale(locale).toFormat('HH:mm'));
    
    for (let i = 1; i < 12; i++) {
        const time = currentTime.minus({ hours: i });
        const roundedTime = time.startOf('hour');
        const label = roundedTime.setLocale(locale).toFormat('HH:mm');
        labels.push(label);
    }
    labels.reverse();

    return labels;
}