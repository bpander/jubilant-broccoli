# Censys coding exercise

## Environment setup

There are just a couple environment variables you'll need to define because I didn't want to commit any secrets.

Make a copy of `.env-dist` and call it `.env`.

```shell
cp .env-dist .env
```

Then populate `CENSYS_API_ID` and `CENSYS_API_SECRET` in `.env` with your own values.


## Steps to run

This is a pretty standard Remix app so you'll just need to run `npm i` and `npm run dev` to run the dev server. Navigate to http://localhost:5173 to view the app.


## Overview

It should be pretty straightforward to manually test this app once it's running. Like the production search page, this version executes a search on load with an empty query. Submitting the search form at the top executes a search with that term.

The searched-for term is added to the url (via query param) so refreshing the page (or navigating directly to that url) will perform a search with that term. And the browser's back and forward arrows will navigate to those respective search results. The "Previous" and "Next" buttons behave similarly.

I also added a loading state, a "no results" state, and some rudimentary error handling. And everything _should_ be responsive.


## Potential improvements

I tried to stick to the 4-hour time limit, and I'm pretty confident I handled all the critical functionality. There were some things on my list I didn't get to. I think these would be good to spend time on if this were to go to production:

1. Unit tests
2. Accessibility, specifically better `:focus-visible` states and making sure the site is usable via screen reader
3. Caching previous requests
4. Dark theme support
5. Making hard-coded text dynamic so multi-language support could be more easily added if it's ever needed


## Thanks!

I had fun working on this, and it gave me an excuse to mess around a bit more with Remix. I greatly appreciate your time in reviewing this, and I'm looking forward to hearing any feedback you have. Feel free to reach out if you have any questions. Thank you!
