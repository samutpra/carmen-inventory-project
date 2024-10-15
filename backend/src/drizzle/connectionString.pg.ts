import 'dotenv/config';

export const connectionString_pg = (schema_space: string) => {
  const cs = process.env.DATABASE_URL;
  return `${cs}?currentSchema=${schema_space}`;
};

export default connectionString_pg;
