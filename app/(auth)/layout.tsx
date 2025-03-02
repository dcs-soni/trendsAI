import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <div className="min-h-screen bg-black text-white">
        <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {/* Background gradient blobs */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-0 w-96 h-96 bg-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          <div className="max-w-md w-full space-y-8 z-10">{children}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
