
# Stateflix API (News App)

A api to create and manage news posts effectively. It has a role based authentication system. 

#### Tech Stack
- Nodejs and ExpressJs (Web Server)
- MongoDB (Database)
- Redis (Api Caching)
- Docker (Containerization)
- GitHub Actions (CI/CD)
- AWS Elastic Beanstalk (Deployment)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`REDIS_URL`

`REDIS_PASSWORD`

`JWT_SECRET`

`DK_AWS_ACCESS_KEY_ID`

`DK_AWS_SECRET_ACCESS_KEY`

`DK_AWS_REGION`

`DK_AWS_S3_BUCKET_NAME`

`DK_GOOGLE_CLIENT_ID`

`DK_GOOGLE_CLIENT_SECRET`

`STATEFLIX_API_KEY`

`STATEFLIX_CLIENT_URI`


## Run Locally

Clone the project

```bash
  git clone https://github.com/DivyanshuKaushik/Stateflix
```

Go to the project directory

```bash
  cd Stateflix_Backend
```

Build images and run containers

```bash
  docker-compose -f docker-compose.dev.yml up --build
```

Start the containers

```bash
  docker-compose -f docker-compose.dev.yml up
```
Stop the containers

```bash
  docker-compose -f docker-compose.dev.yml down
```


## API Docs

[API Documentation](https://documenter.getpostman.com/view/14660907/2s935hQSMN)


## Contributers

- [@DivyanshuKaushik](https://www.github.com/DivyanshuKaushik)


## License

[APACHE](https://choosealicense.com/licenses/apache/)


![Logo](https://www.stateflix.com/_next/image?url=%2Fsf-logo.png&w=1920&q=75)

