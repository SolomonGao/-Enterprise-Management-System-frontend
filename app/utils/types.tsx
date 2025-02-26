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
export interface Order {
  _id: string;
  customer: string;
  phoneNumber: string;
  address: string;
  deadline: string;
  comments: string;
  createdAt: string;
  products: any[];
  materials: any[];
  status: string;
  version: number;
  price: number;
  requiredMaterials: any[];
  __v: number;
}

export type LogAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'READ';
export type LogTargetType = 'ORDER' | 'PRODUCT' | 'MATERIAL' | 'PURCHASING' | 'USER';

export interface LogEntry {
  _id: string;
  userId: string;
  username: string;
  role: string;
  action: LogAction;
  targetType: LogTargetType;
  targetId: string;
  details: string;
  oldData?: any;
  newData?: any;
  createdAt: string;
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


export interface ErrorResponse {
    data?: { message: string };
    message?: string;
  }

  export type PurchasingMaterial = {
    name: string;
    drawing_no_id: string;
    purchasedQuantity: number;
}

  export type Purchasing = {
    _id: string;
    authorizer: string;
    operator: string;
    status: string;
    orderDeadline: string;
    createdAt: string;
    updatedAt: string;
    material: PurchasingMaterial;
    __v: number;
};

export type UsedMaterial = {
    id: string;
    quantity: number;
    drawing_no_id: string;
};
  