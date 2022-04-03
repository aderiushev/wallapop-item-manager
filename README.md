# Wallapop Item Manager 🧑‍💻❤️🇪🇸

### No one really likes long-reads, so please welcome the [DEMO!](https://wallapop-item-manager-03042022.web.app/)

## Disclamer:

Hello there!

Well, first I want to say that I'm so much grateful for the opportunity to try to join the Wallapop team.
I believe I'll bring much value ~~or at least I'll do my best ;)~~

However, I'm not that much familiar with angular framework being mostly a react developer, but after those 2 days I become to feel confident enough in "ng-ecosystem" to make things and I really enjoyed the experience.

Also I have a large experience in web & familiar with many of patterns & tools so it was not really a problem but a challenge.

Satisfied with the result 🙈

Hope I'll get a chance of working at Wallapop and grow my "ng-skills" further.

## Estimates & deadlines:
After making a deeper look onto the requirements I've decided to make a rough decomposition and put some estimates.
So here they are on a very high level:

- ui/ux desktop & mobile (functionality) *16h*
- tests *5h*
- ci (other) *3h*

so it is approx. 3 work days, and I decided to follow ;)

In fact, it took even less and that might be the reason to some things not being 100% perfectly/fully implemented.

## What's on board
- angular 12
- typescript
- material-ui
- jasmine + karma

## Requirements
- node v14+
- angular 13.3.1
- firebase cli
- una copa de vino tinto (optional)

## The list of things which could be definitely be done better:
- mobile version (on my IPhone SE1 the table is too small)
  we could hide/make smaller the header or make the scrollable area bigger somehow
  also it is not really responsive but adaptive
- more test coverage
  However I've introduced the basic test-cases it is always something missing :)
- favorites badge with a counter
  from the ux perspective it would be useful to know how much items in favs list does the user have
- images flickering when adding/removing to favorites list
- better decomposition
  I assume that for a further development it would be better to make more isolated components
- real backend
  In order to adjust the loading/performance it would be nice to have a real api

Would be happy to discuss this and any other concerns/proposals ;)

## Set up (Development) guide

1. Clone the repo 
 ```
 git@github.com:aderiushev/wallapop-item-manager.git
 ```
2. Install the deps
```
npm i
```
3. Run
```
npm start
```
4. Open `http://localhost:4200`

## Build

Run `npm run build` to build the project. 

The build artifacts will be stored in the `dist/` directory.

## Deploy

Github actions will take care of the deployment, it is set up to publish to firebase hosting on merge or push to the `main` branch.

You can also manually deploy via:
```
  npm run publish
```

The build artifacts will be stored in the `dist/` directory.

## Tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

