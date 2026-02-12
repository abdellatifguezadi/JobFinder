export interface Tracked {
    id?: number;
    userId : number;
    offerId: string;
    apiSource: string;
    title: string;
    company: string;
    location: string;
    url: string;
    status: 'accepted' | 'rejected' | 'pending';
    dateAdded: string;
}