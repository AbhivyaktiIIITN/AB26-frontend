import PageHero from "../components/page-hero/PageHero";
import PoliciesSection from "../components/policy/PoliciesSection";

const termsContent = [
    "By completing any registration for Abhivyakti 2026, participants agree to comply with the rules of IIIT Nagpur and the specific event guidelines.",
    "Participation is open to all bona fide students holding a valid college identity card.",
    "The MVP, Headliner, and Flash registrations are non-transferable and must be presented at the entry gate for validation.",
    "The organizing committee holds the right to record and upload any performance held during the fest on various media platforms.",
    "Any misconduct, damage to college property, or use of prohibited substances will lead to immediate disqualification and removal from the campus without a refund.",
];

const privacyContent = [
    "We collect your name, college, roll number, email, and contact details solely for registration purposes.",
    "Your data is utilized to facilitate your digital registration and to send official fest-related updates.",
    "Payment details are handled securely by Razorpay; Abhivyakti 2026 does not store your credit/debit card or UPI information.",
    "Personal data is not sold to third parties and is shared only with internal teams to facilitate event logistics.",
];

const LegalPolicies = () => {
    return (
        <main>
            <PageHero title="Legal" />
            <PoliciesSection title="TERMS & CONDITIONS" content={termsContent} />
            <PoliciesSection title="PRIVACY POLICY" content={privacyContent} />
        </main>
    );
};

export default LegalPolicies;
