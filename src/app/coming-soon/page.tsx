import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/background/hero-bg.jpg"
      >
        <source src="/videos/hero-video.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,120,85,0.25)_0%,rgba(0,0,0,0.78)_68%)]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center justify-center px-6 py-16 text-center sm:px-10 lg:px-16">
        <img
          src="/icons/logo.png"
          alt="Aronova"
          width={138}
          height={182}
          className="h-auto w-[84px] sm:w-[104px] md:w-[124px]"
        />

        <h1
          className={`${raleway.className} mt-12 text-[clamp(2.6rem,11vw,9.2rem)] leading-[0.9] tracking-[0.02em] text-[#D1A92A] uppercase font-[800]`}
        >
          Coming Soon
        </h1>

        <div className="mt-10 flex w-full max-w-[980px] items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <span className="h-[3px] w-full max-w-[250px] bg-white/90" aria-hidden />
          <p
            className={`${raleway.className} shrink-0 text-base italic text-white/95 sm:text-2xl md:text-[3rem] md:leading-none font-[500]`}
          >
            Your Lifestyle, Your Way
          </p>
          <span className="h-[3px] w-full max-w-[250px] bg-white/90" aria-hidden />
        </div>
      </section>
    </main>
  );
}
