Last login: Fri Jan 22 16:23:02 on ttys014
➜  ~ sudo cd ~/Downloads
Password:
➜  ~ chmod 400 qwikLABS-L8173-3881442.pem
chmod: qwikLABS-L8173-3881442.pem: No such file or directory
➜  ~ chmod 400 qwikLABS-L8173-3881442.pem
chmod: qwikLABS-L8173-3881442.pem: No such file or directory
➜  ~ ls
Applications Documents    Library      Music        Public       node_modules
Desktop      Downloads    Movies       Pictures     go           yarn.lock
➜  ~ cd ./Downloads 
➜  Downloads chmod 400 qwikLABS-L8173-3881442.pem
➜  Downloads ssh -i qwikLABS-L8173-3881442.pem ec2-user@54.189.143.189
The authenticity of host '54.189.143.189 (54.189.143.189)' can't be established.
ECDSA key fingerprint is SHA256:AV7xrEEG8ZmzBn9WUoBd1U/4As8pn6ZDMhdfoHWhrAc.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '54.189.143.189' (ECDSA) to the list of known hosts.

       __|  __|_  )
       _|  (     /   Amazon Linux AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-ami/2018.03-release-notes/
[ec2-user@ip-10-0-10-226 ~]$ cd /home/ec2-user/workdir
[ec2-user@ip-10-0-10-226 workdir]$ vi 
[ec2-user@ip-10-0-10-226 workdir]$ vi /s3PythonLab/data_transformer.py
[ec2-user@ip-10-0-10-226 workdir]$ ls
lab-2-s3.zip  s3CSharpLab  s3JavaLab  s3PythonLab
[ec2-user@ip-10-0-10-226 workdir]$ vi. /s3PythonLab/data_transformer.py
-bash: vi.: 未找到命令
[ec2-user@ip-10-0-10-226 workdir]$ vi s3PythonLab/data_transformer.py
[ec2-user@ip-10-0-10-226 workdir]$ python data_transformer.py
python: can't open file 'data_transformer.py': [Errno 2] No such file or directory
[ec2-user@ip-10-0-10-226 workdir]$ python /s3PythonLab/data_transformer.py
python: can't open file '/s3PythonLab/data_transformer.py': [Errno 2] No such file or directory
[ec2-user@ip-10-0-10-226 workdir]$ python s3PythonLab/data_transformer.py

RUNNING SOLUTION CODE: create_s3_resource! Follow the steps in the lab guide to replace this method with your own implementation.
/usr/local/lib/python3.5/site-packages/boto3/compat.py:94: PythonDeprecationWarning: Boto3 will no longer support Python 3.5 starting February 1, 2021. To continue receiving service updates, bug fixes, and security updates please upgrade to Python 3.6 or later. More information can be found here: https://aws.amazon.com/blogs/developer/announcing-the-end-of-support-for-python-3-4-and-3-5-in-the-aws-sdk-for-python-and-aws-cli-v1/
  warnings.warn(warning, PythonDeprecationWarning)
Downloaded file DrugAdverseEvents_September.txt
Downloaded file DrugAdverseEvents_October.txt
Uploaded file DrugAdverseEvents_September.txt
Uploaded file DrugAdverseEvents_October.txt

RUNNING SOLUTION CODE: download_file_from_bucket! Follow the steps in the lab guide to replace this method with your own implementation.
DataTransformer: Transforming file: DrugAdverseEvents_October.txt
DrugAdverseEvents_October.txt
DataTransformer: Done

RUNNING SOLUTION CODE: upload_file_to_bucket! Follow the steps in the lab guide to replace this method with your own implementation.

RUNNING SOLUTION CODE: generate_presigned_url! Follow the steps in the lab guide to replace this method with your own implementation.
Pre-signed URL: https://qltrail-lab-8173-1611299775.s3.amazonaws.com/DrugAdverseEvents_October.json?AWSAccessKeyId=AKIAR75FSH2JVJG7BEOV&Signature=APq7WXMB0CFrSPR3NztHR9ekpK0%3D&Expires=1611305610

RUNNING SOLUTION CODE: download_file_from_bucket! Follow the steps in the lab guide to replace this method with your own implementation.
DataTransformer: Transforming file: DrugAdverseEvents_September.txt
DrugAdverseEvents_September.txt
DataTransformer: Done

RUNNING SOLUTION CODE: upload_file_to_bucket! Follow the steps in the lab guide to replace this method with your own implementation.

RUNNING SOLUTION CODE: generate_presigned_url! Follow the steps in the lab guide to replace this method with your own implementation.
Pre-signed URL: https://qltrail-lab-8173-1611299775.s3.amazonaws.com/DrugAdverseEvents_September.json?AWSAccessKeyId=AKIAR75FSH2JVJG7BEOV&Signature=GSd4b3VQqxNaSWr48fWBqV3DMz4%3D&Expires=1611305610
[ec2-user@ip-10-0-10-226 workdir]$ vi s3PythonLab/data_transformer.py

# Copyright 2017 Amazon Web Services, Inc. or its affiliates. All rights
# reserved.

import boto3
import sys
import csv
import json
from botocore.exceptions import ClientError, NoCredentialsError, BotoCoreError
import utils as s3setup
import solution as s3solution

# TODO 1: Set input bucket name (must be globally unique)
INPUT_BUCKET_NAME ="ql-cf-templates-1611299771-b1977f5395ed5107-us-west-2"

# TODO 2: Set output bucket name (must be globally unique)
OUTPUT_BUCKET_NAME = "qltrail-lab-8173-1611299775"


class DataTransformer:

    s3 = None
    bucketSource = None
    bucketDest = None

    def __init__(self):
        self.INPUT_BUCKET_NAME = INPUT_BUCKET_NAME
        self.OUTPUT_BUCKET_NAME = OUTPUT_BUCKET_NAME

        # Set the region in which the lab is running
        self.LAB_REGION = boto3.session.Session().region_name

        # Create S3 resource
        self.s3 = self.create_s3_resource()

        # Set up the input bucket and copy the CSV files. Also, set up the
        # output bucket
        self.bucketSource = s3setup.setup(inputbucket=self.INPUT_BUCKET_NAME,
                                          outputbucket=self.OUTPUT_BUCKET_NAME,
                                          region=self.LAB_REGION)

        inputbucket = self.s3.Bucket(self.INPUT_BUCKET_NAME)
        outputbucket = self.s3.Bucket(self.OUTPUT_BUCKET_NAME)

        # Get summary information for all objects in input bucket
        # Iterate over the list of object summaries
        for object_summary in inputbucket .objects.all():
            # Get the object key from each object summary
            csvkey = object_summary.key

            # Retrieve the object with the specified key from the input bucket
            self.download_file_from_bucket(inputbucket, csvkey)

            # Convert the file from CSV to JSON format
-- 插入 --                                                                                  




