export type Product = {
    id: string;
    quantity: number;
};


export type Material = {
    name: string;
    drawing_no_id: string;
    requiredQuantity: number;
}

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
    requiredMaterials: Material[];
    __v: number;
};