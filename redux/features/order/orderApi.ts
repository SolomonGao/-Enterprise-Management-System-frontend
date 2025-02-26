import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: ({order, selectedProductsId}) => ({
                url: '/order/add-order',
                method: 'POST',
                body: {order, selectedProductsId},
                credentials: "include" as const,
            }),
        }),
        getOrders: builder.query({
            query: ({page = 1, terms: {searchBy, search}}) => {
                const params = new URLSearchParams();
                if (searchBy === '_id') {
                    params.append('exactId', search);  // 使用不同的参数名来区分
                } else if (search) {
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
                body: {
                    orderId,
                    newStatus,
                    version
                },
                credentials: "include" as const,
            })
        }),
        getRequiredMaterials: builder.query({
            query: ({ materials }) => {
                const params = new URLSearchParams();
                params.append('materials', JSON.stringify(materials));

                return {
                    url: `/order/get-required-materials?${params.toString()}`,
                    method: 'GET',
                    credentials: 'include' as const,
                };
            }
        }),
        updateRequiredMaterials: builder.mutation({
            query: ({ materials }) => ({
                url: '/order/use-required-materials',
                method: 'PUT',
                body: { materials },
                credentials: 'include' as const,
            })
        }),
        updateOrder: builder.mutation({
            query: ({orderId, orderInfo, version}) => ({
                url: '/order/update-order',
                method: 'PUT',
                body: {
                    orderId,
                    orderInfo,
                    version
                },
                credentials: "include" as const,
            }),
        }),
        restoreInventory: builder.mutation({
            query: ({orderId}) => ({
                url: '/order/restore-inventory',
                method: 'POST',
                body: { 
                    orderId,
                },
                credentials: "include" as const,
            })
        }),
    }),
});

export const {
    useAddOrderMutation,
    useGetOrdersQuery,
    useChangeStatusMutation,
    useUpdateOrderMutation,
    useGetRequiredMaterialsQuery,
    useLazyGetRequiredMaterialsQuery,
    useUpdateRequiredMaterialsMutation,
    useRestoreInventoryMutation
} = orderApi;