import pdfCreate from '../utils/pdfCreate.utils.js';
import userModel from "../models/user.model.js";
import uploadFilesModel from "../models/uploadFiles.model.js";


/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {

    findContact = async (req, res, next) => {
        let email = req.body.email
        const hs_contact = await userModel.getContactData(email)

        if (hs_contact !== null) {
            req.body.id = hs_contact.vid;
            const bodyData = req.body;

            const uplodedFiles = await uploadFilesModel.getFilesFromHubSpot();

            if (uplodedFiles.objects.length > 0) {

                let foderHas = false;
                let folderName = null;
                uplodedFiles.objects.map(item => {
                    if (hs_contact.vid == item.name) {
                        foderHas = true;
                        folderName = item.id
                    }
                });

                if (foderHas) {
                    const result = await uploadFilesModel.deleteFile(folderName)
                    console.log(result)
                }
            }

            await pdfCreate(bodyData, res);
        } else {
            return res.status(500).json({ message: `Incorrect This Email Address'${req.body.email}'.` });
        }

    };

    StorePdf = async (createdPdf, contId, res) => {

        await uploadFilesModel.saveFilesInHubSpot(createdPdf, contId, res);

        await this.upateUrl(contId)
    };

    upateUrl = async (contId, req, res) => {
        await userModel.updtPdfUrl(contId);
        await this.deleteLocalFile(contId)
        // res.send();
        // console.log(result)
        // return res.status(500).json({ message: `Incorrect this email ` });
    };

    deleteLocalFile = async (contId) => {
        await uploadFilesModel.deleteLocalFile(contId)
    }
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new UserController;