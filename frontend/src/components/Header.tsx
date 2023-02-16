import LogoSvg from "../assests/logo.svg";
import { FaRegChartBar, FaPlus, FaRegTimesCircle, FaArrowRight } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import Form from "./Form";
import { useContext } from "react";
import { graphOrListContext } from "../contexts/GraphOrList"

const Header = () => {
    const { handleState, state } = useContext(graphOrListContext);

    return (
        <div className='flex justify-between'>
            <div>
                <img src={LogoSvg} />
            </div>
            <div className="flex gap-4">
                <Dialog.Root>
                    <button type="button"
                        onClick={() => handleState()}
                        className="flex gap-3 h-max border font-semibold justify-center items-center border-violet-500 px-6 py-4 rounded-lg hover:border-violet-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        {state ? (
                            <>
                                <FaArrowRight className="text-violet-500" />
                                Voltar
                            </>
                        ) : (
                            <>
                                <FaRegChartBar className="text-violet-500" />
                                Estátistica
                            </>
                        )
                        }

                    </button>
                    <Dialog.Trigger
                        type="button"
                        className="flex gap-3 h-max border font-semibold justify-center items-center border-violet-500 px-6 py-4 rounded-lg hover:border-violet-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        <FaPlus className="text-violet-500" />
                        Novo Hábito
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
                        <Dialog.Content
                            className="absolute p-10 w-1/2 h-max bg-zinc-800 -translate-y-1/2 -translate-x-1/2 top-1/2 data-[state=open]:animate-down data-[state=closed]:animate-up left-1/2 max-w-md rounded-xl"
                        >
                            <Dialog.Close className="absolute right-4 top-4">
                                <FaRegTimesCircle
                                    className="hover:fill-slate-50 object-fill fill-slate-100"
                                    size={"25px"}
                                    aria-label="Fechar"
                                />
                            </Dialog.Close>
                            <Form />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </div>
    );
}

export default Header;