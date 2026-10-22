-- Gives panel access to the two owners. Run after both users exist in Authentication → Users.
-- Safe to re-run.
insert into editors (user_id, email, role)
select id, email, 'owner'
from auth.users
where lower(email) in ('veronicasabbag@hotmail.com', 'davidsr1919@gmail.com')
on conflict (user_id) do nothing;
