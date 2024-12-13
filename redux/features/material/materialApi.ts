
import { apiSlice } from "../api/apiSlice";

export const materialApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addRoot: builder.mutation({
            query: (rootName) => ({
                url: "root/add-root",
                method: "POST",
                body: { rootName },
                credentials: "include" as const,
            })
        }),
        addMaterial: builder.mutation({
            query: (material) => ({
                url: 'leaf/add-material',
                method: 'POST',
                body: material,
                credentials: "include" as const,
            }),
        }),
        getAllRoot: builder.query({
            query: () => ({
                url: `root/get-all-root`,// 对应后端路由 /users
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getMaterialsByRoot: builder.query({
            query: ({
                category,
                terms: { searchBy, countsRange, search },
                page = 1,
            }: {
                category?: string;
                terms: {
                    searchBy: string;
                    countsRange?: string;
                    search?: string;
                };
                page?: number;
            }) => {
                const params = new URLSearchParams();

                // 添加分类参数
                if (category) {
                    params.append('root_materials_idroot_materials', category);
                }

                // 添加搜索列和关键字参数
                if (searchBy === "counts" && countsRange) {
                    params.append('countsRange', countsRange);
                } else if (search) {
                    params.append('search', search);
                }

                params.append('searchBy', searchBy);

                // 添加分页参数
                params.append('page', String(page));

                return {
                    url: `/leaf/get-materials-by-root?${params.toString()}`,
                    method: "GET",
                    credentials: 'include' as const
                };
            }
        }),
    })
})

export const { useAddRootMutation, useGetAllRootQuery, useGetMaterialsByRootQuery, useAddMaterialMutation} = materialApi;