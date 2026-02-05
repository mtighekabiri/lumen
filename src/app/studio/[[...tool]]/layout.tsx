export const metadata = {
  title: 'Lumen Content Manager',
  description: 'Content management for Lumen Research website',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
