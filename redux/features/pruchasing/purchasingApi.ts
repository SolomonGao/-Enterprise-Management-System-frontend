import { apiSlice } from '../api/apiSlice';


export const purchasingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        purchasingMaterial: builder.mutation({
            query: ({id, number, version, orderDeadline}) => ({
                url: 'purchasing/purchasing-material',
                method: 'POST',
                body: {id, number, version, orderDeadline},
                credentials: "include" as const,
            }),
        }),
        getAllPurchasing: builder.query({
            query: ({page = 1, terms: {searchBy, search}}) => {
                const params = new URLSearchParams();
                if (search) {
                    params.append('search', search);
                }
                params.append('searchBy', searchBy);
                params.append('page', page);
                return {
                    url : `/purchasing/get-all-purchasings?${params.toString()}`,
                    method: 'GET',
                    credentials: 'include' as const,
                }
            }
        }),
        startPurchasingMaterial: builder.mutation({
            query: ({_id, operator, __v}) => ({
                url: 'purchasing/start-purchasing-material',
                method: 'POST',
                body: {_id, operator, __v},
                credentials: "include" as const,
            }),
        }),
        finishPurchasingMaterial: builder.mutation({
            query: ({_id, operator, drawing_no_id, purchasedQuantity, __v}) => ({
                url: 'purchasing/finish-purchasing-material',
                method: 'POST',
                body: {_id, operator, drawing_no_id, purchasedQuantity, __v},
                credentials: "include" as const,
            }),
        }),
    }),
});

export const {
    usePurchasingMaterialMutation,
    useGetAllPurchasingQuery,
    useStartPurchasingMaterialMutation,
    useFinishPurchasingMaterialMutation,
} = purchasingApi;