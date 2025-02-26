import { useGetAllPurchasingQuery } from '@/redux/features/pruchasing/purchasingApi';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import HeaderBar from '../Headbar';
import PurchasingHero from "./PurchasingHero";

type Props = {
  user: any;
}

const Purchasing: FC<Props> = (props: Props) => {

  const [currentPage, setCurrentPage] = useState(1);

  const [active, setActive] = useState(1);

  const [filters, setFilters] = useState<{ searchBy: string; search?: string; }>({
    searchBy: "_id",
  });

  const { data: filteredData, error, refetch, isLoading: isFetching } = useGetAllPurchasingQuery({
    page: currentPage,
    terms: filters,
    limit: 10,
  }, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

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
                { id: 2, label: '修改' },
                { id: 3, label: '监控' },
              ]
            }}
            />
        </div>

        <div>
          {active === 1 && (
            <div>
              <PurchasingHero
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

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Purchasing