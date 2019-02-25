# react-image-gallery
A simple react app for displaying images and albums

### Installing

Install dependencies: `npm install`
Start dev server: `npm start`

## Tests

Each component has unit tests written to test that they function as they should. They test whether they render the correct elements given certain props and state. All methods are tested in isolation to prove that they perform the correct actions.

### Running the tests

`npm run test`


## Notes

With further development I would refactor the two pages to use the same 'page' component as the two pages share similar code. The page component would takes props similar to:
```
title: Used for the main header h1
chilren: Used to render the ImageGrid
```
