import * as Toast from '@radix-ui/react-toast';
import ReactDOM from 'react-dom';
import { FaRegTimesCircle } from 'react-icons/fa';

export const ToastComponent = () => {

    return ReactDOM.createPortal(
        <Toast.Provider swipeDirection="right">
            <Toast.Root duration={3000}
                className="bg-white rounded-md p-3 relative data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[10px] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut before:w-2 before:absolute before:h-full before:bottom-0 before:left-0 before:rounded-tl-md before:rounded-bl-md before:bg-red-600"
            >
                <Toast.Title className="text-rose-500 font-bold text-lg ml-2">Erro</Toast.Title>
                <Toast.Description className="text-zinc-500 ml-2">
                    Preencha todos os campos
                </Toast.Description>
                <Toast.Close aria-label="Close" className="absolute right-2 top-2">
                    <FaRegTimesCircle
                        className="hover:fill-zinc-700 object-fill fill-zinc-800"
                        size={"25px"}
                        aria-label="Fechar"
                    />
                </Toast.Close>
            </Toast.Root>

            <Toast.Viewport className="fixed top-4 right-4 w-[300px]" />
        </Toast.Provider>,
        document.body
    )
}