import { tenantTable } from "./schema";
import type { InsertTenant } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { base_db } from "./db";

dotenv.config();

if (!("DATABASE_URL" in process.env))
	throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
    
	const fake_tenants: {name : string, description : string}[] = [];
 
	for (let i = 0; i < 2; i++) {
		fake_tenants.push({
			name: `${faker.commerce.department()} - [${i}] `,
			description : ""
		});
	}
 
	console.log("Seed start");
	await base_db.insert(tenantTable).values(fake_tenants);
	console.log("Seed done");
};

main().catch(console.error).finally(() => {});;