export function TitleContactCard({username}:{username: string}) {
    const avtText = "Anonymous"
    const avatarText = username?.slice(0,2) || avtText.slice(0,2)
    return (
        <div className="w-full h-[60px] p-2 flex justify-between px-5">
            <div className="flex">
                <div className="h-[35px] w-[35px] bg-gray-300 rounded-full ml-2">
                    <h1 className="text-medium font-sans font-semibold ml-[7px] mt-[5px]">{avatarText}</h1>
                </div>
                <div className="ml-3 mt-[5px] font-sans font-medium">
                    <h1>{username || avtText}</h1>
                </div>
            </div>
            <div>
                <button className="bg-sky-800 text-xl font-bold h-[40px] w-[100px] rounded-2xl text-white">
                    Pay
                </button>
            </div>
        </div>
    )
}