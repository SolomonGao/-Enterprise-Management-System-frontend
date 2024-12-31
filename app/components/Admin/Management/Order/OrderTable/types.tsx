export type Product = {
    id: string;
    quantity: number;
};

export type Order = {
    _id: string;
    customer: string;
    phoneNumber: string;
    address: string;
    status: string;
    deadline: string;
    products: Product[];
    comments: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};