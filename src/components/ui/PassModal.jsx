import React from 'react';
import QRCode from 'react-qr-code';
import html2pdf from 'html2pdf.js';

const PassModal = ({ isOpen, onClose, passData, type, isDownloadMode = false }) => {
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
        : (passData.accommodationType?.price || "N/A");
    const dateTime = formatDate(passData.created_at);
    const paymentMode = "Online"; // Defaulting to online since there's a Razorpay ID

    // Create QR string formatted with type and token
    // QR payload should be an object containing `type` ("pass" or "accomodation") and `qrToken`.
    // Use the existing qrToken if available, otherwise fallback to ID string.
    const rawToken = passData.qrToken || passData.id.toString();
    const qrPayload = {
        type,
        qrToken: rawToken,
    };
    const qrValue = JSON.stringify(qrPayload);

    const handleDownloadPDF = () => {
        const element = document.getElementById('pass-invoice-content');
        if (!element) return;

        const opt = {
            margin: 10,
            filename: `${passType.replace(/\s+/g, '_')}_${passId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Temporarily hide close and download buttons for the PDF
        const actionButtons = document.getElementById('pass-action-buttons');
        if (actionButtons) actionButtons.style.display = 'none';

        html2pdf().set(opt).from(element).save().then(() => {
            // Restore buttons
            if (actionButtons) actionButtons.style.display = 'flex';
            if (isDownloadMode && onClose) {
                onClose(); // Auto-close when silent download finishes
            }
        });
    };

    return (
        <div
            className={isDownloadMode
                ? "fixed top-[-9999px] left-[-9999px] opacity-0 pointer-events-none"
                : "fixed inset-0 z-[100000000] bg-black/80 backdrop-blur-sm overflow-y-auto w-full h-full overscroll-none"
            }
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex min-h-full items-start md:items-center justify-center p-4 text-center">
                {/* Modal Card */}
                <div className="relative w-full max-w-4xl bg-[#f4f4f4] text-[#000000] text-left transform shadow-xl rounded-sm my-8" id="pass-invoice-content">
                    <div id="pass-action-buttons" className="absolute top-4 right-4 z-10 flex gap-2">
                        <button
                            onClick={onClose}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-8 md:p-10 border-2 border-[#000000] m-4 md:m-8 bg-[#ffffff]">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="flex-1">
                                <div className="text-3xl font-bold mb-3">{title}</div>

                                {isPass && (
                                    <div className="text-sm mt-3">
                                        <strong>Includes:</strong>
                                        <ul className="list-disc ml-5 mt-1 p-0">
                                            <li>Registration fees for all competitions</li>
                                            <li>Entry to all Pro-nites & Events</li>
                                            <li>Official Fest Merchandise</li>
                                        </ul>
                                    </div>
                                )}

                                {!isPass && (
                                    <div className="text-sm mt-3">
                                        <strong>Includes:</strong>
                                        <ul className="list-disc ml-5 mt-1 p-0">
                                            <li>Accommodation for the duration of the fest</li>
                                            <li>Basic amenities as specified</li>
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-6 text-sm leading-relaxed space-y-1">
                                    <div><strong className="inline-block w-36">Type:</strong> {passType}</div>
                                    <div><strong className="inline-block w-36">ID:</strong> {passId}</div>
                                    <div><strong className="inline-block w-36">Valid From:</strong> {validFrom}</div>
                                    <div><strong className="inline-block w-36">Valid Till:</strong> {validTill}</div>
                                    <div>
                                        <strong className="inline-block w-36">Status:</strong>
                                        <span className="text-[#16a34a] font-semibold">{passData.status || "Confirmed"}</span>
                                    </div>
                                </div>

                                <div className="mt-6 border border-[#000000] p-4 w-full md:w-3/4 text-sm space-y-1">
                                    <div className="font-bold mb-2">Payment Info</div>
                                    <div><strong className="inline-block w-36">Amount Paid:</strong> ₹{amountPaid}</div>
                                    <div><strong className="inline-block w-36">Payment Mode:</strong> {paymentMode}</div>
                                    <div><strong className="inline-block w-36">Transaction ID:</strong> <span className="break-all">{transactionId}</span></div>
                                    <div><strong className="inline-block w-36">Date & Time:</strong> {dateTime}</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-2 md:pt-0 mx-auto md:mx-0">
                                <div className="p-2 bg-[#ffffff]">
                                    <QRCode value={qrValue} size={180} level="H" />
                                </div>
                                <div className="text-xs mt-2 font-medium">Scan at Entry Gate</div>
                            </div>
                        </div>

                        <div className="mt-10 border-t-2 border-[#000000] pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-8">
                                <div>
                                    <ul className="list-disc pl-5 mb-2 font-medium">
                                        <li>For Hospitality Queries:</li>
                                    </ul>
                                    <div className="pl-5 space-y-1">
                                        <div>Vaibhav Chouksey (Hospitality Lead)</div>
                                        <div>+91 96443 61455</div>
                                        <div>abhivyakti.hospitality@iiitn.ac.in</div>
                                    </div>
                                </div>

                                <div>
                                    <ul className="list-disc pl-5 mb-2 font-medium">
                                        <li>For General Queries:</li>
                                    </ul>
                                    <div className="pl-5 space-y-1">
                                        <div>support@abhivyaktifest.in</div>
                                        <div>+91 8109134887</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="font-medium leading-relaxed">
                                Visit Website for Terms & Conditions and<br />
                                Refund Policy: abhivyaktifest.in
                            </div>
                            <div className="font-medium text-[#5a0d29]">
                                Thank you for your booking!
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#6b7280] border-t border-[#d1d5db] border-dotted pt-3 mt-8">
                        <div>This is a system-generated document and does not require a signature.</div>
                        <div className="mt-2 md:mt-0">Date: {new Date(passData.created_at).toLocaleDateString('en-GB').replace(/\//g, '.')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassModal;
