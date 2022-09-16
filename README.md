# Leave Notes

Web App for centralized place for text notes for multiple users.

# Motivation

Want an isolated minimal environment to share texts with others online.

# Stages/Goals

1. [x] Make notes in closed system
1. [ ] Restrict operations for logged in user only (Authentication and authorization)
1. [ ] Logged in user can invite other users (Google, GitHub, etc...)
1. [ ] User Roles
1. [ ] Group entity for Note entities and Users
1. [ ] Comment function for created Notes

# Model

Web <-> Server ~~<-> Middleware~~ <-> Controller <-> Service <-> DAO <-> Database

# Dependency Programs

- npm
- nodejs
- docker
- docker-compose
- postgresql (dockerized)

# Dependency Utilities

- vite
- react
- react-router-dom
- tailwindcss
- pg (postgresql api)
- knex (database api)
- express

# LICENSE

GPLv3
