"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { toggleBodyScrolling } from "~/utils/react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
};

const modalVariants = {
    hidden: {
        opacity: 0,
        y: 200,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
    },
    exit: {
        opacity: 0,
        y: 200,
    },
};

function Modal({ children, onClose, open, title }: ModalProps): JSX.Element {
    useEffect(() => {
        toggleBodyScrolling(!open);
    }, [open]);

    return (
        <AnimatePresence initial={false} mode="wait">
            {open && (
                <>
                    <motion.div
                        className="fixed bottom-0 left-0 z-40 h-device w-screen"
                        initial={{
                            backdropFilter: "blur(0px)",
                        }}
                        animate={{
                            backdropFilter: "blur(12px)",
                        }}
                        exit={{
                            backdropFilter: "blur(0px)",
                        }}
                        onClick={open ? onClose : undefined}
                    />
                    <motion.div className="fixed bottom-0 left-0 z-50 md:bottom-1/2 md:left-1/2  md:-translate-x-1/2 md:translate-y-1/2">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                            transition={{
                                ease: "easeInOut",
                                duration: 0.3,
                            }}
                            className="h-fit min-h-[60dvh] w-screen max-w-[100vw] overflow-hidden rounded-t-xl border-2 border-tertiary bg-primary shadow-lg md:min-h-0 md:w-[620px] md:rounded-2xl"
                        >
                            <div className="flex flex-grow flex-col gap-4 px-8 py-6">
                                <div className="flex items-start justify-between">
                                    <span className="text-xl font-bold text-white">
                                        {title}
                                    </span>
                                    <button onClick={onClose}>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            className="size-6"
                                        />
                                    </button>
                                </div>
                                <hr className="border-tertiary" />
                                <div className="h-fit">{children}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default Modal;
