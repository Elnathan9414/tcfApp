import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

const steps = [
    {
        number: "01",
        title: "Lire attentivement le sujet",
        duration: "2 min",
        color: "#1a1a2e",
        content:
            "Avant d'écrire quoi que ce soit, lis le sujet deux fois. Identifie le type de texte demandé (lettre, article, message…), le destinataire, et le registre à adopter (formel ou informel). Souligne les mots-clés et les consignes obligatoires.",
        tips: [
            "Repère le nombre de mots exigé",
            "Identifie s'il faut un registre formel ou informel",
            "Note les points que tu dois obligatoirement aborder",
        ],
    },
    {
        number: "02",
        title: "Faire un plan rapide",
        duration: "3 min",
        color: "#16213e",
        content:
            "Un bon texte est un texte structuré. Prends 3 minutes pour noter au brouillon les idées principales que tu vas développer. Organise-les en introduction, développement et conclusion.",
        tips: [
            "Introduction : présente le contexte et ton intention",
            "Développement : 2 à 3 idées bien argumentées",
            "Conclusion : synthèse ou appel à l'action",
        ],
    },
    {
        number: "03",
        title: "Rédiger avec méthode",
        duration: "45 min",
        color: "#0f3460",
        content:
            "Rédige en suivant ton plan. Utilise des connecteurs logiques pour lier tes idées. Varie ton vocabulaire pour éviter les répétitions. Respecte le registre choisi du début à la fin.",
        tips: [
            "Utilise : 'Tout d'abord', 'En outre', 'Cependant', 'Ainsi'…",
            "Fais des paragraphes clairs et bien séparés",
            "Respecte le nombre de mots (±10%)",
        ],
    },
    {
        number: "04",
        title: "Relire et corriger",
        duration: "5 min",
        color: "#533483",
        content:
            "La relecture est indispensable. Vérifie les accords, les conjugaisons, la ponctuation et la cohérence de ton texte. Un texte sans fautes donne une bien meilleure impression.",
        tips: [
            "Vérifie les accords sujet-verbe",
            "Contrôle les accords des participes passés",
            "Relis pour t'assurer de la cohérence globale",
        ],
    },
];

const taskTypes = [
    {
        icon: "✉️",
        title: "Lettre / Courriel",
        description:
            "Écrire à quelqu'un pour se plaindre, remercier, demander une information ou répondre à une annonce.",
        keywords: ["Madame, Monsieur,", "Je vous prie d'agréer…", "Dans l'attente de votre réponse…"],
    },
    {
        icon: "📰",
        title: "Article / Billet de blog",
        description:
            "Rédiger un texte informatif ou d'opinion sur un sujet donné, destiné à un public large.",
        keywords: ["Titre accrocheur", "Chapeau introductif", "Conclusion engageante"],
    },
    {
        icon: "💬",
        title: "Message / Forum",
        description:
            "Répondre à un message dans un forum, partager une expérience ou donner un avis.",
        keywords: ["Registre semi-formel", "Partage d'expérience", "Invitation à réagir"],
    },
];

const connectors = [
    { category: "Introduire", words: ["Tout d'abord", "En premier lieu", "Pour commencer"] },
    { category: "Ajouter", words: ["De plus", "En outre", "Par ailleurs", "Également"] },
    { category: "Opposer", words: ["Cependant", "Néanmoins", "En revanche", "Pourtant"] },
    { category: "Conclure", words: ["En conclusion", "Pour finir", "En somme", "Ainsi"] },
];

export default function MethodologieExpressionEcrite() {
    const [activeStep, setActiveStep] = useState(0);
    const [activeTask, setActiveTask] = useState(0);

    return (
       <AuthenticatedLayout>
        <div style={{ fontFamily: "'Georgia', serif", background: "#faf9f6", minHeight: "100vh" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .hero { background: #1a1a2e; color: white; padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
                .hero::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at center, #0f3460 0%, transparent 60%); opacity: 0.5; }
                .hero-badge { display: inline-block; background: #e94560; color: white; padding: 6px 16px; border-radius: 2px; font-family: 'Source Sans 3', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; position: relative; z-index: 1; }
                .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.2; max-width: 700px; margin: 0 auto 20px; position: relative; z-index: 1; }
                .hero p { font-family: 'Source Sans 3', sans-serif; font-size: 1.1rem; color: #a0aec0; max-width: 500px; margin: 0 auto; position: relative; z-index: 1; }

                .section { max-width: 900px; margin: 0 auto; padding: 60px 24px; }
                .section-label { font-family: 'Source Sans 3', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #e94560; font-weight: 600; margin-bottom: 12px; }
                .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); color: #1a1a2e; margin-bottom: 40px; }

                /* Steps */
                .steps-nav { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }
                .step-btn { font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 20px; border: 2px solid #e2e0db; background: white; cursor: pointer; border-radius: 2px; transition: all 0.2s; color: #666; }
                .step-btn:hover { border-color: #1a1a2e; color: #1a1a2e; }
                .step-btn.active { background: #1a1a2e; color: white; border-color: #1a1a2e; }

                .step-card { background: white; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); display: grid; grid-template-columns: 1fr 1fr; }
                @media (max-width: 640px) { .step-card { grid-template-columns: 1fr; } }
                .step-left { padding: 40px; }
                .step-number { font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 900; color: #f0ece4; line-height: 1; margin-bottom: 16px; }
                .step-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1a1a2e; margin-bottom: 8px; }
                .step-duration { display: inline-flex; align-items: center; gap: 6px; background: #fff3f5; color: #e94560; padding: 4px 12px; border-radius: 20px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
                .step-content { font-family: 'Source Sans 3', sans-serif; font-size: 1rem; color: #555; line-height: 1.7; }
                .step-right { background: #f8f7f4; padding: 40px; border-left: 1px solid #ede9e0; }
                .tips-title { font-family: 'Source Sans 3', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #999; margin-bottom: 20px; }
                .tip-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 16px; }
                .tip-dot { width: 8px; height: 8px; background: #e94560; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
                .tip-text { font-family: 'Source Sans 3', sans-serif; font-size: 0.95rem; color: #444; line-height: 1.5; }

                /* Task types */
                .tasks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
                @media (max-width: 640px) { .tasks-grid { grid-template-columns: 1fr; } }
                .task-card { background: white; border: 2px solid #e2e0db; border-radius: 4px; padding: 28px 24px; cursor: pointer; transition: all 0.2s; }
                .task-card:hover, .task-card.active { border-color: #1a1a2e; background: #1a1a2e; color: white; }
                .task-card:hover .task-desc, .task-card.active .task-desc { color: #a0aec0; }
                .task-card:hover .keyword-tag, .task-card.active .keyword-tag { background: #0f3460; color: #7ec8e3; }
                .task-icon { font-size: 2rem; margin-bottom: 12px; }
                .task-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: inherit; margin-bottom: 8px; }
                .task-desc { font-family: 'Source Sans 3', sans-serif; font-size: 0.88rem; color: #666; line-height: 1.5; margin-bottom: 16px; }
                .keywords { display: flex; flex-wrap: wrap; gap: 6px; }
                .keyword-tag { font-family: 'Source Sans 3', sans-serif; font-size: 11px; background: #f0ece4; color: #666; padding: 3px 10px; border-radius: 2px; }

                /* Connectors */
                .connectors-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
                @media (max-width: 640px) { .connectors-grid { grid-template-columns: 1fr; } }
                .connector-card { background: white; border-radius: 4px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
                .connector-category { font-family: 'Source Sans 3', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #e94560; margin-bottom: 14px; font-weight: 600; }
                .connector-words { display: flex; flex-wrap: wrap; gap: 8px; }
                .connector-word { font-family: 'Source Sans 3', sans-serif; font-size: 0.9rem; background: #1a1a2e; color: white; padding: 6px 14px; border-radius: 2px; }

                /* CTA Banner */
                .cta-banner { background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%); padding: 60px 24px; text-align: center; }
                .cta-banner h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 3vw, 2rem); color: white; margin-bottom: 16px; }
                .cta-banner p { font-family: 'Source Sans 3', sans-serif; color: #a0aec0; margin-bottom: 32px; }
                .cta-btn { display: inline-block; background: #e94560; color: white; padding: 14px 36px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; font-size: 1rem; border-radius: 2px; cursor: pointer; border: none; text-decoration: none; letter-spacing: 0.5px; transition: background 0.2s; }
                .cta-btn:hover { background: #c73652; }

                .divider { width: 48px; height: 3px; background: #e94560; margin-bottom: 16px; }
            `}</style>

            {/* HERO */}
            <div className="hero">
                <div className="hero-badge">TCF Canada — Expression Écrite</div>
                <h1>Maîtrisez l'expression écrite en 4 étapes</h1>
                <p>Une méthode structurée pour maximiser votre score et rédiger avec confiance le jour J.</p>
            </div>

            {/* INTRO */}
            <div className="section">
                <div className="section-label">Comprendre l'épreuve</div>
                <div className="divider"></div>
                <h2 className="section-title">Qu'est-ce que l'expression écrite au TCF Canada ?</h2>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1.05rem", color: "#555", lineHeight: 1.8, maxWidth: 680 }}>
                    L'épreuve d'expression écrite dure <strong>60 minutes</strong> et comprend <strong>3 tâches</strong> de difficulté croissante.
                    Chaque tâche demande de produire un texte en réponse à une situation concrète. Le jury évalue
                    votre capacité à communiquer clairement, à structurer vos idées et à utiliser correctement la langue française.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}>
                    {[
                        { label: "Durée totale", value: "60 min", icon: "⏱" },
                        { label: "Nombre de tâches", value: "3 tâches", icon: "📋" },
                        { label: "Niveaux évalués", value: "A1 → C2", icon: "🎯" },
                    ].map((stat, i) => (
                        <div key={i} style={{ background: "white", padding: "24px", borderRadius: 4, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                            <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{stat.icon}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#1a1a2e", fontWeight: 700 }}>{stat.value}</div>
                            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.8rem", color: "#999", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TYPES DE TÂCHES */}
            <div style={{ background: "#f0ece4", padding: "60px 24px" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div className="section-label">Les formats</div>
                    <div className="divider"></div>
                    <h2 className="section-title">Types de tâches rencontrées</h2>
                    <div className="tasks-grid">
                        {taskTypes.map((task, i) => (
                            <div
                                key={i}
                                className={`task-card ${activeTask === i ? "active" : ""}`}
                                onClick={() => setActiveTask(i)}
                            >
                                <div className="task-icon">{task.icon}</div>
                                <div className="task-title">{task.title}</div>
                                <div className="task-desc">{task.description}</div>
                                <div className="keywords">
                                    {task.keywords.map((kw, j) => (
                                        <span key={j} className="keyword-tag">{kw}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MÉTHODE EN 4 ÉTAPES */}
            <div className="section">
                <div className="section-label">La méthode</div>
                <div className="divider"></div>
                <h2 className="section-title">Les 4 étapes pour réussir</h2>

                <div className="steps-nav">
                    {steps.map((step, i) => (
                        <button
                            key={i}
                            className={`step-btn ${activeStep === i ? "active" : ""}`}
                            onClick={() => setActiveStep(i)}
                        >
                            {step.number} — {step.title}
                        </button>
                    ))}
                </div>

                <div className="step-card">
                    <div className="step-left">
                        <div className="step-number">{steps[activeStep].number}</div>
                        <h3 className="step-title">{steps[activeStep].title}</h3>
                        <div className="step-duration">⏱ {steps[activeStep].duration}</div>
                        <p className="step-content">{steps[activeStep].content}</p>
                    </div>
                    <div className="step-right">
                        <div className="tips-title">Points clés</div>
                        {steps[activeStep].tips.map((tip, i) => (
                            <div key={i} className="tip-item">
                                <div className="tip-dot"></div>
                                <div className="tip-text">{tip}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONNECTEURS */}
            <div style={{ background: "#f8f7f4", padding: "60px 24px" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div className="section-label">Vocabulaire essentiel</div>
                    <div className="divider"></div>
                    <h2 className="section-title">Connecteurs logiques indispensables</h2>
                    <div className="connectors-grid">
                        {connectors.map((group, i) => (
                            <div key={i} className="connector-card">
                                <div className="connector-category">{group.category}</div>
                                <div className="connector-words">
                                    {group.words.map((word, j) => (
                                        <span key={j} className="connector-word">{word}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ERREURS À ÉVITER */}
            <div className="section">
                <div className="section-label">Pièges fréquents</div>
                <div className="divider"></div>
                <h2 className="section-title">Les erreurs qui font perdre des points</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {[
                        { emoji: "❌", title: "Hors sujet", desc: "Ne pas répondre exactement à ce qui est demandé. Lis toujours le sujet deux fois." },
                        { emoji: "❌", title: "Texte trop court", desc: "En dessous de 80% du nombre de mots demandé, des points sont automatiquement retirés." },
                        { emoji: "❌", title: "Mauvais registre", desc: "Mélanger le tutoiement et le vouvoiement, ou utiliser un langage familier dans une lettre formelle." },
                        { emoji: "❌", title: "Aucune structure", desc: "Un texte sans paragraphes ni connecteurs logiques est difficile à lire et pénalise le score." },
                    ].map((err, i) => (
                        <div key={i} style={{ background: "white", border: "1px solid #ede9e0", borderRadius: 4, padding: "24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                            <span style={{ fontSize: "1.5rem" }}>{err.emoji}</span>
                            <div>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#1a1a2e", marginBottom: 6 }}>{err.title}</div>
                                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.9rem", color: "#666", lineHeight: 1.5 }}>{err.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="cta-banner">
                <h2>Prêt à vous entraîner ?</h2>
                <p>Accédez à nos exercices d'expression écrite et progressez rapidement.</p>
                <a href="/tests/options" className="cta-btn">Commencer l'entraînement →</a>
            </div>
        </div>
         </AuthenticatedLayout>
    );
       
}