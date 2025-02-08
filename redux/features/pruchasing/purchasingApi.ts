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
        })
    }),
});

export const {
    usePurchasingMaterialMutation,
    useGetAllPurchasingQuery
} = purchasingApi;