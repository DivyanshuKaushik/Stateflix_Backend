import { ReactChild } from "react";

interface Props {
    children: ReactChild;
    title: string;
    show: boolean;
    setShow: any;
    save: boolean;
}

const Modal = ({children,title,show,setShow,save}:Props) => {
    return (
        <>
            {show && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl text-red-500 opacity-80">
                                        {title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShow(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            close
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {children}
                                </div>
                                {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShow(false)}
                                            >
                                            Close
                                        </button>
                                            {save &&
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShow(false)}
                                        >
                                            Save Changes
                                        </button>
                                }
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                </>
            )}
        </>
    );
};

// const Modal = ({ children, title, show, setShow, save }: Props) => {
//     return (
//         <>
//             {show && (
//                 <dialog
//                     className="bg-transparent z-0 absolute w-screen h-screen"
//                 >
//                     <div className="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 opacity-0">
//                         <div className="bg-white flex rounded-lg w-1/2 relative">
//                             <div className="flex flex-col items-start">
//                                 <div className="p-7 flex items-center w-full">
//                                     <div className="text-gray-900 font-bold text-lg">
//                                         Modal Centered
//                                     </div>
//                                     <svg
//                                         onClick={() => setShow(false)}
//                                         className="ml-auto fill-current text-gray-700 w-5 h-5 cursor-pointer"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 18 18"
//                                     >
//                                         <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
//                                     </svg>
//                                 </div>

//                                 <div className="px-7 overflow-x-hidden overflow-y-auto max-h-[40vh]">
//                                     <p>First Line</p>
                                   
                                 
//                                     <p>Last Line</p>
//                                 </div>

//                                 <div className="p-7 flex justify-end items-center w-full">
//                                     <button
//                                         type="button"
//                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
//                                     >
//                                         Ok
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShow(false)}
//                                         className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//                                     >
//                                         Close
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </dialog>
//             )}
//         </>
//     );
// };

export default Modal;
