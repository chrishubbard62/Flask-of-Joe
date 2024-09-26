import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './DeleteModalContext.css';

const DeleteModalContext = createContext();

export function ModalProvider({ children }) {
  const deleteModalRef = useRef();
  const [deleteModalContent, setDeleteModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setDeleteModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    deleteModalContent, // React component to render inside modal
    setDeleteModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <DeleteModalContext.Provider value={contextValue}>
        {children}
      </DeleteModalContext.Provider>
      <div ref={deleteModalRef} />
    </>
  );
}

export function Modal() {
  const { deleteModalRef, deleteModalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!deleteModalRef || !deleteModalRef.current || !deleteModalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="delete-modal">
      <div id="delete-modal-background" onClick={closeModal} />
      <div id="delete-modal-content">
        {deleteModalContent}
      </div>
    </div>,
    deleteModalRef.current
  );
}

export const useDeleteModal = () => useContext(DeleteModalContext);
