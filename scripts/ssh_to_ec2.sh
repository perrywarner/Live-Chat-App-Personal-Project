### README! Required setup if you want to use this script:
## STEP 1
# Add these lines to your .bashrc or .zshrc file
# export LIVE_CHAT_EC2_1_PEM_KEY_PATH="/path/to/your/keyfile.pem"
# export LIVE_CHAT_EC2_1_PUBLIC_DNS="ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com"
## STEP 2
# Make sure the .pem file has access control that EC2 is okay with:
# chmod 400 "keyfile.pem"
### 

#!/bin/bash

# Check if environment variables are set
if [[ -z "$LIVE_CHAT_EC2_1_PEM_KEY_PATH" || -z "$LIVE_CHAT_EC2_1_PUBLIC_DNS" ]]; then
  echo "Environment variables LIVE_CHAT_EC2_1_PEM_KEY_PATH or LIVE_CHAT_EC2_1_PUBLIC_DNS are not set."
  exit 1
fi

# SSH into the EC2 instance
ssh -i "$LIVE_CHAT_EC2_1_PEM_KEY_PATH" ubuntu@"$LIVE_CHAT_EC2_1_PUBLIC_DNS"
