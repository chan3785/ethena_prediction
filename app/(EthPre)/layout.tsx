import Header from '@/components/layout/header';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 overflow-hidden pt-20">
          <div className="container relative">{children}</div>
        </main>
      </div>
    </>
  );
}
