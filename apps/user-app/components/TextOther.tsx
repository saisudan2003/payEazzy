export function TextOther({ text }:{text: string}) {
    return (
        <div className="text-white bg-black max-w-[50%] rounded-2xl p-2">
            {text}
        </div>
    );
}