const ExploreCard = ({ bg, text, cta, asset, assetClass }) => {
    return (
        <div className="w-[320px] rounded-[5px] border-[10px] border-[#f2e1c2] bg-[#7b4a2e] flex flex-col relative group cursor-pointer transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">

            <div className="relative h-38 w-full overflow-hidden rounded-t-[4px]">
                <img src={bg} className="w-full h-full object-cover" alt="" />

                {text && (
                    <img
                        src={text}
                        className="absolute  top-4 left-1/2 -translate-x-1/2 w-[75%] rounded-2xl z-10 transition-transform duration-300 group-hover:scale-110"
                        alt=""
                    />
                )}
            </div>

            {asset && (
                <img
                    src={asset}
                    className={`absolute rounded left-1/2  -translate-x-1/2 z-30 transition-transform duration-300 group-hover:scale-105 ${assetClass}`}
                    alt=""
                />
            )}

            <div className="h-[52px] bg-[#8c5a3c] text-white font-semibold flex items-center justify-center z-20 relative border-t-2 border-[#f2e1c2]/20 rounded-b-[4px] transition-all duration-300 group-hover:shadow-[inset_0_6px_10px_rgba(0,0,0,0.5)]">
                <span className="mt-1 transition-transform duration-300 group-hover:scale-105">{cta}</span>
            </div>
        </div>
    );
};
export default ExploreCard