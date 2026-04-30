import PhoneFrame from "@/components/PhoneFrame";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-start justify-center py-6 overflow-hidden">
      {/* Real Ditto background photo, blurred */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(32px)",
          transform: "scale(1.08)",
        }}
      />
      {/* Noise grain overlay (matches Ditto's texture) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' seed='9' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix type='saturate' values='0' in='noise' result='g'/%3E%3CfeComponentTransfer in='g'%3E%3CfeFuncR type='gamma' amplitude='2.4' exponent='6' offset='-0.4'/%3E%3CfeFuncG type='gamma' amplitude='2.4' exponent='6' offset='-0.4'/%3E%3CfeFuncB type='gamma' amplitude='2.4' exponent='6' offset='-0.4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          opacity: 0.4,
        }}
      />
      <div className="relative z-10">
        <PhoneFrame />
      </div>
    </main>
  );
}
