INSERT INTO public.grades ("name","order") VALUES ('Kyu 6', 1), ('Kyu 5', 2), ('Kyu 4', 3), ('Kyu 3', 4), ('Kyu 2', 5), ('Kyu 1', 6);
SELECT setval('public.grades_id_seq'::regclass, (SELECT MAX("id") FROM "public"."grades"));
INSERT INTO public.grades ("name","order") VALUES ('Dan 1', 7), ('Dan 2', 8), ('Dan 3', 9), ('Dan 4', 10), ('Dan 5', 11), ('Dan 6', 12), ('Dan 7', 13);
SELECT setval('public.grades_id_seq'::regclass, (SELECT MAX("id") FROM "public"."grades"));
INSERT INTO public.adherents (id,first_name,last_name,birth_date,gender,started_at,registered_at) VALUES ('45aee890-3fb8-5b2a-af46-a43805a3d9ce', 'Alvera', 'Franecki', '2020-07-07', 'other', '2020-12-16', '2020-12-12'), ('7719e011-cf0f-564a-9894-a7bf36dfdd38', 'Savanah', 'McCullough', '2020-04-24', 'other', '2020-02-14', '2020-02-26'), ('6c8f3dfc-50b2-554b-9b72-57b4707911cf', 'Lonnie', 'Rempel', '2020-04-16', 'female', '2020-01-25', '2020-08-28'), ('02dd983b-2342-5927-8f7a-e6e78b2f68af', 'Desmond', 'Feest', '2020-03-27', 'male', '2020-01-21', '2020-04-12'), ('55c96678-3411-51a4-8a32-2f12696eb711', 'Ulices', 'Kuvalis', '2020-09-13', 'other', '2020-01-05', '2020-10-22'), ('f1772869-a916-56be-a113-da2de26cae2c', 'Milo', 'Lebsack', '2020-11-03', 'female', '2020-09-01', '2020-12-16'), ('3e3d1c09-9710-5046-abe5-25c3bd4320a5', 'Johann', 'Blanda', '2020-02-02', 'other', '2020-12-28', '2020-02-26'), ('d9c22bc4-c154-5c02-8076-fe565c4ed82f', 'Haylie', 'Collins', '2020-05-25', 'male', '2020-08-12', '2020-05-17'), ('7cfb1ef1-5e07-54d7-9691-a90db5b69c86', 'Sister', 'Witting', '2020-04-28', 'male', '2020-05-25', '2020-10-02'), ('89bf2319-377d-51fb-812f-02091d738034', 'Bernardo', 'Boehm', '2020-06-10', 'male', '2020-09-13', '2020-10-02');
