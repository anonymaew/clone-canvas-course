# Clone Canvas-Course App

Create, study, manage, and monitor your courses in one single app.  
This app is *"heavily-inspired"* by [Canvas Learning Managing System](https://www.instructure.com/en-au/canvas). It can be used to create and manage courses in the system. Students can also use the same app to study and practice in specific courses.

## Feature and flow

There are 3 types of users in this app:

1. **Students**

- enrolling in a new course by sending a payment slip (not the greatest method of doing a payment but I am working on a better method)
- accessing and studying on enrolled courses
- [not yet implemented] notified by announcements from the course

2. **Teachers**

- creating and managing their courses
- [not yet implemented] creating announcements for the course

3. **Administrators**

- managing all users and courses
- dashboard for approving payments (again not the best idea)

## Stack

- [Next.js](https://nextjs.org) as react frontend-backend framework.
- [NextAuth](https://next-auth.js.org) as the authentication provider.
- [Prisma](https://www.prisma.io) as the ORM.
- [tRPC](https://trpc.io/) for managing APIs.
- [Postgres](https://www.postgresql.org/) for the relational database.
- [Digital Ocean](https://www.digitalocean.com/) for managing database and storage.
