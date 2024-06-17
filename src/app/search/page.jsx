import SearchClient from "@/components/screens/Search.client";
import "@/sass/home.scss";
import "@/sass/page.scss";

export default function Search() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <SearchClient/>
        </div>
      </div>
  );
}
