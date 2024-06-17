import AgenciesClient from "@/components/screens/Agencies.client";
import "@/sass/home.scss";
import "@/sass/page.scss";

export default async function Agencies() {
  const getList = async () => {
    try {
      const res = await fetch(
          "https://www.fondkamkor.kz/Voucher/partner/dictionaries/get/agents_registry?is_ajax=1&enabled=1&status=1&sortby=rowid",
          {
            method: "GET",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
          },
      );
      return await res.json();
    } catch (e) {
      // console.log(e);
    }
  }
  const data = await getList()

  return (
      <div className="page-blank__container" style={{margin: "20px 0"}}>
        <div className="container">
          <AgenciesClient data={data?.['variants']}/>
        </div>
      </div>
  );
};
