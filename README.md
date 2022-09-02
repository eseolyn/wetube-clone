# wetube-clone

Wetube Clone built using NodeJS, Express, Mongo and ES6

When we think about project, first of all, thinking about the data.
what sort of data we use.

1. video(upload, watch, delete...)
2. user(account, log-in, profile, password...)
   => domains

/ -> Home
/join -> join
/login -> Login
/search ->Search
==> global routers

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video
