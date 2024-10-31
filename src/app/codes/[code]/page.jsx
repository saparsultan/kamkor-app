import "@/sass/home.scss";
import "@/sass/page.scss";
import CodePageClient from "@/components/screens/CodePage.client";

export default function CodePage(props) {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <CodePageClient/>
        </div>
      </div>
  );
}
