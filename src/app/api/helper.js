export async function getTourCodeInfo(code) {
  const res = await fetch(
      `http://report.fondkamkor.kz/partner/packets/tour/${code}?is_ajax=1`,
      {
        method: "GET",
        mode: "no-cors",
      },
  );
  return await res.json();
}

export async function authUser(passport, pushId, phone) {
  const res = await fetch(
      `http://report.fondkamkor.kz/partner/packets/tour/addnewpushid?is_ajax=1&passport=${passport}&pushid=${pushId}&phone=${phone}`,
      {
        method: "POST",
        mode: "no-cors",
      },
  );
  return await res.json();
}

export async function getTours(passport, pushId, phone) {
  const res = await fetch(
      `http://report.fondkamkor.kz/partner/packets/tour/gettourcodeslist?is_ajax=1&passport=${passport}&pushid=${pushId}&phone=${phone}`,
      {
        method: "POST",
        mode: "no-cors",
      },
  );
  return await res.json();
}