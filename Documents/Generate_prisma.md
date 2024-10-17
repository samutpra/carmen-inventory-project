# Generate Prisma Schema

```bash
 npx prisma generate --schema prisma/schema/system/system.prisma
 npx prisma generate --schema prisma/schema/tenant/tenant.prisma

 npx prisma migrate dev --schema prisma/schema/system/system.prisma --name init
 npx prisma migrate dev --schema prisma/schema/tenant/tenant.prisma --name init
 ```
