import { useEffect, useState } from "react";
import styles from "./passesSection.module.css";
import { motion } from "framer-motion";
import ComingSoon from "../common/ComingSoon/ComingSoon";

import { getAccommodationTypes, getPassesTypes } from "../../lib/passes-accommodation-client";
import { serialIdToABID } from "../../utils/abid-utils";
import { createPaymentOrder } from "../../lib/payment-client";
import { getUserProfile } from "../../lib/user-client";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import { passTemplates, accommodationTemplates } from "../../data/passesStayData";

const PassesSection = () => {
    const { user, isAuthenticated } = useAuth();
    const { showToast } = useToast();

    const [passes, setPasses] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [loadingPassId, setLoadingPassId] = useState(null);
    const [loadingAccommodationId, setLoadingAccommodationId] = useState(null);
    const [profileSerialId, setProfileSerialId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setDataLoading(true);
            try {
                const [passesResult, accommodationsResult] = await Promise.all([
                    getPassesTypes(),
                    getAccommodationTypes(),
                ]);
                if (passesResult.success) setPasses(passesResult.data || []);
                if (accommodationsResult.success) setAccommodations(accommodationsResult.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setDataLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!user?.id) return;
        getUserProfile(user.id)
            .then((data) => setProfileSerialId(data?.user?.serialId ?? null))
            .catch((e) => console.error("[PassesSection] getUserProfile error:", e));
    }, [user?.id]);


    const buildPaymentUrl = (baseLink, orderId) => {
        if (!baseLink) throw new Error("Payment link not available for this item.");
        let url;
        try {
            url = new URL(baseLink);
        } catch {
            throw new Error("Invalid payment link received from server.");
        }

        // Add custom query params directly
        url.searchParams.set('order_id', orderId);
        url.searchParams.set('ab_id', serialIdToABID(profileSerialId) || "");
        url.searchParams.set('email', user?.email || "");

        // Prefill data
        url.searchParams.set('name', user?.name || "");
        url.searchParams.set('email', user?.email || "");

        const rawPhone = user?.phoneNumber || "";
        const phone = rawPhone.startsWith("+91") ? rawPhone : `+91${rawPhone}`;
        url.searchParams.set('phone', phone);

        return url.toString();
    };

    const handleBuyPass = async (pass) => {
        if (!isAuthenticated) {
            showToast("Please login first", "error");
            return;
        }
        setLoadingPassId(pass.id);
        try {
            const { order } = await createPaymentOrder({ passTypeId: pass.id });
            showToast("Redirecting to payment...", "success");
            window.location.href = buildPaymentUrl(pass.paymentPageLink, order.id);
        } catch (error) {
            console.error("Error:", error);
            showToast(error.message || "Failed to create order", "error");
        } finally {
            setLoadingPassId(null);
        }
    };

    const handleBuyAccommodation = async (accommodation) => {
        if (!isAuthenticated) {
            showToast("Please login first", "error");
            return;
        }
        setLoadingAccommodationId(accommodation.id);
        try {
            const { order } = await createPaymentOrder({ accommodationTypeId: accommodation.id });
            showToast("Redirecting to payment...", "success");
            window.location.href = buildPaymentUrl(accommodation.paymentPageLink, order.id);
        } catch (error) {
            console.error("Error:", error);
            showToast(error.message || "Failed to create order", "error");
        } finally {
            setLoadingAccommodationId(null);
        }
    };

    const Card = ({ template, apiItem, isAccommodation }) => {
        // Fallback UI mapped to DB
        const isLive = !!apiItem;
        const capacity = isLive ? apiItem.count : 0;
        const bought = isLive ? (isAccommodation ? apiItem.countBooked : apiItem.countPurchased) : 0;
        const available = Math.max(0, capacity - bought);
        const ratio = capacity > 0 ? (bought / capacity) * 100 : 0;

        const isSoldOut = isLive ? (capacity <= bought) : true;
        const isLoading = isAccommodation ? loadingAccommodationId === template.id : loadingPassId === template.id;

        const onBuy = () => isAccommodation ? handleBuyAccommodation(apiItem) : handleBuyPass(apiItem);

        return (
            <motion.div
                className={styles.cardWrapper}
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                <motion.div
                    className={styles.cardShadow}
                    variants={{
                        rest: { x: 0, y: 0, opacity: 0 },
                        hover: { x: 8, y: 8, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
                    }}
                />
                <motion.div
                    className={`${styles.card} ${isAccommodation ? styles.accommodationCard : ""}`}
                    variants={{
                        rest: { x: 0, y: 0 },
                        hover: { x: -8, y: -8, transition: { duration: 0.3, ease: "easeOut" } }
                    }}
                >
                    <h3 className={styles.cardTitle}>{template.title}</h3>
                    {template.subtitle && <p className={styles.cardSubtitle}>{template.subtitle}</p>}

                    <div className={styles.cardContent}>
                        {template.details?.map((detail, idx) => (
                            <div key={idx} className={styles.infoRow} style={{ gridTemplateColumns: detail.label ? "80px 1fr" : "1fr" }}>
                                {detail.label && <span className={styles.infoLabel}>{detail.label}</span>}
                                <span className={styles.infoText} style={{ whiteSpace: "pre-line" }}>{detail.text}</span>
                            </div>
                        ))}

                        {/* Capacity meter */}
                        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                            {template.gender && (
                                <div style={{ marginBottom: "12px", color: "white", fontSize: "0.95rem" }}>
                                    {template.gender}
                                </div>
                            )}
                            {isLive && (
                                <div style={{ textAlign: 'center', fontSize: '0.95rem', color: isSoldOut ? '#ef4444' : '#ffdab9', fontWeight: 'bold', fontStyle: 'italic' }}>
                                    {isSoldOut
                                        ? "Fully Sold Out"
                                        : `Hurry Up! Only ${available} Spots Remaining!`
                                    }
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.priceDisplay}>{isLive && apiItem.price ? `₹${apiItem.price}` : template.fallbackPrice}</span>
                        <button
                            className={styles.buyBtn}
                            onClick={onBuy}
                            disabled={isLoading || !isLive || isSoldOut}
                            style={{ opacity: (isLoading || !isLive || isSoldOut) ? 0.6 : 1, cursor: (isLoading || !isLive || isSoldOut) ? 'not-allowed' : 'pointer' }}
                        >
                            {isLoading ? "Redirecting..." : !isLive ? "Unavailable" : isSoldOut ? (isAccommodation ? "Fully Booked" : "Sold Out") : "Buy Now"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className={styles.section}>

            {/* COMBO PASSES */}
            <div>
                <div className={styles.headerGroup}>
                    <div className={styles.subLabel}>Combo Passes</div>
                    <h2 className={styles.mainTitle}><span className={styles.whiteText}>CHOOSE YOUR</span> <br /> EXPERIENCE</h2>
                </div>
                <div className={styles.cardsGrid}>
                    {passTemplates.map((template) => {
                        const apiItem = passes.find(p => p.id === template.id);
                        return <Card key={`pass-${template.id}`} template={template} apiItem={apiItem} isAccommodation={false} />;
                    })}
                </div>
            </div>

            {/* ACCOMMODATION */}
            <div>
                <div className={styles.headerGroup}>
                    <div className={styles.subLabel}>Accommodation</div>
                    <h2 className={styles.mainTitle}>ACCOMODATION</h2>
                </div>
                <div className={styles.cardsGrid}>
                    {accommodationTemplates.map((template) => {
                        const apiItem = accommodations.find(a => a.id === template.id);
                        return <Card key={`acc-${template.id}`} template={template} apiItem={apiItem} isAccommodation={true} />;
                    })}
                </div>
            </div>

        </div>
    );
};

export default PassesSection;
