export type Product = {
    id: string;
    quantity: number;
};


export interface DataItem {
    idroot_material: string;
    root_name: string;
    // 其他字段...
  }
  

export type Material = {
    name: string;
    drawing_no_id: string;
    requiredQuantity: number;
}

export type MaterialFull = {
    model_name: string;
    name: string;
    row_materials: string;
    comments: string;
    counts: number;
    purchasing: number;
    specification: string;
    drawing_no_id: string;
    drawing_no: { file: string | null; fileType: string };
    root_materials_idroot_materials: string;
    [key: string]: any;
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
    requiredMaterials: Material[];
    __v: number;
};

export interface ErrorResponse {
    data?: { message: string };
    message?: string;
  }
  