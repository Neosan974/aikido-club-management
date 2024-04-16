alter table "public"."adherents" drop column "birth_date";

alter table "public"."adherents" drop column "created_at";

alter table "public"."adherents" drop column "first_name";

alter table "public"."adherents" drop column "last_name";

alter table "public"."adherents" drop column "registered_at";

alter table "public"."adherents" drop column "started_at";

alter table "public"."adherents" add column "address" text;

alter table "public"."adherents" add column "birthDate" date not null;

alter table "public"."adherents" add column "createdAt" timestamp with time zone not null default now();

alter table "public"."adherents" add column "email" text;

alter table "public"."adherents" add column "firstName" text not null;

alter table "public"."adherents" add column "lastName" text not null;

alter table "public"."adherents" add column "registeredAt" date;

alter table "public"."adherents" add column "startedAt" date;


