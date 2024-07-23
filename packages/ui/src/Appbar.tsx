import { Button } from "./button";
import { useState } from "react";
import { SidebarItem } from "../../../apps/user-app/components/SidebarItem";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const avtText = "Anonymous"
    const avatarText = user?.name?.slice(0,2) || avtText.slice(0,2)
    return <div className="px-[80px] flex justify-between border-b px-4 bg-white">
        <div className="text-lg flex h-[100px] w-[200px] flex-col justify-center">
            <img className="h-[75px] w-[200px]" src="https://res.cloudinary.com/dau5o1mr7/image/upload/v1718612053/latest_logo_payeazzy_qyqasd.png" alt="Description of image" />
        </div>
        <div className="flex items-center">
            <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
            <SidebarItem href={"/p2p"} icon={<P2PTransferIcon />} title="P2P Transfer" />
            <div
                className={`ml-5 p-2 ${isHovered ? 'bg-sky-800 px-5' : 'bg-sky-500'} text-white text-xl rounded-xl flex items-center justify-center font-mono`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                {isHovered ? (user?.name || avtText) : avatarText}
                </div>
            <div className="pt-2 pl-4">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    </div>
}


function HomeIcon() {
    // return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    // <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    // </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
    </svg>
}

function TransactionsIcon() {
    // return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    // <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    // </svg>
}

function P2PTransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
    </svg>
  
}


