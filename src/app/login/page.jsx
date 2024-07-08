import LoginMainClient from "@/components/screens/LoginMain.client";
import "@/sass/home.scss";
import "@/sass/page.scss";
import "@/sass/login.scss";

export default function Login() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
            <LoginMainClient />
        </div>
      </div>
  );
}