import { useNavigate } from "react-router-dom";

const SponsorCard = ({ logo, alt }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/sponsors")}
            className="
        w-28 h-28 sm:w-40 sm:h-40
        rounded-4xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        flex items-center justify-center
        cursor-pointer
      "
        >
            <img
                src={logo}
                alt={alt}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="w-[80%] h-[80%] object-contain rounded-2xl sm:rounded-3xl"
            />
        </div>
    );
};

export default SponsorCard;
