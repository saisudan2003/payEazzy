export function ContactCard({username}:{username: string}) {
    const avtText = "Anonymous"
    const avatarText = username?.slice(0,2) || avtText.slice(0,2)
    return (
        <div className="w-full h-[50px] bg-white rounded-2xl p-2 flex">
            <div className="h-[35px] w-[35px] bg-gray-300 rounded-full ml-2">
                <h1 className="text-medium font-sans font-semibold ml-[7px] mt-[5px]">{avatarText}</h1>
            </div>
            <div className="ml-3 mt-[5px] font-sans font-medium">
                <h1>{username || avtText}</h1>
            </div>
        </div>
    )
}