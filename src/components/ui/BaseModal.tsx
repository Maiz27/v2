import { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CTA from '../CTA/CTA';
import useLockBodyScroll from '@/lib/hooks/useLockBodyScroll';

type ActionProps = {
  action: () => void;
  text?: string;
};

type Props = {
  children: ReactNode;
  buttonText: string;
  buttonIcon?: JSX.Element;
  classNames?: string;
  confirm?: ActionProps;
  cancel?: ActionProps;
};

const BaseModal = ({
  buttonText,
  buttonIcon,
  children,
  classNames = 'max-w-lg',
  confirm,
  cancel,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);

  const handleConfirm = () => {
    setIsOpen(false);
    confirm?.action();
  };

  const handleCancel = () => {
    setIsOpen(false);
    cancel?.action();
  };

  return (
    <>
      <CTA
        text={buttonText}
        icon={buttonIcon!}
        onClick={() => setIsOpen(true)}
        className={`w-fit normal-case ${classNames}`}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className='bg-foreground/10 backdrop-blur p-6 fixed inset-0 z-50 grid place-items-center cursor-pointer'
          >
            <motion.div
              initial={{ scale: 0, rotate: '12.5deg' }}
              animate={{ scale: 1, rotate: '0deg' }}
              exit={{ scale: 0, rotate: '0deg' }}
              onClick={(e) => e.stopPropagation()}
              className='bg-foreground/50 p-6 rounded-lg w-full shadow-xl max-w-lg border border-copy/10 cursor-default relative overflow-hidden'
            >
              <div className='w-full flex flex-col gap-8'>
                {children}
                <div className='flex items-center gap-2'>
                  <CTA
                    text={cancel?.text || 'Cancel'}
                    onClick={handleCancel}
                    className='normal-case'
                  />

                  <CTA
                    text={confirm?.text || 'Confirm'}
                    onClick={handleConfirm}
                    className='border-primary border text-primary opacity-100 normal-case'
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BaseModal;
