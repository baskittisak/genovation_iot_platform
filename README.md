# Genovation | IoT Platform

The IoT Platform is a demo project for IoT device management.

## Installation

For the first time, please ensure the Docker daemon is running, and then run the following command:

```bash
(cd client && npm install) && (cd server && npm install) && docker-compose up --build
```

If it’s not your first time, you can just run the command:

```bash
docker-compose up --build
```

## Usage

You can use the URL link from your container, such as Docker Desktop or OrbStack, to run it directly.

If you want to use the prepared database, you can import the file named _iot_platform.devices.json_ into MongoDB directly.
