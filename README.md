# Logic of blog with node and Fastify

## Generate a "secret_key file"

First generate a key with:
> ```bash
> npx @fastify/secure-session > secret-key
> ```
 If running in Windows Powershell, you should use this command > instead:
> ```bash
> npx @fastify/secure-session | Out-File -Encoding default -NoNewline > -FilePath secret-key
> ```
If you have not previously used this module with npx, you will be prompted to install it, which with the output redirect will cause  the command to wait forever for input.

To avoid this use the --yes flag with npx:
> ```bash
> npx --yes @fastify/secure-session > secret-key
> ```
 If you don't want to use npx, you can still generate the secret-key > installing the @fastify/secure-session library with your choice > package manager, and then:
> ```bash
> ./node_modules/@fastify/secure-session/genkey.js > secret_key
> ````
>

## Authentification

> User register in DB:

### username
> ```bash
>admin
>````

### password
>```bash
>admin
>```
