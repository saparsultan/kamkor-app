const push = 'fPAdezgdT5GP7sjcrDlnN-:APA91bGbzO6wRaFjVWnNgt-fWnU8wrefBxCzQmAKY0aLZ9MYmKYwQpHC1MKoxtti4lyPMaAwIogj4n4e5kbgiCHuROrwUe7dCTGyXnFU1-jgYNau-s3aW6g'

export async function getTourCodeInfo(code) {
  const res = await fetch(
      `http://report.fondkamkor.kz/partner/packets/tour/${code}?is_ajax=1`,
      {
        method: "GET",
        mode: "no-cors",
          cache: 'no-store',
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
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
          cache: 'no-store',
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
      },
  );
  return await res.json();
}

export async function authTravelAgent(agentlogin, agentpass) {
    const data =  {
        module: "voucher",
        section: "partner",
        object: "home",
        agentlogin: agentlogin,
        agentpass: agentpass,
        pushid: push,
    }
    const res = await fetch(
        `http://report.fondkamkor.kz`,
        {
            method: "POST",
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        },
    );
    return await res.json();
}

export async function getCodes(agentlogin, agentpass) {
    const data =  {
        module:"voucher",
        section:"partner",
        object:"packets",
        param1:"tour",
        param2:"codes",
        agentlogin:agentlogin,
        agentpass:agentpass
    }
    const res = await fetch(
        `http://report.fondkamkor.kz`,
        {
            method: "POST",
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        },
    );
    return await res.json();
}

export async function confirmTourCode(agentlogin, agentpass, tour, phone) {
    const data =  {
        module: "voucher",
        section: "partner",
        object: "packets",
        param1: "tour",
        agentlogin: agentlogin,
        agentpass: agentpass,
        input:{
            tour: tour,
            action:"sign",
            phone: phone
        }
    }
    const res = await fetch(
        `http://report.fondkamkor.kz`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
          cache: 'no-store',
          headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Surrogate-Control': 'no-store',
          },
      }
  );
  return await res.json();
}

export async function getAgencies() {
    const res = await fetch(
        `https://www.fondkamkor.kz/Voucher/partner/dictionaries/get/agents_registry?is_ajax=1&enabled=1&status=1&sortby=rowid`,
        {
            method: "GET",
            mode: "no-cors",
            cache: 'no-store',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
            },
        },
    );
    return await res.json();
}