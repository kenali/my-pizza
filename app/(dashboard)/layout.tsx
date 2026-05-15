export const metadata = {
  title: "My Pizza | Dashboard",
  description:
    "Admin dashboard for My Pizza. Manage orders, products, and customer data efficiently.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      DASHBOARD HEADER
      {children}
    </main>
  );
}
