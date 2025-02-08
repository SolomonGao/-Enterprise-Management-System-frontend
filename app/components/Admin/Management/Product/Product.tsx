'use client'
import React, { useEffect, useState } from 'react';
import HeaderBar from '../Headbar';
import CreateProoduct from '../Product/CreateProduct'
import ProductHero from './ProductHero'
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import toast from 'react-hot-toast';

type Props = {}

const Product = (props: Props) => {
    const [added, setAdded] = useState(false);
    const [active, setActive] = useState(1);
    const [filters, setFilters] = useState<{ searchBy: string; search?: string; }>({
        searchBy: "idproduct",
    });

    const [currentPage, setCurrentPage] = useState(1);


    const { data: filteredData, isSuccess, error, refetch, isLoading: isFetching } = useGetProductsQuery({
        page: currentPage,
        terms: filters,
        limit: 10,
    });

    useEffect(() => {
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log('An error occured: ', error);
            }
        }
    }, [error]);

    useEffect(() => {
        if (added === true) {
            setAdded(false);
            refetch();
        }
    }, [refetch])

    return (
        <div>
            <div className='w-full p-5'>
                <div>
                    <HeaderBar
                        active={active}
                        setActive={setActive}
                        navItems={{
                            items: [
                                { id: 1, label: '主页' },
                                { id: 2, label: '添加' },
                                { id: 3, label: '监控' },
                            ]
                        }}
                    />
                </div>
                <div>
                    {
                        active === 1 && (
                            <div>
                                <ProductHero
                                    filteredData={filteredData}
                                    filters={filters}
                                    setFilters={setFilters}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    isFetching={isFetching}
                                    refetch={refetch}
                                />
                            </div>
                        )
                    }
                    {
                        active === 2 && (
                            <div>
                                <CreateProoduct
                                    setAdded={setAdded}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Product