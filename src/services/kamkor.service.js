const BASE_URL = 'https://report.fondkamkor.kz';
export default class KamkorService {

    static async getAgencies() {
        const response = await fetch(`${BASE_URL}/Voucher/partner/dictionaries/get/agents_registry?is_ajax=1&enabled=1&status=1&sortby=rowid?_t=${Date.now()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        return response.json();
    }

    static async getTourCodeInfo(code) {
        const response = await fetch(`${BASE_URL}/partner/packets/tour/${code}?is_ajax=1`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        return response.json();
    }

    static async getTouristToursList(passport, pushId, phone) {
        const response = await fetch(`${BASE_URL}/partner/packets/tour/gettourcodeslist?is_ajax=1&passport=${passport}&pushid=${pushId}&phone=${phone}`, {
            method: "GET",
            headers: {
                // 'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            // cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        return response.json();
    }

    static async authTravelAgent(agentlogin, agentpass) {
        const data =  {
            module: "voucher",
            section: "partner",
            object: "home",
            agentlogin: agentlogin,
            agentpass: agentpass
        }
        const res = await fetch(
            `${BASE_URL}`,
            {
                method: "POST",
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            },
        );
        return await res.json();
    }

    static async authUser(passport, pushId, phone) {
        const res = await fetch(
            `${BASE_URL}/partner/packets/tour/addnewpushid?is_ajax=1&passport=${passport}&pushid=${pushId}&phone=${phone}`,
            {
                method: "POST",
                cache: 'no-store',
            },
        );
        return await res.json();
    }

    static async getCodes(agentlogin, agentpass) {
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
            `${BASE_URL}`,
            {
                method: "POST",
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            },
        );
        return await res.json();
    }

    static async confirmTourCode(agentlogin, agentpass, tour, phone) {
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
            `${BASE_URL}`,
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
}
