
"use client";

import Image from "next/image";

const logos = [
  {
    name: "PT Q2 Technologies",
    src: "/logos/q2-technologies.png",
  },
  {
    name: "CTI Group",
    src: "/logos/cti-group.png",
  },
  {
    name: "CIMB Niaga",
    src: "/logos/cimb-niaga.png",
  },
  {
    name: "Sinar Mas Mining",
    src: "/logos/sinarmas-mining.png",
  },
  {
    name: "Sinarmas Sekuritas",
    src: "/logos/sinarmas-sekuritas.png",
  },
  {
    name: "Danamas",
    src: "/logos/danamas.png",
  },
  {
    name: "PT Sarana Multi Infrastruktur",
    src: "/logos/smi.png",
  },
    {
    name: "PT Pos Indonesia (Persero)",
    src: "/logos/posind.png",
  },
];

export default function CompanyMarquee() {
  const repeatedLogos = [...logos, ...logos];

  return (
    <section className="overflow-hidden border-y border-white/[0.06] py-14">
      <div className="mx-auto mb-9 max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Professional Exposure</span>

            <h2 className="mt-3 text-xl font-medium tracking-tight text-white md:text-2xl">
              Organizations I’ve worked with.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            Professional experience across enterprise endpoint security, endpoint management, and security operations environments.
          </p>
        </div>
      </div>

      <div className="logo-marquee-mask">
        <div className="logo-marquee-track items-center gap-16 px-8">
          {repeatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group flex h-20 w-44 shrink-0 items-center justify-center"
              title={logo.name}
            >
              <div className="flex h-16 w-40 items-center justify-center rounded-md bg-white px-4 py-2">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={64}
                  //className="max-h-12 w-auto max-w-36 object-contain opacity-50 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                    className="max-h-12 w-auto max-w-36 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
