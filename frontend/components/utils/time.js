import moment from 'moment';

export function relativeTime(timestamp) {
    timestamp = new Date(timestamp).getTime();
    return moment(timestamp).fromNow();
}

export function formatTime(timestamp) {
    timestamp = new Date(timestamp).getTime();
    return moment(timestamp).format('lll');
}