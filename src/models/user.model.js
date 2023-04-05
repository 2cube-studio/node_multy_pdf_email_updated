import fetch from "node-fetch";
import hubspot from '@hubspot/api-client';


class JobModel {

    getContactData = async (email) => {
        let data = await fetch(`https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                Authorization: `Bearer ${process.env.accessToken}`
            }
        })

        let ContactData = await data.json();

        if (ContactData.category == "OBJECT_NOT_FOUND") {
            return null;
        } else {
            return ContactData
        }
    };

    //Base URL - https://6107279.fs1.hubspotusercontent-na1.net/hubfs/6107279/Energiesparrechner_PDFs/
    updtPdfUrl = async (contId, req, res) => {
        const hubspotClient = new hubspot.Client({ "accessToken": process.env.accessToken });

        const t = Date.now();

        let baseURL = `${process.env.folderStaticURL}`;

        const properties = {
            "de_pdf": `${baseURL}${contId}/${contId}_de.pdf?time=${t}`,
            "fr_pdf": `${baseURL}${contId}/${contId}_fr.pdf?time=${t}`,
            "it_pdf": `${baseURL}${contId}/${contId}_it.pdf?time=${t}`,
        };
        const SimplePublicObjectInput = { properties };
        const contactId = contId;

        try {
            const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, SimplePublicObjectInput);
            // console.log(JSON.stringify(apiResponse.results, null, 2));
            // return JSON.stringify(apiResponse.results, null, 2);
        } catch (e) {
            e.message === 'HTTP request failed' ?
                console.error(JSON.stringify(e.response, null, 2)) :
                console.error(e)
        }
    }

}

export default new JobModel;