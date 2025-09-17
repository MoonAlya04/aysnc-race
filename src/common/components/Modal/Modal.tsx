import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

function Modal({ children, isOpen }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      className="fixed top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-10"
    >
      {children}
    </div>,
    document.getElementById('modal-portal')!,
  );
}

export default Modal;
