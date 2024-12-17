'use client'
import React, { useEffect, useState } from 'react';
import HeaderBar from './HeadBarProduct';
import CreateProoduct from '../Product/CreateProduct'
import ProductHero from './ProductHero'
import { useGetProductsQuery } from '@/redux/features/product/productApi';

type Props = {}

const Product = (props: Props) => {
    const [added, setAdded] = useState(false);
    const [active, setActive] = useState(1);
    const [filters, setFilters] = useState<{ searchBy: string; search?: string; }>({
        searchBy: "idproduct",
    });

    const [currentPage, setCurrentPage] = useState(1);


    const { data: filteredData, isLoading, error, refetch, isLoading: isFetching } = useGetProductsQuery({
        page: currentPage,
        terms: filters,
        limit: 10,
    });

    useEffect(() => {
        if (added === true) {
            setAdded(false);
            refetch();
        }
        

        return () => {

        }
    }, [refetch])




    return (
        <div>
            <div className='w-full p-5'>
                <div>
                    <HeaderBar
                        active={active}
                        setActive={setActive} />
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