import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: ({ productInfo, selectedImage }) => ({
                url: "product/add-product",
                method: "POST",
                body: { productInfo, selectedImage },
                credentials: "include" as const,
            }),
        }),
        productToMaterial: builder.mutation({
            query: ({ idProduct, selectedMaterialsId }) => ({
                url: "product/product-to-material",
                method: "POST",
                body: { idProduct, selectedMaterialsId },
                credentials: "include" as const,
            }),
        }),
        getProducts: builder.query({
            query: ({
                page = 1,
                terms: { searchBy, search }
            }) => {
                const params = new URLSearchParams();
                if (search) {
                    params.append('search', search);
                }

                params.append('searchBy', searchBy);

                params.append('page', String(page));

                return {
                    url: `/product/get-products?${params.toString()}`,
                    method: "GET",
                    credentials: 'include' as const,
                }
            }
        }),
        // 获取材料与产品的关联
        getMaterialsByProduct: builder.query({
            query: ({idProduct, page}) => ({
                url: `/product/get-materials-by-product?idProduct=${idProduct}&page=${page}`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
})

export const { 
    useAddProductMutation, 
    useProductToMaterialMutation, 
    useGetProductsQuery, 
    useGetMaterialsByProductQuery,
    useLazyGetMaterialsByProductQuery,
 } = productApi;