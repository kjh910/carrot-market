FROM --platform=linux/amd64 node:17.3.1

WORKDIR /app/

EXPOSE 4000
ADD ./app /app/

RUN curl -L -O https://github.com/planetscale/cli/releases/download/v0.93.0/pscale_0.93.0_linux_amd64.deb

RUN dpkg -i pscale_0.93.0_linux_amd64.deb

RUN chmod 777 /app/runserver.sh

CMD ["/app/runserver.sh"]
