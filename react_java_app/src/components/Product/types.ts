export interface IPorductCreate {
    name: string,
    description: string,
    price: number,
    category_id: number,
    files: Array<File>,
}

export interface IProductItem {
    id:number,
    name: string,
    description: string,
    price: number,
    category: string
    files: Array<string>,
}