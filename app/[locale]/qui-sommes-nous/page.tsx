import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  Code2,
  Headphones,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = {
  title: "Qui sommes-nous | AvadaPay",
  description:
    "Decouvrez AvadaPay, son approche et les personnes qui accompagnent ses solutions de paiement en RDC.",
};

const teamPillars = [
  {
    icon: Landmark,
    titleKey: "team.pillars.compliance.title",
    descriptionKey: "team.pillars.compliance.description",
  },
  {
    icon: Code2,
    titleKey: "team.pillars.product.title",
    descriptionKey: "team.pillars.product.description",
  },
  {
    icon: ShieldCheck,
    titleKey: "team.pillars.operations.title",
    descriptionKey: "team.pillars.operations.description",
  },
  {
    icon: Headphones,
    titleKey: "team.pillars.support.title",
    descriptionKey: "team.pillars.support.description",
  },
];

const teamValues = [
  "team.values.reliability",
  "team.values.clarity",
  "team.values.proximity",
];

const teamMembers = [
  {
    name: "Grace Mbuyi",
    roleKey: "team.members.grace.role",
  },
  {
    name: "David Kanza",
    roleKey: "team.members.david.role",
  },
  {
    name: "Nadine Ilunga",
    roleKey: "team.members.nadine.role",
  },
  {
    name: "Jonathan Masudi",
    roleKey: "team.members.jonathan.role",
  },
  {
    name: "Sarah Tshimanga",
    roleKey: "team.members.sarah.role",
  },
  {
    name: "Patrick Lwamba",
    roleKey: "team.members.patrick.role",
  },
];

const teamStats = [
  {
    value: "2018",
    labelKey: "team.stats.founded",
  },
  {
    value: "24/7",
    labelKey: "team.stats.monitoring",
  },
  {
    value: "BCC",
    labelKey: "team.stats.licensed",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, t] = await Promise.all([params, getI18n()]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-950">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-gray-100 bg-white pt-28 sm:pt-32 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-avada-500/10 to-transparent" />
          <div className="container relative grid gap-10 pb-16 pt-8 md:grid-cols-[1.05fr_0.95fr] md:items-end md:pb-20 lg:gap-16">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-full border border-avada-500/20 bg-avada-500/10 px-4 py-2 text-sm font-bold text-avada-700">
                {t("team.hero.eyebrow" as any, {})}
              </p>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                {t("team.hero.title" as any, {})}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                {t("team.hero.description" as any, {})}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-950 p-5 text-white shadow-2xl shadow-avada-900/10 sm:p-6">
              <div className="grid grid-cols-3 gap-3">
                {teamStats.map((stat) => (
                  <div
                    key={stat.labelKey}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-2xl font-extrabold text-avada-400">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-gray-300">
                      {t(stat.labelKey as any, {})}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-avada-300">
                  {t("team.signature.label" as any, {})}
                </p>
                <p className="mt-3 text-2xl font-extrabold leading-snug">
                  {t("team.signature.title" as any, {})}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {t("team.signature.description" as any, {})}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-avada-600">
                {t("team.members.eyebrow" as any, {})}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
                {t("team.members.title" as any, {})}
              </h2>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6">
              {teamMembers.map((member) => (
                <article
                  key={member.name}
                  className="text-center"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/images/avatar.png"
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 170px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-3 px-1">
                    <h3 className="text-base font-extrabold leading-6 text-gray-950">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase leading-5 tracking-[0.1em] text-avada-600">
                      {t(member.roleKey as any, {})}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-14 sm:py-20 lg:py-24">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-avada-600">
                {t("team.pillars.eyebrow" as any, {})}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
                {t("team.pillars.title" as any, {})}
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {teamPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.titleKey}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-avada-500/10 text-avada-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-950">
                      {t(pillar.titleKey as any, {})}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-gray-600">
                      {t(pillar.descriptionKey as any, {})}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-avada-600">
                {t("team.values.eyebrow" as any, {})}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
                {t("team.values.title" as any, {})}
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                {t("team.values.description" as any, {})}
              </p>
            </div>

            <div className="grid gap-4">
              {teamValues.map((valueKey, index) => (
                <div
                  key={valueKey}
                  className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-extrabold text-avada-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-bold leading-7 text-gray-900">
                    {t(valueKey as any, {})}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-950 py-14 text-white sm:py-20 lg:py-20">
          <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                {t("team.cta.title" as any, {})}
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-300">
                {t("team.cta.description" as any, {})}
              </p>
            </div>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-avada-500 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-avada-900/20 transition-colors hover:bg-avada-600"
            >
              {t("team.cta.button" as any, {})}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
