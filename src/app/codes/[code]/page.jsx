import "@/sass/home.scss";
import "@/sass/page.scss";
import CodePageClient from "@/components/screens/CodePage.client";

export default function CodePage() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <CodePageClient/>
        </div>
      </div>
  );
}

export async function generateStaticParams() {
    // Пример данных для статической генерации
    const codes = ["code1", "code2", "code3"];
    return codes.map((code) => ({ code }));
}
