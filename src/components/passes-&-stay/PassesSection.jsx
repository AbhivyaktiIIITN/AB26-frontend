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
import { useProfileCheck } from "../../hooks/useProfileCheck";
import { useAuthModal } from "../auth/ModalAuthLayout";

const PassesSection = () => {
    const { user, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const { openAuth } = useAuthModal();
    const { requireCompleteProfile } = useProfileCheck();

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


    const buildPaymentUrl = (baseLink, orderId, days) => {
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
        if (days) url.searchParams.set('days', days);

        // Prefill data
        url.searchParams.set('name', user?.name || "");
        url.searchParams.set('email', user?.email || "");

        const rawPhone = user?.phoneNumber || "";
        const phone = rawPhone.startsWith("+91") ? rawPhone : `+91${rawPhone}`;
        url.searchParams.set('phone', phone);

        return url.toString();
    };

    const handleBuyPass = async (pass) => {
        setLoadingPassId(pass.id);
        const canProceed = await requireCompleteProfile();
        if (!canProceed) {
            setLoadingPassId(null);
            return;
        }

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

    const handleBuyAccommodation = async (accommodation, days) => {
        setLoadingAccommodationId(accommodation.id);
        const canProceed = await requireCompleteProfile();
        if (!canProceed) {
            setLoadingAccommodationId(null);
            return;
        }

        try {
            const { order } = await createPaymentOrder({
                accommodationTypeId: accommodation.id,
                days: days
            });
            showToast("Redirecting to payment...", "success");
            window.location.href = buildPaymentUrl(accommodation.paymentPageLink, order.id, days);
        } catch (error) {
            console.error("Error:", error);
            showToast(error.message || "Failed to create order", "error");
        } finally {
            setLoadingAccommodationId(null);
        }
    };

    const isMaintenanceMode = false;

    return (
        <div className={styles.section}>
            <div>
                <div className={styles.headerGroup}>
                    <div className={styles.subLabel}>Combo Passes</div>
                    <h2 className={styles.mainTitle}><span className={styles.whiteText}>CHOOSE YOUR</span> <br /> EXPERIENCE</h2>
                    {/* {isMaintenanceMode && (
                        <div style={{ marginTop: "15px", padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", maxWidth: "100%" }}>
                            <p style={{ color: "#ffdab9", fontSize: "1rem", margin: 0, lineHeight: "1.4" }}>
                                Online registrations are temporarily suspended for maintenance. <br />
                                To buy passes call us at: <a href="tel:+919799729577" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", whiteSpace: "nowrap", display: "inline-block" }}>+91 97997 29577</a>
                            </p>
                        </div>
                    )} */}
                </div>
                <div className={styles.cardsGrid}>
                    {passTemplates
                        .filter(template => {
                            if (template.restrictedInternalOnly) {
                                return user?.email?.toLowerCase().endsWith("@iiitn.ac.in");
                            }
                            return true;
                        })
                        .map((template) => {
                            const apiItem = passes.find(p => p.id === template.id);
                            return (
                                <Card
                                    key={`pass-${template.id}`}
                                    template={template}
                                    apiItem={apiItem}
                                    isAccommodation={false}
                                    onBuy={() => handleBuyPass(apiItem)}
                                    isLoading={loadingPassId === apiItem?.id}
                                    isMaintenanceMode={isMaintenanceMode}
                                />
                            );
                        })}
                </div>
            </div>

            <div style={{ marginTop: "60px" }}>
                <div className={styles.headerGroup}>
                    <div className={styles.subLabel}>Accommodation</div>
                    <h2 className={styles.mainTitle}>ACCOMMODATION</h2>
                    {/* {isMaintenanceMode && (
                        <div style={{ marginTop: "15px", padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", maxWidth: "100%" }}>
                            <p style={{ color: "#ffdab9", fontSize: "1rem", margin: 0, lineHeight: "1.4" }}>
                                Online registrations are temporarily suspended for maintenance. <br />
                                To book accomodation call us at: <a href="tel:+919644361455" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", whiteSpace: "nowrap", display: "inline-block" }}>+91 96443 61455</a>
                            </p>
                        </div>
                    )} */}
                </div>
                <div className={styles.cardsGrid}>
                    {accommodationTemplates.map((template) => {
                        const apiItem = accommodations.find(a => a.id === template.id);
                        return (
                            <Card
                                key={`acc-${template.id}`}
                                template={template}
                                apiItem={apiItem}
                                isAccommodation={true}
                                onBuy={(days) => handleBuyAccommodation(apiItem, days)}
                                isLoading={loadingAccommodationId === apiItem?.id}
                                isMaintenanceMode={isMaintenanceMode}
                            />
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

const Card = ({ template, apiItem, isAccommodation, onBuy, isLoading, isMaintenanceMode }) => {
    const [days, setDays] = useState(1);

    // Fallback UI mapped to DB
    const isLive = !!apiItem;
    const capacity = isLive ? apiItem.count : 0;
    const bought = isLive ? (isAccommodation ? apiItem.countBooked : apiItem.countPurchased) : 0;
    const available = Math.max(0, capacity - bought);
    const isSoldOut = isLive ? (capacity <= bought) : true;

    const handleIncrement = (e) => {
        e.stopPropagation();
        if (days < 3) setDays(days + 1);
    };

    const handleDecrement = (e) => {
        e.stopPropagation();
        if (days > 1) setDays(days - 1);
    };

    const handleBuyClick = () => {
        if (isAccommodation) {
            onBuy(days);
        } else {
            onBuy();
        }
    };

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
                    hover: { x: 4, y: 4, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
                }}
            />
            <motion.div
                className={`${styles.card} ${isAccommodation ? styles.accommodationCard : ""}`}
                variants={{
                    rest: { x: 0, y: 0 },
                    hover: { x: -4, y: -4, transition: { duration: 0.3, ease: "easeOut" } }
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

                    <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                        {isLive && !isSoldOut && apiItem.price && template.basePrice && apiItem.price < Number(template.basePrice) && (
                            <div style={{ textAlign: 'center', fontSize: '0.95rem', color: '#ffdab9', fontWeight: 'bold', fontStyle: 'italic' }}>
                                Early Bird Offer !!
                            </div>
                        )}
                    </div>

                    {isAccommodation && (
                        <div className={styles.priceNote}>
                            * Prices are as per day.
                            Choose number of days below.
                        </div>
                    )}
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.priceContainer}>
                        {isLive && apiItem.price && template.basePrice && apiItem.price !== Number(template.basePrice) && (
                            <span className={styles.oldPrice}>₹{Number(template.basePrice) * (isAccommodation ? days : 1)}</span>
                        )}
                        <span className={styles.priceDisplay}>
                            {isLive && apiItem.price ? `₹${apiItem.price * (isAccommodation ? days : 1)}` : template.fallbackPrice}
                        </span>
                    </div>

                    {isAccommodation && (
                        <div className={styles.footerQuantity} style={{ opacity: (!isLive || isSoldOut) ? 0.6 : 1 }}>
                            <button
                                className={styles.footerQtyBtn}
                                onClick={handleDecrement}
                                disabled={days <= 1 || !isLive || isSoldOut}
                            >-</button>
                            <span className={styles.footerQtyValue}>{days} {days > 1 ? "Days" : "Day"}</span>
                            <button
                                className={styles.footerQtyBtn}
                                onClick={handleIncrement}
                                disabled={days >= 3 || !isLive || isSoldOut}
                            >+</button>
                        </div>
                    )}

                    <button
                        className={styles.buyBtn}
                        onClick={handleBuyClick}
                        disabled={isLoading || !isLive || isSoldOut || isMaintenanceMode}
                        style={{
                            opacity: (isLoading || !isLive || isSoldOut || isMaintenanceMode) ? 0.6 : 1,
                            cursor: (isLoading || !isLive || isSoldOut || isMaintenanceMode) ? 'not-allowed' : 'pointer',
                            background: isMaintenanceMode ? '#444' : undefined,
                            border: isMaintenanceMode ? '1px solid #666' : undefined
                        }}
                    >
                        {isLoading ? "Redirecting..." : !isLive ? "Coming Soon" : isSoldOut ? "Unavailable" : isMaintenanceMode ? "Maintenance" : "Register"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PassesSection;
