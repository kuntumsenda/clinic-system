"use client";

import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="relative flex h-[calc(100vh-120px)] w-full items-center justify-center overflow-hidden rounded-xl">
      <div className="z-10 flex flex-col items-center space-y-4 text-center">
        <div className="relative h-24 w-24">
          <Image
            src="/logo.webp"
            alt="Logo Rata"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome, Admin!
          </h1>
          <p className="text-slate-500">
            Select menu on the sidebar to manage clinic.
          </p>
        </div>
      </div>

      <Image
        src="/images/img-r.png"
        width={500}
        height={500}
        className="absolute -bottom-20 -right-20 opacity-5 -rotate-12 pointer-events-none"
        alt="watermark"
      />
    </div>
  );
}
