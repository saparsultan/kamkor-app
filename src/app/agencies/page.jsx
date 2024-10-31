import AgenciesClient from "@/components/screens/Agencies.client";
import "@/sass/home.scss";
import "@/sass/page.scss";

export default async function Agencies() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <AgenciesClient/>
        </div>
      </div>
  );
};
