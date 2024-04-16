alter table "public"."grades" add column "order" integer not null;

CREATE UNIQUE INDEX grades_order_key ON public.grades USING btree ("order");

alter table "public"."grades" add constraint "grades_order_key" UNIQUE using index "grades_order_key";


