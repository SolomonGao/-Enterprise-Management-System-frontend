import React, { FC } from 'react'
import { Modal, Box } from "@mui/material";
import {FaTimes} from "react-icons/fa"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute: (route: string) => void;

}

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {

  const handleClose = () => {
    setRoute("Login");
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
       className="absolute max-h-[90vh] max-w-[500px] overflow-auto top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"

      >
        <div
        className='absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white cursor pointer'
        onClick={handleClose}
        >
          <FaTimes size={20} />
        </div>
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  )
}

export default CustomModal