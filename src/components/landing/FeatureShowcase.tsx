export function FeatureShowcase() {
  const features = [
    {
      title: "AI-Powered Conversations",
      description: "Intelligent, human-like chats that convert leads into paying customers across every channel.",
      icon: "🤖",
    },
    {
      title: "Always On",
      description: "Your AI agents respond instantly—24/7—so prospects never wait for a follow-up again.",
      icon: "⚡",
    },
    {
      title: "Live Analytics",
      description: "Track performance in real time and optimize every step of the funnel with actionable insights.",
      icon: "📊",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="text-3xl" aria-hidden>
            {feature.icon}
          </span>
          <h3 className="text-xl font-semibold">{feature.title}</h3>
          <p className="text-sm text-slate-600">{feature.description}</p>
        </article>
      ))}
    </section>
  );
}
