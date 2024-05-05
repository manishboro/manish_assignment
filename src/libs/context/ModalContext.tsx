import React, { createContext, useContext, useState } from "react";

import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const ModalContext = createContext<{
  handleModalOpen: () => void;
  handleModalClose: () => void;
  setIsClickOutside: React.Dispatch<React.SetStateAction<boolean>>;
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
} | null>(null);

export const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClickOutside, setIsClickOutside] = useState(true);
  const [Component, setComponent] = useState<React.ReactNode | null>(null);

  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => {
    setIsOpen(false);
    setComponent(null);
    setIsClickOutside(true);
  };

  return (
    <ModalContext.Provider
      value={{
        handleModalOpen,
        handleModalClose,
        setIsClickOutside,
        setComponent,
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => isClickOutside && handleModalClose()}
        closeAfterTransition
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          style={{
            zIndex: 10001,
            width: "max-content",
            outline: "none",
            border: "none",
          }}
        >
          {Component}
        </Box>
      </Modal>

      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
