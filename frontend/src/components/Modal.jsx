import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) {
  const { theme } = useTheme();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <motion.div
              className={`
                inline-block w-full ${maxWidth} p-6 my-8 
                text-left align-middle transition-all transform 
                ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                shadow-xl rounded-2xl
              `}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 flex justify-between items-center"
              >
                {title}
                <button
                  onClick={onClose}
                  className={`
                    p-1 rounded-full 
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                    transition-colors duration-200
                  `}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </Dialog.Title>
              <div className="mt-4">{children}</div>
            </motion.div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}