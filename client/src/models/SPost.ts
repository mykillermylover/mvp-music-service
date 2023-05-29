export interface SPost {
    _id: string
    name: string,
    description: string,
    tracks: {
        _id: string,
        name: string
    }[]
}