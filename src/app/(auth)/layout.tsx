import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-primary lg:flex flex-col justify-center p-12 text-primary-foreground relative">
        <div className="max-w-md ">
          <Image
            src="/images/img-r.png"
            width={500}
            height={500}
            alt="R"
            className="opacity-5 absolute bottom-0 right-0"
          />
          <h1 className="text-5xl font-bold mb-4">RATA</h1>
          <p className="text-lg opacity-90">Clinic Management System</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
