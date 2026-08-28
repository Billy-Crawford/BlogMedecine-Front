export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-4 md:py-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
        Nous écrire
      </p>

      <h2 className="font-display italic text-4xl sm:text-5xl text-foreground mb-8">
        Contact
      </h2>

      <div className="border-l-2 border-border pl-6 py-1">
        <p className="text-foreground/80 leading-relaxed">
          Un formulaire simple avec Formspree viendra ici.
        </p>
      </div>
    </section>
  );
}

