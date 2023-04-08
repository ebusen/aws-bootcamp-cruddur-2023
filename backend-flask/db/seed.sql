-- this file was manually created
INSERT INTO public.users (display_name, handle, email, cognito_user_id)
VALUES
  ('Ebubekir SEN', 'Ebu' ,'senebubekir@gmail.com','MOCK'),
  ('Andrew Bayko', 'bayko' ,'senebubekir+account1@gmail.com','MOCK')
  ('Londo Mollari','lmollari','lmollari@centuri.com', 'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'Ebu' LIMIT 1),
    'This was imported as seed data!!!',
    current_timestamp + interval '10 day'
  )