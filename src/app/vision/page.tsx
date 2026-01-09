"use client";

import { motion } from "framer-motion";
import "./vision.css";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function VisionPage() {
  return (
    <section className="vision-page">
      <div className="vision-shell">
        <motion.header {...fadeUp} className="vision-header">
          <h1 className="vision-title">
            Our Guiding Charter:
            <br />
            Forging Impact, Integrity, and Innovation.
          </h1>
        </motion.header>

        <motion.div {...fadeUp} className="vision-top-row">
          <article className="vision-panel mission">
            <p className="panel-title">Our Mission</p>
            <p className="panel-text">
              To diligently execute critical public infrastructure, resilient water networks and durable roads, upholding technical
              innovation to ensure projects are consistently delivered ahead of schedule and within budget.
            </p>
          </article>

          <div className="vision-panel illustration">
            <img
              src="/images/vision-mission-illustration.png"
              alt="Mission illustration"
              className="illustration-image"
              loading="lazy"
            />
          </div>

            <article className="vision-panel vision">
              <p className="panel-title">Our Vision</p>
              <p className="panel-text">
                To emerge as a premier transnational infrastructure organization, renowned for delivering sustainable, technologically
                innovative projects that set global benchmarks in reliability and societal contribution.
              </p>
            </article>

        </motion.div>
      </div>

      <div className="values-section">
        <motion.div {...fadeUp} className="values-shell">
          <div className="values-title">
            <span className="values-line" aria-hidden="true"></span>
            <h2>Our Values</h2>
            <span className="values-line" aria-hidden="true"></span>
          </div>

          <div className="values-grid">
            <article className="value-card integrity">
              <div className="value-head">
                <img src="/images/value-integrity.png" alt="Integrity icon" className="value-icon-img" loading="lazy" />
                <h3>Integrity</h3>
              </div>
              <div className="value-body">
                <p>Uncompromising ethical standards and contractual transparency.</p>
              </div>
            </article>

            <article className="value-card innovation">
              <div className="value-head">
                <img src="/images/value-innovation.png" alt="Innovation icon" className="value-icon-img" loading="lazy" />
                <h3>Innovation</h3>
              </div>
              <div className="value-body">
                <p>Embedding BIM &amp; IoT to drive operational superiority.</p>
              </div>
            </article>

            <article className="value-card sustainability">
              <div className="value-head">
                <img src="/images/value-sustainability.png" alt="Sustainability icon" className="value-icon-img" loading="lazy" />
                <h3>Sustainability</h3>
              </div>
              <div className="value-body">
                <p>Engineering for enduring environmental prosperity.</p>
              </div>
            </article>

            <article className="value-card reliability">
              <div className="value-head">
                <img src="/images/value-reliability.png" alt="Reliability icon" className="value-icon-img" loading="lazy" />
                <h3>Reliability</h3>
              </div>
              <div className="value-body">
                <p>An industry leading track record of quantifiable results.</p>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
