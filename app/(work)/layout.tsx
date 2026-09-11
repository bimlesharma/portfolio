import BlogNavbar from "@/components/BlogNavbar";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />
      {children}
    </>
  );
}
