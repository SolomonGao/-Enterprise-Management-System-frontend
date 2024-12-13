import React, { FC } from 'react'

type Props = {
    user: any;
}

const Order: FC<Props> = ({user}: Props) => {
  return (
    <div> my ORDER</div>
  )
}

export default Order