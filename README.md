# verktøy

## A multi-purpose Discord bot

### [Add to your server](https://discord.com/api/oauth2/authorize?client_id=927279520959053824&permissions=1504311569495&scope=bot%20applications.commands)

### Features:

![image](https://user-images.githubusercontent.com/67111271/163602982-5c079c8b-250e-44e7-ab3f-12a457855369.png)

(Yes, I am too lazy to type this out.)

### Self-host bot

1. Get image from Docker Hub

```sh
$ docker pull joseywoermann/verktoy
```

2. Run

```sh
$ docker run -d --name verktoy -e TOKEN="<token>" -e ENVIRONMENT="<prod|dev>" -e OWNER_ID="<id>" -e DEV_SERVER_ID="<id>" joseywoermann/verktoy:latest
```
