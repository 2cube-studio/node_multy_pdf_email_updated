import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import util from 'util';
import userController from '../controllers/user.controller.js';


const pdfCreate = async (bodyData, res) => {
    const writeFileAsync = util.promisify(fs.writeFile);

    // Function to generate PDF file from HTML and CSS
    async function generatePDF(html, css) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.addStyleTag({ content: css });
        const pdfBuffer = await page.pdf();
        await browser.close();
        return pdfBuffer;
    }

    // Example usage
    async function main() {
        const date = new Date();
        const options = { hour12: true, hour: "numeric" };
        const formattedDate = date.toLocaleString("en-US", options);
        const contId = bodyData.id;

        const de_data = bodyData;
        const fr_data = bodyData;
        const it_data = bodyData;

        const option_1 = de_data.Ihre_Heizart; // 3
        const option_2 = de_data.Ihre_Heizart;
        var langObj = {
            "de": {
                "moneysaving": "CHF",
                "energysaving": {
                    "1": "Liter",
                    "2": "m3",
                    "3": "kg/Jahr",
                    "4": "kg"
                },
                "CO2reduction": "kg/Jahr",
                "CO2reduction2": "kg"
            },
            "it": {
                "moneysaving": "CHF",
                "energysaving": {
                    "1": "Litri",
                    "2": "m3",
                    "3": "kg/anno",
                    "4": "kg"
                },
                "CO2reduction": "kg/anno",
                "CO2reduction2": "kg"
            },
            "fr": {
                "moneysaving": "CHF",
                "energysaving": {
                    "1": "Litres",
                    "2": "m3",
                    "3": "kg/année",
                    "4": "kg"
                },
                "CO2reduction": "kg/année",
                "CO2reduction2": "kg"
            }
        }

        // option_1 = 3
        const d_1 = langObj['de']['moneysaving'][option_1]; // CHF
        const d_2 = langObj['de']['energysaving'][option_2]; // kg/Jahr
        const d_3 = langObj['de']['co2reduction']; // kg/Jahr

        const f_1 = langObj['fr']['moneysaving']; // CHF
        const f_2 = langObj['fr']['energysaving'][option_1]; // kg/Jahr
        const f_3 = langObj['fr']['co2reduction']; // kg/Jahr

        const i_1 = langObj['it']['moneysaving']; // CHF
        const i_2 = langObj['it']['energysaving'][option_1]; // kg/Jahr
        const i_3 = langObj['it']['co2reduction']; // kg/Jahr

        let d_s1 = `${de_data.s1} ${d_1}`;
        let d_s2 = `${de_data.s2} ${d_2}`;
        let d_s3 = `${de_data.s3} ${d_3}`;

        const data_de = {
            id: de_data.id,
            Ihre_Heizart: (de_data.Ihre_Heizart == 1) ? 'Öl' : (de_data.Ihre_Heizart == 2) ? 'Holz' : 'Gas',
            Aktuelle_Fenster: (de_data.Aktuelle_Fenster == 1) ? 'einfach verglast (Uw: Ø 5,8)' : 'doppelt verglast (Uw: Ø 2,8)',
            email: de_data.email,
            Verbaut: (de_data.Verbaut == 1) ? 'Fenster' : (de_data.Verbaut == 2) ? 'Hebeschiebetüren' : 'Balkontüren',
            Stückzahl: de_data.Stückzahl,
            PZL_und_Ort: de_data.PZL_und_Ort,
            Wärmedurchgang_Glas: (de_data.Wärmedurchgang_Glas == 1) ? 'dreifach verglast (Ug = 0,5)' : 'dreifach verglast (Ug = 0,7)',
            Fenstertyp: (de_data.Fenstertyp == 1) ? 'Kunststofffenster' : (de_data.Fenstertyp == 2) ? 'Kunststoff/Aluminium-Fenster' : (de_data.Fenstertyp == 3) ? 'Holzfenster' : 'Holz/Aluminium-Fenster',
            s1: d_s1,
            s2: d_s2,
            s3: d_s3,
            w1: de_data.w1,
            w2: de_data.w2,
            w3: de_data.w3
        }

        // French data
        const data_fr = {
            id: fr_data.id,
            Ihre_Heizart: (fr_data.Ihre_Heizart == 1) ? 'fioul' : (fr_data.Ihre_Heizart == 2) ? 'bois' : 'gaz',
            Aktuelle_Fenster: (fr_data.Aktuelle_Fenster == 1) ? 'simple vitrage (coefficient U: Ø 5,8)' : 'double vitrage (coefficient U: Ø 2,8)',
            email: fr_data.email,
            Verbaut: (fr_data.Verbaut == 1) ? 'fenêtres' : (fr_data.Verbaut == 2) ? 'portes coulissantes à levage' : 'portes-fenêtres',
            Stückzahl: fr_data.Stückzahl,
            PZL_und_Ort: fr_data.PZL_und_Ort,
            Wärmedurchgang_Glas: (fr_data.Wärmedurchgang_Glas == 1) ? 'verre premium, triple vitrage (Ug = 0,5)' : 'verre standard, triple vitrage (Ug = 0,7)',
            Fenstertyp: (fr_data.Fenstertyp == 1) ? 'Fenêtres en PVC' : (fr_data.Fenstertyp == 2) ? 'Fenêtres en PVC/aluminium' : (fr_data.Fenstertyp == 3) ? 'Fenêtre en bois' : 'Fenêtres en bois/aluminium',
            s1: fr_data.s1,
            s2: fr_data.s2,
            s3: fr_data.s3,
            w1: fr_data.w1,
            w2: fr_data.w2,
            w3: fr_data.w3
        }

        // Spanish data
        const data_it = {
            id: it_data.id,
            Ihre_Heizart: (it_data.Ihre_Heizart == 1) ? 'Gasolio' : (it_data.Ihre_Heizart == 2) ? 'Legno' : 'Gas',
            Aktuelle_Fenster: (it_data.Aktuelle_Fenster == 1) ? 'A vetro singolo (Uw: Ø 5,8)' : 'A vetro doppio (Uw: Ø 2,8)',
            email: it_data.email,
            Verbaut: (it_data.Verbaut == 1) ? 'Finestre' : (it_data.Verbaut == 2) ? 'Porte scorrecoli a sollevamento' : 'Porte-finestre',
            Stückzahl: it_data.Stückzahl,
            PZL_und_Ort: it_data.PZL_und_Ort,
            Wärmedurchgang_Glas: (it_data.Wärmedurchgang_Glas == 1) ? 'Vetro premium, vetro triplo (Ug = 0,5)' : 'Vetro standard, vetro triplo (Ug = 0,7)',
            Fenstertyp: (it_data.Fenstertyp == 1) ? 'Finestre in PVC' : (it_data.Fenstertyp == 2) ? 'Finestre in PVC/alluminio' : (it_data.Fenstertyp == 3) ? 'Finestre in legno' : 'Finestre in legno/alluminio',
            s1: it_data.s1,
            s2: it_data.s2,
            s3: it_data.s3,
            w1: it_data.w1,
            w2: it_data.w2,
            w3: it_data.w3
        }

        // console.log(data_en, data_fr, data_es)

        // English PDF
        const htmlTemplate_en = fs.readFileSync(path.resolve() + '/src/assets/templates/index_de.html', 'utf8');
        const html_en = htmlTemplate_en.replace('{{dateformate}}', formattedDate)
            .replace('{{Ihre_Heizart}}', data_de.Ihre_Heizart)
            .replace('{{Aktuelle_Fenster}}', data_de.Aktuelle_Fenster)
            .replace('{{email}}', data_de.email)
            .replace('{{Verbaut}}', data_de.Verbaut)
            .replace('{{Stückzahl}}', data_de.Stückzahl)
            .replace('{{PZL_und_Ort}}', data_de.PZL_und_Ort)
            .replace('{{Wärmedurchgang_Glas}}', data_de.Wärmedurchgang_Glas)
            .replace('{{Fenstertyp}}', data_de.Fenstertyp)
            .replace('{{s1}}', data_de.s1)
            .replace('{{s2}}', data_de.s2)
            .replace('{{s3}}', data_de.s3)
            .replace('{{w1}}', data_de.w1)
            .replace('{{w2}}', data_de.w2)
            .replace('{{w3}}', data_de.w3);
        const css_de = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_de = await generatePDF(html_en, css_de);
        const filePath_de = path.resolve() + `/public/pdf_files/${data_de.id}_de.pdf`;
        await writeFileAsync(filePath_de, pdfBuffer_de);
        console.log(`PDF saved to ${filePath_de}`);

        // French PDF
        const htmlTemplate_fr = fs.readFileSync(path.resolve() + '/src/assets/templates/index_fr.html', 'utf8');
        const html_fr = htmlTemplate_fr.replace('{{Ihre_Heizart}}', data_fr.Ihre_Heizart)
            .replace('{{Aktuelle_Fenster}}', data_fr.Aktuelle_Fenster)
            .replace('{{email}}', data_fr.email)
            .replace('{{Verbaut}}', data_fr.Verbaut)
            .replace('{{Stückzahl}}', data_fr.Stückzahl)
            .replace('{{PZL_und_Ort}}', data_fr.PZL_und_Ort)
            .replace('{{Wärmedurchgang_Glas}}', data_fr.Wärmedurchgang_Glas)
            .replace('{{Fenstertyp}}', data_fr.Fenstertyp)
            .replace('{{s1}}', data_fr.s1)
            .replace('{{s2}}', data_fr.s2)
            .replace('{{s3}}', data_fr.s3)
            .replace('{{w1}}', data_fr.w1)
            .replace('{{w2}}', data_fr.w2)
            .replace('{{w3}}', data_fr.w3);
        const css_fr = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_fr = await generatePDF(html_fr, css_fr);
        const filePath_fr = path.resolve() + `/public/pdf_files/${data_fr.id}_fr.pdf`;
        await writeFileAsync(filePath_fr, pdfBuffer_fr);
        console.log(`PDF saved to ${filePath_fr}`);

        // Spanish PDF
        const htmlTemplate_es = fs.readFileSync(path.resolve() + '/src/assets/templates/index_it.html', 'utf8');
        const html_es = htmlTemplate_es.replace('{{Ihre_Heizart}}', data_it.Ihre_Heizart)
            .replace('{{Aktuelle_Fenster}}', data_it.Aktuelle_Fenster)
            .replace('{{email}}', data_it.email)
            .replace('{{Verbaut}}', data_it.Verbaut)
            .replace('{{Stückzahl}}', data_it.Stückzahl)
            .replace('{{PZL_und_Ort}}', data_it.PZL_und_Ort)
            .replace('{{Wärmedurchgang_Glas}}', data_it.Wärmedurchgang_Glas)
            .replace('{{Fenstertyp}}', data_it.Fenstertyp)
            .replace('{{s1}}', data_it.s1)
            .replace('{{s2}}', data_it.s2)
            .replace('{{s3}}', data_it.s3)
            .replace('{{w1}}', data_it.w1)
            .replace('{{w2}}', data_it.w2)
            .replace('{{w3}}', data_it.w3);
        const css_it = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_it = await generatePDF(html_es, css_it);
        const filePath_it = path.resolve() + `/public/pdf_files/${data_it.id}_it.pdf`;
        await writeFileAsync(filePath_it, pdfBuffer_it);
        console.log(`PDF saved to ${filePath_it}`);

        // Email all PDFs
        const attachments = [
            { filename: '2cube-test_de.pdf', content: pdfBuffer_de },
            { filename: '2cube-test_fr.pdf', content: pdfBuffer_fr },
            { filename: '2cube-test_it.pdf', content: pdfBuffer_it }
        ];
        const createdPdf = [filePath_de, filePath_fr, filePath_it]
        await userController.StorePdf(createdPdf, contId, res)
    }

    main();

};

export default pdfCreate;
