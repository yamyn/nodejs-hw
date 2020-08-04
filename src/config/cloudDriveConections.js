const AWS = require('aws-sdk');

const { S3_CLIENT_ID, S3_CLIENT_SECRET, S3_REGION, S3_BUCKET } = process.env;

const s3GetClient = () => {
    AWS.config.update({
        accessKeyId: S3_CLIENT_ID,
        secretAccessKey: S3_CLIENT_SECRET,
        region: S3_REGION,
    });
    const s3 = new AWS.S3();
    const params = { Bucket: S3_BUCKET };

    return {
        s3,
        setParams: newParams => ({ ...params, ...newParams }),
    };
};
module.exports = s3GetClient();
