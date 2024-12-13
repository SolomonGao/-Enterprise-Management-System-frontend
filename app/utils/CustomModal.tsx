import React, { FC } from 'react'
import { Modal, Box } from "@mui/material";
import {FaTimes} from "react-icons/fa"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;

}

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
      >
        <div
        className='absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white cursor pointer'
        onClick={() => setOpen(false)}
        >
          <FaTimes size={20} />
        </div>
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  )
}

export default CustomModal