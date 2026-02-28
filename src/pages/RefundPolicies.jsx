import PageHero from "../components/page-hero/PageHero";
import PoliciesSection from "../components/policy/PoliciesSection";

const cancellationContent = [
    "Once a registration (MVP or Headliner) is successful, no refunds will be provided, including cases of no-shows or exam collisions.",
    "If the fest is cancelled by the institute administration, refund procedures will be initiated as per institutional guidelines.",
    "If a payment is deducted twice due to a technical error, the duplicate amount will be refunded to the original payment source within 5–7 working days.",
    "For any queries related to payment, refunds, or transaction failures, please email us at support@abhivyaktifest.in.",
];

const shippingContent = [
    "All registrations (MVP, Headliner, Flash) are digital. Your registration status will be confirmed and accessible through the website/app immediately upon successful payment.",
    "For MVP Registration holders, official Abhivyakti merchandise must be collected physically from the designated 'Merch Desk' on the IIIT Nagpur campus during the fest days (March 19–21, 2026).",
    "We do not provide home delivery or shipping services for merchandise.",
];

const RefundPolicies = () => {
    return (
        <main>
            <PageHero title="Policies" />
            <PoliciesSection title="CANCELLATION & REFUNDS" content={cancellationContent} />
            <PoliciesSection title="SHIPPING POLICY" content={shippingContent} />
        </main>
    );
};

export default RefundPolicies;
