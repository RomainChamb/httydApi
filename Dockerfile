FROM hayd/deno:alpine-1.2.1

WORKDIR /app

COPY . .

USER deno

ENV SHELL /bin/sh

CMD ["run", "--allow-all", "Drakefile.ts", "start"]

EXPOSE 8001