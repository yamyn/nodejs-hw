# nodejs-hw

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### Find all Contacts

```
    curl --location --request GET 'localhost:3000/api/contacts/' \
```

### Find Contact

```
    curl --location --request GET 'localhost:3000/api/contacts/:userId' \
    --header 'Content-Type: application/json' \
```

### Create Contact

```
    curl --location --request POST 'localhost:3000/api/contacts/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Mango",
        "email": "mango@gmail.com",
        "phone": "322-22-22"
    }'
```

### Update Contact

```
    curl --location --request PUT 'localhost:3000/api/contacts/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "name": "Allan Raymond",
       "id" : "m9TV8hdsx"
    }'
```

### Delete User

```
    curl --location --request DELETE 'localhost:3000/api/contacts/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
          "id" : "m9TV8hdsx"
    }'
```
