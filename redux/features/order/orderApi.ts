import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: ({order, selectedProductsId}) => ({
                url: 'order/add-order',
                method: 'POST',
                body: {order, selectedProductsId},
                credentials: "include" as const,
            }),
        }),
        getOrders: builder.query({
            query: ({page = 1, terms: {searchBy, search}}) => {
                const params = new URLSearchParams();
                if (search) {
                    params.append('search', search);
                }
                params.append('searchBy', searchBy);
                params.append('page', String(page));
                return {
                    url: `/order/get-orders?${params.toString()}`,
                    method: 'GET',
                    credentials: 'include' as const,
                }
            }
        }),
        changeStatus: builder.mutation({
            query: ({orderId, newStatus, version}) => ({
                url: '/order/change-status',
                method: 'PUT',
                body: {orderId, newStatus, version},
                credentials: "include" as const,
            })
        }),
        getRequiredMaterials: builder.query({
            query: ({ products }) => {
                const params = new URLSearchParams();
                params.append('products', JSON.stringify(products));

                return {
                    url: `/order/get-required-materials?${params.toString()}`,
                    method: 'GET',
                    credentials: 'include' as const,
                };
            }
        }),
        useRequiredMaterials: builder.mutation({
            query: ({ materials }) => ({
                url: '/order/use-required-materials',
                method: 'PUT',
                body: { materials },
                credentials: 'include' as const,
            })
        })
    }),
});

export const {
    useAddOrderMutation,
    useGetOrdersQuery,
    useChangeStatusMutation,
    useGetRequiredMaterialsQuery,
    useLazyGetRequiredMaterialsQuery,
    useUseRequiredMaterialsMutation,
    
} = orderApi;