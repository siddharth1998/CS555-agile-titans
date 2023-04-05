docker stop runner
docker rm runner
docker rmi runner
docker build -t runner .
docker run -p 3333:3333 --env PORT=3333 --env MONGO_URL="mongodb+srv://z:RG99XAwjOJsDJijG@agile.ctke1it.mongodb.net/agile?retryWrites=true&w=majority" --name runner runner
