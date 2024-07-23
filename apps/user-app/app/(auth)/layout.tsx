import { Appbar2 } from "@repo/ui/appbar2"

export default function layout({
    children
}:{
    children: React.ReactNode;
}) {
    return <>
    <div className="h-screen w-screen bg-gray-100">
        <Appbar2 />
        {children}
    </div>
    </>
}