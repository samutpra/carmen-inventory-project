import 'dotenv/config';

import * as schema from './schema/schema';

import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //   ssl: true,
});

const db = drizzle(pool, {
  schema,
  logger: true,
}) as NodePgDatabase<typeof schema>;

async function main() {
  const email = faker.internet.email();
  const seed_user = await db
    .insert(schema.users)
    .values({
      username: email,
      email: email,
      isActive: true,
    })
    .returning();

  console.log('Create User', seed_user);

  const seed_user_profile = await db
    .insert(schema.userProfileInfo)
    .values({
      id: seed_user[0].id,
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      nickName: faker.person.firstName(),
      metaInfo: {
        gender: faker.person.gender(),
        birthday: faker.date.birthdate(),
        sex: faker.person.gender(),
        bio: faker.person.bio(),
      },
      created_By: seed_user[0].id,
    })
    .returning();

  console.log('user Profile', seed_user_profile);
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
