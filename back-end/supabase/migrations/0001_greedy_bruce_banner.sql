CREATE TABLE IF NOT EXISTS "share_pool.currency" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(3) NOT NULL,
	"name" varchar NOT NULL,
	"symbol" varchar NOT NULL,
	"exchange_rate" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "share_pool.currency_code_unique" UNIQUE("code")
);