import 'dotenv/config';

import * as system_schema from './schema/system.schema';
import * as tenant_schema from './schema/tenant.schema';

import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';
import connectionString_pg from './connectionString.pg';
import { faker } from '@faker-js/faker';

const connStr_system = connectionString_pg('carmen_system');
// const connStr_tenant = connectionString_pg('base');

const pool_system = new Pool({
  connectionString: connStr_system,
  //   ssl: true,
});

const pool_tenant = (tenantid: string) =>
  new Pool({
    connectionString: connectionString_pg(tenantid),
    //   ssl: true,
  });

const db_system = drizzle(pool_system, {
  schema: system_schema,
}) as NodePgDatabase<typeof system_schema>;

const db_tenant = (tenantid: string) => {
  return drizzle(pool_tenant(tenantid), {
    schema: tenant_schema,
  }) as NodePgDatabase<typeof tenant_schema>;
};

async function main() {
  const email = faker.internet.email();
  const seed_user = await db_system
    .insert(system_schema.users)
    .values({
      username: email,
      email: email,
      isActive: true,
    })
    .returning();

  console.log('Create User', seed_user);

  const seed_user_profile = await db_system
    .insert(system_schema.userProfileInfo)
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

  const seed_department = await db_tenant('base')
    .insert(tenant_schema.departments)
    .values({
      name: faker.company.name(),
      code: faker.company.catchPhrase(),
      isActive: true,
      created_By: seed_user[0].id,
    })
    .returning();

  console.log('department', seed_department);
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
