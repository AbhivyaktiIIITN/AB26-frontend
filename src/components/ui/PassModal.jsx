import React from 'react';
import QRCode from 'react-qr-code';
import html2pdf from 'html2pdf.js';

const PassModal = ({ isOpen, onClose, passData, type, isDownloadMode = false, userName, abId }) => {
    const [isGenerating, setIsGenerating] = React.useState(false);

    // Prevent background scrolling when modal is open (only when visible!)
    React.useEffect(() => {
        if (isOpen && !isDownloadMode) {
            // Lock body and html
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Restore default
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    React.useEffect(() => {
        if (isDownloadMode && isOpen && passData) {
            handleDownloadPDF();
        }
    }, [isDownloadMode, isOpen, passData]);

    if (!isOpen || !passData) return null;

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Determine if it's a pass or accommodation
    const isPass = type === 'pass';

    // Extract common details matching the HTML template
    const title = isPass ? "Fest Pass" : "Accommodation";
    const passType = isPass
        ? (passData.passType?.name || "Standard Pass")
        : (passData.accommodationType?.name || "Standard Accommodation");

    const passId = passData.id;
    const validFrom = "March 19, 2026"; // Hardcoded fest dates per FAQ
    const validTill = "March 21, 2026";

    // Assuming Razorpay payment ID is the transaction ID, and amount might need to be fetched/passed or mocked for now
    const transactionId = passData.razorpayPaymentId || "N/A";
    const amountPaid = isPass
        ? (passData.passType?.price || "N/A")
        : (passData.accommodationType?.price ? passData.accommodationType.price * (passData.days || 1) : "N/A");
    const dateTime = formatDate(passData.created_at);
    const paymentMode = "Online"; // Defaulting to online since there's a Razorpay ID

    // Create QR string formatted with type and token
    // QR payload should be an object containing `type` ("pass" or "accomodation") and `qrToken`.
    // Use the existing qrToken if available, otherwise fallback to ID string.
    const rawToken = passData.qrToken || passData.id.toString();
    const qrPayload = {
        type,
        qrToken: rawToken,
        ...(isPass ? {} : { days: passData.days || 1 })
    };
    const qrValue = JSON.stringify(qrPayload);

    const handleDownloadPDF = () => {
        // Add a small delay to ensure DOM is fully rendered (QR code, etc.) before capture
        setTimeout(() => {
            const element = document.getElementById('pass-invoice-content');
            if (!element) return;

            const opt = {
                margin: 0, // Removing margin here and handling it in content styles
                filename: `${passType.replace(/\s+/g, '_')}_${passId}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                    windowWidth: 1024,
                    scrollY: 0,
                    onclone: (clonedDoc) => {
                        const el = clonedDoc.getElementById('pass-invoice-content');
                        const container = clonedDoc.getElementById('pdf-container');
                        if (el) {
                            el.style.width = '1000px';
                            el.style.boxShadow = 'none';
                            el.style.margin = '0 auto';
                        }
                        if (container) {
                            container.style.display = 'flex';
                            container.style.flexDirection = 'row';
                            container.style.alignItems = 'flex-start';
                            // Ensure internal text stays left-aligned in PDF
                            const leftSide = container.firstElementChild;
                            if (leftSide) leftSide.style.textAlign = 'left';
                        }
                    }
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: 'avoid-all' } // Critical for single page
            };

            // Temporarily hide action buttons
            const actionButtons = document.getElementById('pass-action-buttons');
            if (actionButtons) actionButtons.style.display = 'none';

            setIsGenerating(true);
            html2pdf().set(opt).from(element).save().then(() => {
                setIsGenerating(false);
                if (actionButtons) actionButtons.style.display = 'flex';
                if (isDownloadMode && onClose) onClose();
            }).catch(err => {
                setIsGenerating(false);
                console.error("PDF Generation Error:", err);
                if (isDownloadMode && onClose) onClose();
            });
        }, 500);
    };

    return (
        <div
            className={isDownloadMode
                ? "fixed top-[-9999px] left-[-9999px] opacity-[0.01] pointer-events-none"
                : "fixed inset-0 z-100000000 bg-black/80 backdrop-blur-sm overflow-y-auto w-full h-full overscroll-none"
            }
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex min-h-full items-center justify-center p-0 text-center">
                {/* Modal Card */}
                <div
                    className="relative w-full max-w-4xl text-left transform rounded-sm"
                    id="pass-invoice-content"
                    style={{ backgroundColor: '#f4f4f4', color: '#000000', boxShadow: isDownloadMode ? 'none' : '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                >
                    <div id="pass-action-buttons" className="absolute top-4 right-4 z-10 flex gap-2 no-print">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGenerating}
                            className="px-3 py-2 rounded transition-colors text-xs font-bold flex items-center gap-2 disabled:opacity-50"
                            style={{ backgroundColor: '#5a0d29', color: '#ffffff' }}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download PDF</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={isGenerating}
                            className="p-2 rounded transition-colors disabled:opacity-50"
                            style={{ backgroundColor: '#e5e7eb' }}
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5 flex items-center justify-center text-center" style={{ color: '#4b5563' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6 md:p-8" style={{ backgroundColor: '#ffffff', border: '2px solid #000000', margin: isDownloadMode ? '0' : '20px' }}>
                        <div id="pdf-container" className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                            <div className="flex-1 w-full text-center md:text-left">
                                <div style={{ borderBottom: '2px solid #5a0d29', paddingBottom: '8px', marginBottom: '24px' }}>
                                    <div className="text-3xl md:text-4xl font-bold" style={{ color: '#000000', lineHeight: '1.1' }}>{title}</div>
                                </div>

                                <div className="mb-6">
                                    <div className="text-xl md:text-2xl font-medium uppercase" style={{ color: '#1f2937' }}>{userName}</div>
                                    <div className="text-lg md:text-xl font-bold tracking-tight" style={{ color: '#5a0d29' }}>{abId}</div>
                                </div>

                                {isPass && (
                                    <div className="text-sm mt-3 text-left" style={{ color: '#374151' }}>
                                        <strong style={{ color: '#000000' }}>Includes:</strong>
                                        <ul className="list-disc ml-5 mt-1 p-0">
                                            <li>Registration fees for all competitions</li>
                                            <li>Entry to all Pro-nites & Events</li>
                                            <li>Official Fest Merchandise</li>
                                        </ul>
                                    </div>
                                )}

                                {!isPass && (
                                    <div className="text-sm mt-3 text-left" style={{ color: '#374151' }}>
                                        <strong style={{ color: '#000000' }}>Includes:</strong>
                                        <ul className="list-disc ml-5 mt-1 p-0">
                                            <li>Accommodation for the duration of the fest</li>
                                            <li>Basic amenities as specified</li>
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-6 text-sm leading-relaxed space-y-1 text-left" style={{ color: '#4b5563' }}>
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Type:</strong> {passType}</div>
                                    {!isPass && passData.days && (
                                        <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Days:</strong> {passData.days} {passData.days > 1 ? "Days" : "Day"}</div>
                                    )}
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Valid From:</strong> {validFrom}</div>
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Valid Till:</strong> {validTill}</div>
                                    <div>
                                        <strong className="inline-block w-36" style={{ color: '#000000' }}>Status:</strong>
                                        <span style={{ color: '#16a34a', fontWeight: '600' }}>{passData.status || "Confirmed"}</span>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 w-full md:w-3/4 text-sm space-y-1 text-left mx-auto md:mx-0" style={{ border: '1px solid #000000', color: '#4b5563' }}>
                                    <div className="font-bold mb-2" style={{ color: '#000000' }}>Payment Info</div>
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Amount Paid:</strong> ₹{amountPaid}</div>
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Payment Mode:</strong> {paymentMode}</div>
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Transaction ID:</strong> <span className="break-all" style={{ color: '#4b5563' }}>{transactionId}</span></div>
                                    <div><strong className="inline-block w-36" style={{ color: '#000000' }}>Date & Time:</strong> {dateTime}</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-0 mx-0">
                                <div className="p-2" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                                    <QRCode value={qrValue} size={180} level="H" />
                                </div>
                                <div className="text-xs mt-2 font-medium text-center" style={{ color: '#4b5563' }}>Scan at Entry Gate</div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6" style={{ borderTop: '2px solid #000000' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-8 text-left">
                                <div>
                                    <ul className="list-disc pl-5 mb-2 font-medium" style={{ color: '#000000' }}>
                                        <li>For Hospitality Queries:</li>
                                    </ul>
                                    <div className="pl-5 space-y-1" style={{ color: '#4b5563' }}>
                                        <div>Vaibhav Chouksey (Hospitality Lead)</div>
                                        <div>+91 96443 61455</div>
                                        <div>abhivyakti.hospitality@iiitn.ac.in</div>
                                    </div>
                                </div>

                                <div>
                                    <ul className="list-disc pl-5 mb-2 font-medium" style={{ color: '#000000' }}>
                                        <li>For General Queries:</li>
                                    </ul>
                                    <div className="pl-5 space-y-1" style={{ color: '#4b5563' }}>
                                        <div>support@abhivyaktifest.in</div>
                                        <div>+91 8109134887</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="font-medium leading-relaxed" style={{ color: '#1f2937' }}>
                                Visit Website for Terms & Conditions and<br />
                                Refund Policy: abhivyaktifest.in
                            </div>
                            <div className="font-medium" style={{ color: '#5a0d29' }}>
                                Thank you for your booking!
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex flex-row justify-between items-center mx-8 pb-4"
                        style={{ fontSize: '10px', color: '#6b7280', borderTop: '1px dotted #d1d5db', paddingTop: '12px', marginTop: '16px' }}
                    >
                        <div>This is a system-generated document and does not require a signature.</div>
                        <div>Date: {new Date(passData.created_at).toLocaleDateString('en-GB').replace(/\//g, '.')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassModal;
