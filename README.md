# DIRECT UPLOAD - AWS S3

## Settings to allow the connection to S3 Bucket
- Create a AWS S3 Bucket
- Set the Bucket policies and permissions: Allow users to getObject from that Bucket
- Set the Bucket CORS policies: Allow anyone to make GET resquest from different hosts over the internet
- AWS AIM (create a policy and a user to be able to make requests in a certain Bucket)
- Save the Access key and the secret access key in order to stablish a connection with the Bucket 
(https://www.youtube.com/watch?v=yGYeYJpRWPM) tutorial


## Env Variables
- AWS_REGION
- AWS_BUCKET_NAME
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
