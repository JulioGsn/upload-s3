import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";

import dotenv from 'dotenv';
import aws from 'aws-sdk';
import { error } from "@sveltejs/kit";

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey =  process.env.AWS_SECRET_ACCESS_KEY;

// Setting the s3 object access

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
});

export async function load<PageServerLoad>() {
    console.log("Running on the server only");

    // TODO: how to save the file with correct extension (.png, .jpg, .bitmap)

    const imageName = "test-" + new Date().getTime();

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300
    });

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', params);

        // const uploadURL = 'skldfjlsdjf';

        if(!uploadURL) {
            throw error(404, 'Not found');
        }

        console.log("URL específica gerada", uploadURL);
        return { msg: "Url gerada com sucesso", uploadURL }
    } catch (err) {
        console.log("Error: ", err);
        return { error: true, msg: err }
    }
}