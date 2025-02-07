import { apiSlice } from '../api/apiSlice';


export const purchasingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        purchasingMaterial: builder.mutation({
            query: ({id, number, version}) => ({
                url: 'purchasing/purchasing-material',
                method: 'POST',
                body: {id, number, version},
                credentials: "include" as const,
            }),
        })
    }),
});

export const {
    usePurchasingMaterialMutation,

} = purchasingApi;