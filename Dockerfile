FROM hayd/deno:alpine-1.2.0

WORKDIR /app

USER deno

CMD ["run", "--allow-all", "Drakefile.ts", "start"]

EXPOSE 8001