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


    /* 
56:     const buildPaymentUrl = (baseLink, orderId, days) => {
57:         if (!baseLink) throw new Error("Payment link not available for this item.");
58:         let url;
59:         try {
60:             url = new URL(baseLink);
61:         } catch {
62:             throw new Error("Invalid payment link received from server.");
63:         }
64: 
65:         // Add custom query params directly
66:         url.searchParams.set('order_id', orderId);
67:         url.searchParams.set('ab_id', serialIdToABID(profileSerialId) || "");
68:         url.searchParams.set('email', user?.email || "");
69:         if (days) url.searchParams.set('days', days);
70: 
71:         // Prefill data
72:         url.searchParams.set('name', user?.name || "");
73:         url.searchParams.set('email', user?.email || "");
74: 
75:         const rawPhone = user?.phoneNumber || "";
76:         const phone = rawPhone.startsWith("+91") ? rawPhone : `+91${rawPhone}`;
77:         url.searchParams.set('phone', phone);
78: 
79:         return url.toString();
80:     };
81:     */

    const handlePayment = async (itemData, setLoading) => {
        setLoading(true);
        const canProceed = await requireCompleteProfile();
        if (!canProceed) {
            setLoading(false);
            return;
        }

        try {
            const data = await createPaymentOrder(itemData);
            if (!data.success) {
                showToast(data.error || "Failed to initiate order", "error");
                return;
            }

            const { order, user: paymentUser } = data;

            const options = {
                key: order.key,
                amount: order.amount,
                currency: order.currency,
                name: "Abhivyakti Fest",
                description: "Payment for " + (itemData.passTypeId ? "Pass" : "Accommodation"),
                order_id: order.id,
                prefill: {
                    name: paymentUser.name,
                    email: paymentUser.email,
                    contact: paymentUser.phoneNumber ? (paymentUser.phoneNumber.startsWith("+91") ? paymentUser.phoneNumber : `+91${paymentUser.phoneNumber}`) : "",
                },
                readonly: {
                    contact: false,
                    email: true,
                    name: true
                },
                theme: { color: "#5E1C1D" },
                handler: function (response) {
                    window.location.href = "/myaccount";
                },
                modal: {
                    ondismiss: function () {
                        console.log("User closed the payment modal");
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            showToast(error.message || "Something went wrong. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleBuyPass = async (pass) => {
        handlePayment({ passTypeId: pass.id }, (loading) => setLoadingPassId(loading ? pass.id : null));
    };

    const handleBuyAccommodation = async (accommodation, days) => {
        handlePayment({ accommodationTypeId: accommodation.id, days }, (loading) => setLoadingAccommodationId(loading ? accommodation.id : null));
    };

    const registrationsClosed = true;
    const activePassIds = [1, 3, 4, 6];
    const activeAccommodationIds = [];

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
                            const isIIITN = user?.email?.toLowerCase().endsWith("@iiitn.ac.in");
                            if (isIIITN) {
                                // return template.restrictedInternalOnly === true || activePassIds.includes(template.id);
                                return template.restrictedInternalOnly === true;
                            }
                            return !template.restrictedInternalOnly;
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
                                    registrationsClosed={activePassIds.includes(template.id) ? false : registrationsClosed}
                                />
                            );
                        })}
                </div>
            </div>

            {!user?.email?.toLowerCase().endsWith("@iiitn.ac.in") && (
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
                                    registrationsClosed={activeAccommodationIds.includes(template.id) ? false : registrationsClosed}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
};

const Card = ({ template, apiItem, isAccommodation, onBuy, isLoading, registrationsClosed }) => {
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
                        {isLive && !isSoldOut && apiItem.price && template.basePrice && (apiItem.price < Number(template.basePrice) || template.restrictedInternalOnly) && (
                            <div style={{ textAlign: 'center', fontSize: '0.95rem', color: '#ffdab9', fontWeight: 'bold', fontStyle: 'italic' }}>
                                {template.promoLabel} !!
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
                        <div className={styles.footerQuantity} style={{ opacity: (!isLive || isSoldOut || registrationsClosed) ? 0.6 : 1 }}>
                            <button
                                className={styles.footerQtyBtn}
                                onClick={handleDecrement}
                                disabled={days <= 1 || !isLive || isSoldOut || registrationsClosed}
                            >-</button>
                            <span className={styles.footerQtyValue}>{days} {days > 1 ? "Days" : "Day"}</span>
                            <button
                                className={styles.footerQtyBtn}
                                onClick={handleIncrement}
                                disabled={days >= 3 || !isLive || isSoldOut || registrationsClosed}
                            >+</button>
                        </div>
                    )}

                    <button
                        className={styles.buyBtn}
                        onClick={handleBuyClick}
                        disabled={isLoading || !isLive || isSoldOut || registrationsClosed}
                        style={{
                            opacity: (isLoading || !isLive || isSoldOut || registrationsClosed) ? 0.6 : 1,
                            cursor: (isLoading || !isLive || isSoldOut || registrationsClosed) ? 'not-allowed' : 'pointer',
                            background: registrationsClosed ? '#444' : undefined,
                            border: registrationsClosed ? '1px solid #666' : undefined
                        }}
                    >
                        {isLoading ? "Processing..." : !isLive ? "Coming Soon" : isSoldOut ? "Unavailable" : registrationsClosed ? "Closed" : "Register"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PassesSection;
