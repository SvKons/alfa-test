interface IPage {
    title: string;
    path: string;
}

export const pages: IPage[] = [
    { title: 'Products', path: 'books' },
    { title: 'Create product', path: 'create-product' },
];
