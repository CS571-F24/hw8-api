build
```bash
docker build . -t ctnelson1997/cs571-f24-hw8-api
docker push ctnelson1997/cs571-f24-hw8-api
```

run
```bash
docker pull ctnelson1997/cs571-f24-hw8-api
docker run --name=cs571_f24_hw8_api -d --restart=always -p 48108:48108 -v /cs571/f24/hw8:/cs571 ctnelson1997/cs571-f24-hw8-api
```