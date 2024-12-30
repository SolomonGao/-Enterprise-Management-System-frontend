'use client'
import React, { FC, useEffect, useState } from 'react'
import HeaderBar from './HeadBarOrder';
import OrderHero from './OrderHero';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import CreateOrder from './CreateOrder';

type Props = {}

const Order: FC<Props> = (props: Props) => {

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
          {active === 1 && (
            <div>
              <OrderHero
                filteredData={filteredData}
                filters={filters}
                setFilters={setFilters}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isFetching={isFetching}
                refetch={refetch}
              />
            </div>
          )}

          {active === 2 && (
            <div>
              <CreateOrder
                setAdded={setAdded}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Order