import ProfileClient from "@/components/screens/Profile.client";
import "@/sass/home.scss";
import "@/sass/page.scss";
import "@/sass/profile.scss";

export default function Login() {
  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <ProfileClient/>
        </div>
      </div>
  );
}