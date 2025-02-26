'use client'
import React, { FC, useEffect, useState } from 'react'
import HeaderBar from '../Headbar';
import OrderHero from './OrderHero';
import CreateOrder from './CreateOrder';
import { useGetOrdersQuery } from '@/redux/features/order/orderApi';
import toast from 'react-hot-toast';
import EditOrder from "./EditOrder";

type Props = {
  user: any;
}

const Order: FC<Props> = (props: Props) => {

  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(1);
  const [filters, setFilters] = useState<{ searchBy: string; search?: string; }>({
    searchBy: "customer",
  });

  const [currentPage, setCurrentPage] = useState(1);


  const { data: filteredData, isLoading, error, refetch, isLoading: isFetching } = useGetOrdersQuery({
    page: currentPage,
    terms: filters,
    limit: 10,
  }, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
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
  }, [refetch, added])

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
                { id: 3, label: '修改' },
                { id: 4, label: '监控' },
              ]
            }}
          />
        </div>
        <div>
          {active === 1 && (
            <div>
              <OrderHero
                user={props.user}
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
                refetch={refetch}
              />
            </div>
          )}

          {active === 3 && (
            <div>
              <EditOrder
                user={props.user}
                filteredData={filteredData}
                setFilters={setFilters}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isFetching={isFetching}
                refetch={refetch}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Order