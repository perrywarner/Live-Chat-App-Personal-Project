# PLEASE READ

**THESE NOTES ARE ARCHIVED** since I didn't set up Postgres from scratch. I had spent a few days trying to get Postgres to work but then came across [this video from Theo](https://www.youtube.com/watch?v=cC6HFd1zcbo&t=2282s) that had a lot of insight as illustrated in this diagram:

![alt text](railway-use-case.png 'Railway Usecase')

Theo sold Railway as the most pragmatic choice for me since I found myself days into Postgres setup & config with no end in sight, and Postgres was only supposed to be "working" and then Prisma would do the heavy lifting from that point. Railway seemed to be [**INSANELY SIMPLE TO SET UP**](https://youtu.be/cC6HFd1zcbo?t=968) but still provided the full power of a Postgres DB - this seemed perfect for my use case. I tried what Theo did and it was seriously that simple! I haven't turned back since.

Keep around the notes I was working on since I put hours into this and maybe it'll help me in the future.

---

---

# Postgres: setup

-   Postgres is the DB in use for this app.
-   Postgres is a "client-server DB" so it needs to exist on a separate server (and process) then this backend's Express server.
-   This backend connects to and manipulates the Postgres DB via Prisma ORM.

## How to start existing Postgres for Prisma

-   .
-   TODO this should be a shell script instead of a series of commands

## Fresh Setup (local Prisma and Postgres)

Prerequisites:

-   Node, NPM & Yarn: run `yarn -v`, if the output is not "3.2.1" or later, follow the setup steps on this project's main README first.
-   Prisma installed: run `yarn install`. Don't do anything else with Prisma yet.
-   OS: Guide works for Ubuntu v. 18.04+ or WSL with Ubuntu v. 20.04 LTS. Other OS probably work but you'll have to figure out Steps #1-3 yourself

Sources:

-   Step #-#: adapted from [this DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04). If you're using WSL (Windows Linux) like me, `sudo systemctl start postgresql.service` will error; try `sudo service postgresql start` instead.
-   Steps #-#: adapted from [Prisma's Relational databases quickstart](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres). **DO NOT** directly follow their tutorial, the steps that involve adding packages like `npm install prisma ...` or generating assets such as `npx prisma init` are destructive and I've already set that stuff up.

1. **Install Postgres** & "contrib" packages
    1. `sudo apt update`
    2. `sudo apt install postgresql postgresql-contrib`
2. **Start the Postgres Server** by first checking your OS
    1. If: using **Ubuntu v. 18.04+** then `sudo systemctl start postgresql.service`
    2. If: using **WSL with Ubuntu v. 20.04 LTS** then `sudo service postgresql start` (WSL is different since ["systemctl" doesn't come with WSL](https://askubuntu.com/a/1379567))
    3. Else: haven't tested otherwise, maybe try `sudo systemctl start postgres.service`? `¯\_/(ツ)\_/¯`
3. **Switch to the Postgres account**
    1. Before: terminal prompt should be something like `(username)@(computer):(current filepath)$`
    2. `sudo -i -u postgres`
    3. After: terminal prompt should now be `postgres@(computer):~$`
        1. Later: can go back to your user once you're done with `exit`
4. **Test that Postgres works**
    1. Run Postgres: `psql`
    2. Check: prompt should be `postgres=#`
    3. View Connection Info: `\conninfo`
    4. Check: hopefully **exactly matches** `You are connected to database "postgres" as user "postgres" via socket in "/var/run/postgresql" at port "5432".`. OK if different but keep track of your output: you'll need to change **Step 6.3** to work for you.
    5. Exit Postgres process: `\q`
    6. Exit Postgres user: `exit`
5. **Create a User for Prisma**:
    1. Check logged in as "postgres": prompt should be `postgres@(computer):~$`
    2. Run Create User Script: `createuser --interactive` with name "prisma" and superuser: yes
6. **Create a DB for Prisma**
    1. Check logged in as "postgres": prompt should be `postgres@(computer):~$`
    2. `psql`
    3. `\l`
    4. Check: **should NOT** see a line that looks like `postgres | postgres | UTF8 | C.UTF-8 | C.UTF-8 |`
    5. `createdb prisma`
    6. `psql`
    7. `\l`
    8. Check: compared to before, **should** see a new line and it should look like `postgres | postgres | UTF8 | C.UTF-8 | C.UTF-8 |`
7. **Setup ".env" file** to let [Prisma know how to connect to Postgres](https://www.prisma.io/docs/concepts/database-connectors/postgresql#example)
    1. Navigate to project root: `cd` to same directory as `package.json` (_not_ `client-side/package.json`)
    2. Create ".env" file: `touch .env` - will create if ".env" doesn't exist, [does nothing otherwise](https://unix.stackexchange.com/a/427240)
    3. Modify the ".env" file:
        1. If the output of **Step 4.4** was **exact match**: add the line `DATABASE_URL="postgresql://postgres@localhost:5432/postgres"`
        2. Else: add the line `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"`. The stuff in caps are placeholders, you'll need to [check this doc](https://www.prisma.io/docs/concepts/database-connectors/postgresql#base-url-and-path) to figure out how to set them up.
8. **Initialize Prisma**
    1. `yarn prisma migrate dev --name init`

## Misc

Where I left off 8/10

where I'm at with this Prisma & Postgres stuff @ 2:30pm:

1. try to get "yarn prisma migrate dev --name init" to work with my .env
   -- **ALSO** added step #5 to doc since its mentioned in Step 3 of https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04
   -- determine: do I even need step #5? If it turns out to be redundant, need to remove this from doc

2. once "yarn prisma ... init" command works, need to rework doc step #7.3.1 to mostly match .env
3. after finish #7.3.1, then continue setup process & doc from step #8.1
