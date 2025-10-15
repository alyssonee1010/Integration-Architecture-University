import axios from "axios";
const baseUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard"

const credentials = {
    username: "guest",
    password: "guest"
}

const config = {
    headers : {
        'Accept' : 'application/json',
    },
    auth: credentials
}

const contacts = await axios.get(`${baseUrl}/Account`, config)

const accounts = contacts.data.objects
console.log(accounts)