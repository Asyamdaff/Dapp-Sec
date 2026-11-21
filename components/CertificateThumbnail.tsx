"use client";

import { useRef, useState, type MouseEvent } from "react";

type Props = { src: string; alt: string };

/** Thumbnail that opens the full certificate in a native <dialog> lightbox. */
export default function CertificateThumbnail({ src, alt }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [missing, setMissing] = useState(false);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Clicks on the dialog element itself (outside its content) are backdrop clicks.
  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  const filePath = `public${src}`;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`View ${alt} certificate full size`}
        className="w-28 shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-charcoal transition-colors duration-500 group-hover:border-accent/30 md:w-32"
      >
        {missing ? (
          <span className="flex aspect-[4/3] flex-col items-center justify-center gap-1 p-2 text-center font-mono text-[9px] leading-tight text-slate-500">
            Add image
            <span className="break-all text-slate-600">{filePath}</span>
          </span>
        ) : (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
            className="aspect-[4/3] w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-label={`${alt} certificate`}
        className="m-auto w-[min(92vw,960px)] max-w-none rounded-2xl border border-white/10 bg-charcoal p-0 text-slate-300 shadow-2xl backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4">
          <p className="text-sm text-white">{alt}</p>
          <button
            type="button"
            onClick={close}
            className="rounded-full px-3 py-1 font-mono text-xs text-slate-400 transition-colors hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="p-4 md:p-6">
          {missing ? (
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 p-6 text-center font-mono text-xs text-slate-500">
              Certificate image not found
              <span className="break-all text-slate-600">{filePath}</span>
            </div>
          ) : (
            <img src={src} alt={`${alt} certificate`} className="mx-auto max-h-[75vh] w-full object-contain" />
          )}
        </div>
      </dialog>
    </>
  );
}