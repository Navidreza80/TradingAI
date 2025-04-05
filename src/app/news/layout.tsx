export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      {children}
    </main>
  );
}