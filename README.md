# gator

gator is a CLI RSS blog aggregator built with TypeScript and PostgreSQL.

It allows users to register, add RSS feeds, follow feeds, aggregate posts, and browse stored content from the command line.

---

## Requirements

- Node.js
- PostgreSQL running locally
- A PostgreSQL database created

---

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root:

```env
DATABASE_URL=postgres://username:password@localhost:5432/blog_aggregator
```

Run database migrations:

```bash
npm run generate
npm run migrate
```

---

## Running gator

All commands are run with:

```bash
npm run start <command>
```

---

## Common Commands

Register a user:

```bash
npm run start register alice
```

Login:

```bash
npm run start login alice
```

Add a feed:

```bash
npm run start addfeed "Hacker News" "https://hnrss.org/frontpage"
```

List feeds:

```bash
npm run start feeds
```

Follow a feed:

```bash
npm run start follow https://news.ycombinator.com/rss
```

Aggregate posts:

```bash
npm run start agg 2
```

Browse posts:

```bash
npm run start browse
npm run start browse 10
```