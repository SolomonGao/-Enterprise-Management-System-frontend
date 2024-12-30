import React, { FC } from 'react'

type Order = {
    orderId: string;
    created_at: string;
    products: string[];
}


type Props = {
    orders: Order[];
}

const OrderTable:FC<Props> = (props: Props) => {
  return (
    <div>OrderTable</div>
  )
}

export default OrderTable