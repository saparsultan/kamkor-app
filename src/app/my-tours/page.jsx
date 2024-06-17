import ToursClient from "@/components/screens/Tours.client";
import "@/sass/profile.scss";
import "@/sass/page.scss";

export default async function Tours() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <ToursClient />
        </div>
      </div>
  );
};
