export const formatTime = (timeValue?: string | null): string => {
    if (!timeValue) return '--:--';

    if (typeof timeValue === 'string' && timeValue.includes(':')) {
        const parts = timeValue.split(':');
        return `${parts[0]}:${parts[1]}`;
    }

    const date = new Date(timeValue);
    if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        });
    }

    return '--:--';
}