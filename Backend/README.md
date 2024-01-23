
## Prisma
By default, prisma is configured to be used with `mysql to google`.
Prisma allows for alternative databases to be used.

### Required in `schema.prisma`

```prisma
datasource db {
  provider = process.env.DBPROVIDER
  url      = "mysql://username:password@host:port/table"
}
```

### Notes
```ts
prisma generate

// Use seed file to populate database
prisma db seed 
```

## Start up backend server
`npm run dev`

## Start up frontend server
`npm run serve `