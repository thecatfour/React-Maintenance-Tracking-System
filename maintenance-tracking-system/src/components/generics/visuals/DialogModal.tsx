import { Dialog, DialogPanel } from "@headlessui/react";

interface ComponentProps {
    open: boolean;
    onClose: (value: boolean) => void;
    children: any
}

/**
 * This component renders a modal on the screen. It renders any children in the component
 * onto the modal
 * @param open The boolean that determines if the modal is open
 * @param onClose The function to call to close the modal
 * @param children Any elements rendered in the modal
 */
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
                            className="w-fit max-h-[80vh] bg-neutral-700 p-4 overflow-y-auto text-white"
                            data-testid="dialog-modal"
                        >
                            {children}
                        </DialogPanel>
                    </div>
                </div> 
            </Dialog>
    );
}

export default DialogModal;
