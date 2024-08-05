import ConfirmClient from "@/components/screens/Confirm.client";
import "@/sass/home.scss";
import "@/sass/page.scss";
import "@/sass/login.scss";

export default function Confirm() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <ConfirmClient/>
        </div>
      </div>
  );
}
