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

/user/edit -> Edit User
/user/delete -> Delete User

/video/watch -> Watch Video
/video/edit -> Edit Video
/video/delete -> Delete Video
/video/comments -> Comment on a Video
/video/comments/delete ->Delete a Comment of a Video

Routers allowed us to group URL based on the subject that we art working on.
