import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import util from 'util';
import userController from '../controllers/user.controller.js';


const sendEMail = async (bodyData, res) => {
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
        const contId = bodyData.id;

        const de_data = bodyData;
        const fr_data = bodyData;
        const it_data = bodyData;

        const data_de = {
            id: de_data.id,
            Ihre_Heizart: de_data.Ihre_Heizart,
            Aktuelle_Fenster: de_data.Aktuelle_Fenster,
            email: de_data.email,
            Fenster_verbaut: de_data.Fenster_verbaut,
            Verbaut: de_data.Verbaut,
            Stückzahl: de_data.Stückzahl,
            PZL_und_Ort: de_data.PZL_und_Ort,
            Wärmedurchgang_Glas: de_data.Wärmedurchgang_Glas,
            Fenstertyp: de_data.Fenstertyp,
            s1: de_data.s1,
            s2: de_data.s2,
            s3: de_data.s3,
            w1: de_data.w1,
            w2: de_data.w2,
            w3: de_data.w3
        }

        // French data
        const data_fr = {
            id: fr_data.id,
            Ihre_Heizart: fr_data.Ihre_Heizart,
            Aktuelle_Fenster: fr_data.Aktuelle_Fenster,
            email: fr_data.email,
            Fenster_verbaut: fr_data.Fenster_verbaut,
            Verbaut: fr_data.Verbaut,
            Stückzahl: fr_data.Stückzahl,
            PZL_und_Ort: fr_data.PZL_und_Ort,
            Wärmedurchgang_Glas: fr_data.Wärmedurchgang_Glas,
            Fenstertyp: fr_data.Fenstertyp,
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
            Ihre_Heizart: it_data.Ihre_Heizart,
            Aktuelle_Fenster: it_data.Aktuelle_Fenster,
            email: it_data.email,
            Fenster_verbaut: it_data.Fenster_verbaut,
            Verbaut: it_data.Verbaut,
            Stückzahl: it_data.Stückzahl,
            PZL_und_Ort: it_data.PZL_und_Ort,
            Wärmedurchgang_Glas: it_data.Wärmedurchgang_Glas,
            Fenstertyp: it_data.Fenstertyp,
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
        const html_en = htmlTemplate_en.replace('{{Ihre_Heizart}}', data_de.Ihre_Heizart)
            .replace('{{Aktuelle_Fenster}}', data_de.Aktuelle_Fenster)
            .replace('{{email}}', data_de.email)
            .replace('{{Fenster_verbaut}}', data_de.Fenster_verbaut)
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
            .replace('{{Fenster_verbaut}}', data_fr.Fenster_verbaut)
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
            .replace('{{Fenster_verbaut}}', data_it.Fenster_verbaut)
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
        // await StorePdf(filePath_de, filePath_fr, filePath_it, res);
        // await userController.StorePdf(filePath_de, filePath_fr, filePath_it, contId, res)
        await userController.StorePdf(createdPdf, contId, res)
    }

    main();

};

export default sendEMail;
