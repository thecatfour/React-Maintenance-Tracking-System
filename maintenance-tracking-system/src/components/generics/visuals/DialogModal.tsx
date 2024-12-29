import { Dialog, DialogPanel } from "@headlessui/react";

interface ComponentProps {
    open: boolean;
    onClose: (value: boolean) => void;
    children: any
}

const DialogModal: React.FC<ComponentProps> = ({ open, onClose, children }) => {
    return (
        <Dialog
                open={open}
                onClose={() => onClose(false)}
                className="relative z-50"
            >
                <div className="fixed bg-black/50 inset-0 w-screen">
                    <div className="flex min-h-full items-center justify-center">
                        <DialogPanel
                            className="w-fit max-w-md bg-white/20 p-4"
                        >
                            {children}
                        </DialogPanel>
                    </div>
                </div> 
            </Dialog>
    );
}

export default DialogModal;