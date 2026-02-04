const SponsorCard = ({ logo, alt }) => {
    return (
        <div
            className="
        w-24 h-24 sm:w-36 sm:h-36
        rounded-3xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        flex items-center justify-center
      "
        >
            <img
                src={logo}
                alt={alt}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="max-w-[70%] max-h-[70%] object-contain"
            />
        </div>
    );
};

export default SponsorCard;
