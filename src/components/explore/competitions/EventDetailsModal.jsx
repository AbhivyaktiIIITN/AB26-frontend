import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaEnvelope, FaPhone, FaTimes, FaTrophy } from "react-icons/fa";
import RegistrationModal from "../../ui/RegistrationModal";
import styles from "./EventDetailsModal.module.css";

const TABS = [
  { key: "description", label: "Descriptions" },
  { key: "timelines", label: "Stages & Timelines" },
  { key: "rules", label: "Rules" },
  { key: "contact", label: "Contact Organizers" },
];

const EventDetailsModal = ({ event, onClose, onOpenRegistration }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!event) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className={styles.descriptionContent}>
            {Array.isArray(event.description) ? (
              event.description.map((desc, index) => (
                <p key={index} className={styles.paragraph}>
                  {desc}
                </p>
              ))
            ) : (
              <p className={styles.paragraph}>{event.description}</p>
            )}
          </div>
        );
      case "timelines":
        return (
          <div className={styles.timelineContainer}>
            {event.stages && event.stages.length > 0 ? (
              event.stages.map((stage, index) => (
                <div key={stage.id || index} className={styles.stageCard}>
                  <div className={styles.stageHeader}>
                    <div className={styles.stageDate}>
                      {stage.start_date && stage.end_date ? (
                        <>
                          {stage.start_date}{" "}
                          <span className={styles.arrow}>→</span>{" "}
                          {stage.end_date}
                        </>
                      ) : (
                        stage.start_date || "Date TBA"
                      )}
                    </div>
                  </div>
                  <h3 className={styles.stageTitle}>{stage.title}</h3>
                  {stage.description && (
                    <div className={styles.stageDescription}>
                      {Array.isArray(stage.description) ? (
                        stage.description.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))
                      ) : (
                        <p>{stage.description}</p>
                      )}
                    </div>
                  )}

                  {stage.submission_requirements && (
                    <div className={styles.submissionReqs}>
                      <h4>Submission Requirements</h4>
                      {Array.isArray(stage.submission_requirements) ? (
                        <ul>
                          {stage.submission_requirements.map((req, i) => {
                            if (typeof req === "string") {
                              return <li key={i}>{req}</li>;
                            } else if (
                              typeof req === "object" &&
                              req !== null
                            ) {
                              return (
                                <li
                                  key={i}
                                  style={{
                                    listStyle: "none",
                                    marginLeft: "-1.2rem",
                                    marginBottom: "1rem",
                                  }}
                                >
                                  {Object.entries(req).map(([key, value]) => (
                                    <div
                                      key={key}
                                      style={{ marginBottom: "0.8rem" }}
                                    >
                                      <h5
                                        style={{
                                          color: "#ffda79",
                                          fontSize: "1rem",
                                          fontWeight: "600",
                                          marginBottom: "0.4rem",
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {key.replace(/_/g, " ")}
                                      </h5>
                                      {Array.isArray(value) ? (
                                        <ul
                                          style={{
                                            paddingLeft: "1.2rem",
                                            marginTop: "0",
                                          }}
                                        >
                                          {value.map((item, j) => (
                                            <li
                                              key={j}
                                              style={{
                                                color: "#ccc",
                                                marginBottom: "0.3rem",
                                              }}
                                            >
                                              {item}
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p style={{ color: "#ccc" }}>{value}</p>
                                      )}
                                    </div>
                                  ))}
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      ) : typeof stage.submission_requirements === "object" ? (
                        <>
                          {stage.submission_requirements.rules && (
                            <div>
                              <h5>Rules</h5>
                              <ul>
                                {stage.submission_requirements.rules.map(
                                  (rule, i) => (
                                    <li key={i}>{rule}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                          {stage.submission_requirements.mandatory_details && (
                            <div>
                              <h5>Mandatory Details</h5>
                              <ul>
                                {stage.submission_requirements.mandatory_details.map(
                                  (detail, i) => (
                                    <li key={i}>{detail}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                          {/* Render other string properties like file_format if they exist as keys */}
                          {Object.entries(stage.submission_requirements).map(
                            ([key, value]) => {
                              if (
                                key !== "rules" &&
                                key !== "mandatory_details" &&
                                typeof value === "string"
                              ) {
                                return (
                                  <p key={key} className={styles.reqDetail}>
                                    <span className={styles.reqLabel}>
                                      {key
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, (c) =>
                                          c.toUpperCase(),
                                        )}
                                      :{" "}
                                    </span>
                                    {value}
                                  </p>
                                );
                              }
                              return null;
                            },
                          )}
                        </>
                      ) : (
                        <p>{stage.submission_requirements}</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className={styles.placeholderText}>
                No timeline information available.
              </p>
            )}
          </div>
        );
      case "rules":
        return (
          <div className={styles.rulesContainer}>
            {event.rules && event.rules.length > 0 ? (
              <ul className={styles.rulesList}>
                {event.rules.map((rule, index) => (
                  <li key={index} className={styles.ruleItem}>
                    {rule}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.placeholderText}>
                No specific rules listed.
              </p>
            )}
          </div>
        );
      case "contact":
        return (
          <div className={styles.contactContainer}>
            {event.contact ? (
              <div className={styles.contactCard}>
                <h3 className={styles.contactName}>{event.contact.name}</h3>
                <div className={styles.contactDetails}>
                  {event.contact.email && (
                    <a
                      href={`mailto:${event.contact.email}`}
                      className={styles.contactLink}
                    >
                      <FaEnvelope className={styles.contactIcon} />
                      {event.contact.email}
                    </a>
                  )}
                  {event.contact.phone && (
                    <a
                      href={`tel:${event.contact.phone}`}
                      className={styles.contactLink}
                    >
                      <FaPhone className={styles.contactIcon} />
                      {event.contact.phone}
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className={styles.placeholderText}>
                Contact information not available.
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const prizePool = event.prizes?.prize_pool || event.price_worth || "TBA";
  const firstPrize = event.prizes?.first || event.price_1st || "-";
  const secondPrize = event.prizes?.second || event.price_2nd || "-";
  const thirdPrize = event.prizes?.third || event.price_3rd || "-";

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <h1>{event.name}</h1>
            <div className={styles.subHeader}>
              <span className={styles.organizerInfo}>
                {event.organizers || "Organizers"}
              </span>

              {event.unstop_link && event.unstop_link !== "#" && (
                <a
                  href={event.unstop_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.unstopLink}
                >
                  <div className={styles.unstopIcon}>un</div>
                  <span>View on Unstop</span>
                </a>
              )}
            </div>
          </div>

          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>{renderTabContent()}</div>

          <div className={styles.actions}>
            <button
              onClick={() => setShowRegistrationModal(true)}
              className={styles.actionButton}
            >
              Register Here
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <img
            src={event.bg_img || "/images/explore/event_card_bg.jpg"}
            alt={event.name}
            className={styles.eventImage}
          />

          <div className={styles.prizeBox}>
            <div className={styles.prizeMain}>
              <FaTrophy className={styles.trophyIconLarge} />
              <div className={styles.prizeTotal}>
                <span className={styles.prizeLabel}>Prize Pool</span>
                <span className={styles.prizeValueMain}>{prizePool}</span>
              </div>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.prizeBreakdown}>
              <div className={styles.breakdownItem}>
                <span>1st -</span> <span>{firstPrize}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>2nd -</span> <span>{secondPrize}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>3rd -</span> <span>{thirdPrize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRegistrationModal && (
        <RegistrationModal
          eventId={event.id}
          eventName={event.name}
          maxTeamSize={event.max_team_size || 1}
          minTeamSize={event.min_team_size || 1}
          onClose={() => setShowRegistrationModal(false)}
          onCloseEvent={onClose}
        />
      )}
    </div>,
    document.body,
  );
};

export default EventDetailsModal;
