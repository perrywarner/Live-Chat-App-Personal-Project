### Step 1: Set Up Your EC2 Instance

1. **Launch an EC2 instance:**

    - Go to the AWS Management Console.
    - Navigate to the EC2 Dashboard and click "Launch Instance".
    - Choose an Amazon Machine Image (AMI), e.g., Ubuntu Server.
    - Select an instance type, e.g., t2.micro (free tier eligible).
    - Configure instance details, add storage, and configure security group (allow SSH and HTTP access).
    - Review and launch the instance. Download the key pair (.pem file) for SSH access.

2. **Connect to your EC2 instance:**

    Option 1: use the shell script in this project

    ```
    yarn run connect-to-ec2
    ```

    Option 2: if the shell script doesn't work or you don't want to spend the time doing the `.bashrc` setup

    ```sh
    chmod 400 your-key-pair.pem
    ssh -i "your-key-pair.pem" ubuntu@ec2-your-public-ip.compute-1.amazonaws.com
    ```

3. **Update and install necessary packages:**

    ```sh
     # installs nvm (Node Version Manager)
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

     # download and install Node.js (you may need to restart the terminal)
     nvm install 20

     # verifies the right Node.js version is in the environment
     node -v # should print `v20.15.0`

     # verifies the right NPM version is in the environment
     npm -v # should print `10.7.0`
    ```

### Step 2: Deploy Your Express Application to EC2

1. **Clone Your Repository and Install Dependencies:**

    ```bash
    git clone https://github.com/perrywarner/Live-Chat-App-Personal-Project.git
    cd Live-Chat-App-Personal-Project/
    # Set up yarn - see https://yarnpkg.com/getting-started/install
    # Why yarn? It's faster then npm, uses less memory & disk space, and its dependency resolution is more sane
    corepack enable
    yarn install
    ```

2. **Connect the new EC2 instance to the database:**
    - Go to the AWS Management Console.
    - Navigate to the RDS Dashboard and click the database you want to connect the new EC2 instance you created.
    - Scroll down to Connected compute resources and within that table click Set up EC2 connection.
    - Select the new EC2 instance and follow whatever security groups make sense.
3. Securely populate the required environment variables

    Set up a local `.env` file

    ```sh
    touch .env
    nano .env
    ```

    Add the following to the `.env`:

    ```
    # Ask Perry for username and password [it is in his local .env]
    RDS_DATABASE_URL="postgres://username:password@database-1.your-public-ip.rds.amazonaws.com:5432/database-1"
    ```

4. **Run the Express Application:**

    ```bash
    yarn start
    ```

5. **Access your application:**
   Open your browser and navigate to `ec2-3-129-245-125.us-east-2.compute.amazonaws.com:3000` to see "Hello World!".

### Step 3: Set Up a Process Manager (Optional)

To keep your application running in the background, use a process manager like `pm2`.

1. **Install pm2:**

    ```sh
    sudo npm install -g pm2
    ```

2. **Start your application with pm2:**

    ```sh
    pm2 start app.ts
    ```

3. **Set pm2 to start on boot:**
    ```sh
    pm2 startup
    pm2 save
    ```
