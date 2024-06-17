import MainEditClient from "@/components/screens/MainEdit.client";
import "@/sass/home.scss";
import "@/sass/page.scss";
import "@/sass/profile.scss";
import "@/sass/login.scss";

export default function MainEdit() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <MainEditClient/>
        </div>
      </div>
  );
}