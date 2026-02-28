// src/pages/PassesStay.jsx

import PassesStayHero from "../components/passes-&-stay/PassesStayHero";
import PassesSection from "../components/passes-&-stay/PassesSection";
import FAQHint from "../components/ui/FAQHint";

const PassesStay = () => {
    return (
        <main>
            <PassesStayHero />
            <PassesSection />
            <FAQHint label="How passes work" />
        </main>
    );
};

export default PassesStay;
