import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { Navigation } from "@/components/sections/HeroSection";
import { ServiceImage } from "@/components/ServiceImage";
import { BRAND } from "@/lib/constants";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | ${BRAND.name}`,
      description: service.shortDescription,
      images: [{ url: service.image, alt: `${service.title} illustration` }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const {
    title,
    shortDescription,
    tagline,
    longDescription,
    features,
    benefits,
    howItWorks,
    stats,
    useCases,
    emoji,
    accent,
    ctaText,
  } = service;

  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden bg-[#050505] pt-20">
        <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${accent}18 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <Link
              href="/#ecosystem"
              className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-silver/50 transition-colors hover:text-neon"
            >
              â† Back to Services
            </Link>

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div
                className="mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-3xl"
                style={{
                  background: `${accent}0d`,
                  border: `1px solid ${accent}30`,
                  boxShadow: `0 0 70px ${accent}10`,
                }}
              >
                <ServiceImage
                  slug={slug}
                  emoji={emoji}
                  alt={`${title} automation illustration`}
                  size={440}
                  className="h-full w-full p-4 sm:p-6"
                  priority
                />
              </div>

              <div className="text-center lg:text-left">
                <p className="mb-3 text-sm font-semibold" style={{ color: accent }}>
                  {tagline}
                </p>
                <h1 className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {title}
                </h1>
                <p className="mb-4 text-base leading-relaxed text-silver/75">
                  {shortDescription}
                </p>
                <p className="text-base leading-relaxed text-silver/55">
                  {longDescription}
                </p>

                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    href="/#contact"
                    className="rounded-full bg-neon px-8 py-3 text-center text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(198,255,0,0.4)]"
                  >
                    {ctaText}
                  </Link>
                  <Link
                    href="/#ecosystem"
                    className="rounded-full border border-neon/40 bg-neon/5 px-8 py-3 text-center text-sm font-medium text-neon transition-all hover:border-neon/60 hover:bg-neon/10"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-6">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-6 text-center"
                style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}
              >
                <div className="mb-1 text-3xl font-bold" style={{ color: accent }}>
                  {stat.value}
                </div>
                <div className="text-xs leading-tight text-silver/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neon/70">
              Capabilities
            </p>
            <h2 className="mb-8 text-3xl font-bold text-white">Key Features</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#161616] p-5"
                >
                  <span className="mt-0.5 shrink-0 text-sm font-bold" style={{ color: accent }}>
                    âœ“
                  </span>
                  <span className="text-sm leading-relaxed text-silver/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neon/70">
              Business Impact
            </p>
            <h2 className="mb-8 text-3xl font-bold text-white">Benefits</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="rounded-2xl p-6"
                  style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}
                >
                  <span className="mb-4 block text-sm font-bold" style={{ color: accent }}>
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-silver/70">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neon/70">
              Delivery
            </p>
            <h2 className="mb-8 text-3xl font-bold text-white">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {howItWorks.map((step, index) => (
                <div
                  key={step}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-6 -top-8 text-8xl font-bold opacity-[0.04]"
                    style={{ color: accent }}
                  >
                    {index + 1}
                  </div>
                  <span className="relative mb-4 block text-sm font-bold" style={{ color: accent }}>
                    Step {index + 1}
                  </span>
                  <p className="relative text-sm leading-relaxed text-silver/70">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neon/70">
              Real-World Fit
            </p>
            <h2 className="mb-8 text-3xl font-bold text-white">Who Uses This</h2>
            <div className="space-y-4">
              {useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="flex items-start gap-4 rounded-xl bg-[#0d0d0d] p-5"
                  style={{ border: `1px solid ${accent}18` }}
                >
                  <span className="shrink-0 font-bold" style={{ color: accent }}>
                    â†’
                  </span>
                  <span className="text-sm leading-relaxed text-silver/70">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6">
          <div
            className="mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12"
            style={{ background: `${accent}08`, border: `1px solid ${accent}25` }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to automate your business?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-silver/60">
              Book a free demo and we&apos;ll show you exactly how {title} can work for your
              business.
            </p>
            <Link
              href="/#contact"
              className="inline-flex rounded-full bg-neon px-8 py-3 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(198,255,0,0.4)]"
            >
              {ctaText} â†’
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

