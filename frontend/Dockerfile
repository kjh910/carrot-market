FROM node:17.3.1

WORKDIR /app

EXPOSE 3000
ADD ./app /app/

RUN chmod 777 /app/runserver.sh

CMD ["/app/runserver.sh"]
