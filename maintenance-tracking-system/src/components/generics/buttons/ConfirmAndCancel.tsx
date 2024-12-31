
interface ComponentProps {
    onConfirm: () => void;
    onClose: (value: boolean) => void;
}

const ConfirmAndCancel: React.FC<ComponentProps> = ({ onConfirm, onClose }) => {
    const onCancel = (event: any) => {
        event.preventDefault();
        onClose(false);
    }

    return (
        <div className="flex justify-between">
            <button onClick={onConfirm} className="bg-green-700 hover:bg-green-800 px-1 py-0.5 rounded-lg" data-testid="2-confirm">
                Confirm
            </button>
            <button onClick={onCancel} className="bg-red-700 hover:bg-red-800 px-1 py-0.5 rounded-lg" data-testid="2-cancel">
                Cancel
            </button>
        </div>
    );
}

export default ConfirmAndCancel;
