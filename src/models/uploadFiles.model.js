import fetch from "node-fetch";
import fs from 'fs';
import request from 'request';
import path from 'path';


class UploadFilesModel {

    getFilesFromHubSpot = async (email) => {
        const fileFolderId = `${process.env.folderId}`;

        // let response = await fetch(`https://api.hubapi.com/filemanager/api/v3/files?folderId=${fileFolderId}`, {
        let response = await fetch(`https://api.hubapi.com/filemanager/api/v2/folders?parent_folder_id=${fileFolderId}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                Authorization: `Bearer ${process.env.accessToken}`
            }
        })

        let filesData = await response.json();
        return filesData;

    }

    saveFilesInHubSpot = async (createdPdf, contId, res) => {
        const postUrl = 'https://api.hubapi.com/filemanager/api/v3/files/upload';
        const headers = {
            Authorization: `Bearer ${process.env.accessToken}`
        };
        const fileOptions = {
            access: 'PUBLIC_INDEXABLE',
            ttl: 'P3M',
            overwrite: false,
            duplicateValidationStrategy: 'NONE',
            duplicateValidationScope: 'ENTIRE_PORTAL'
        };
        // const folderPath = `${process.env.folderPath}`;
        const folderPath = `${process.env.folderPath}/${contId}`;
        const filepaths = createdPdf;

        // Use Promise.all() to wait for all the requests to complete
        const response = await Promise.all(filepaths.map(filepath => {
            const formData = {
                file: fs.createReadStream(filepath),
                options: JSON.stringify(fileOptions),
                folderPath: folderPath
            };
            return new Promise((resolve, reject) => {
                request.post({
                    url: postUrl,
                    formData: formData,
                    headers: headers
                }, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        console.error('Error:', err);
                        resolve(`Error uploading file ${filepath}: ${err}`);
                    } else {
                        resolve(`File ${filepath} uploaded successfully`);
                    }
                });
            });
        }));

        // Join the response array into a single string with line breaks
        const responseText = response.join('\n');

        // Send the response back to the client
        res.send(responseText);
    }

    deleteFile = async (id) => {
        let response = await fetch(`https://api.hubapi.com/filemanager/api/v2/folders/${id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                Authorization: `Bearer ${process.env.accessToken}`
            }
        })

        let filesData = await response.json();
        return filesData;
    }

    deleteLocalFile = async (contId) => {
        // Delete English PDF
        const filePath_de = path.resolve() + `/public/pdf_files/${contId}_de.pdf`;
        fs.unlink(filePath_de, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`File ${filePath_de} deleted successfully`);
        });

        // Delete French PDF
        const filePath_fr = path.resolve() + `/public/pdf_files/${contId}_fr.pdf`;
        fs.unlink(filePath_fr, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`File ${filePath_fr} deleted successfully`);
        });

        // Delete Spanish PDF
        const filePath_it = path.resolve() + `/public/pdf_files/${contId}_it.pdf`;
        fs.unlink(filePath_it, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`File ${filePath_it} deleted successfully`);
        });
    }

}

export default new UploadFilesModel;