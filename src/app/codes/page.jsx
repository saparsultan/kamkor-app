import AgenciesClient from "@/components/screens/Agencies.client";
import "@/sass/home.scss";
import "@/sass/page.scss";
import CodesClient from "@/components/screens/Codes.client";

export default async function Codes() {

  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <CodesClient/>
        </div>
      </div>
  );
};
