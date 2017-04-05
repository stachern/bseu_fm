# BSEU FM

Wok-based site for the Faculty of Management of Belarus State Economic University.

## Setup

    pip install -r requirements.txt

The command above will probably require root privileges while working on a
Unix-like system. Just prepend it with `sudo` then.

## Deployment

To deploy the app one needs to generate the `fm` directory with static assets
that gets created under the `site` directory, zip it and send the archive to
a person who unarchives it and uploads the contents on a FTP server.
Producing the directory can be accomplished by running:

    bin/mkarchive
