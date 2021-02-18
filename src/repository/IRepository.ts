export interface IRepository<T> {
    create: (user: T) => void;
    update: (user: T) => void;
    deletee: (user: T) => void;
    get: (id: number) => T;
    getAll: () => Array<T>;
}