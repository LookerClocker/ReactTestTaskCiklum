    During creating this application i had one problem with access to iTunes API. As i understood this domain doesn`t support CORS
(Cross-Origin Resource Sharing). I have fixed this using as response data type as jsonp. It`s common knowledge way to solve this
issue.
    Also i used Promise.all() method. The main reason why i did this was because of two different queries firs to Spotify, and
second to iTunes. So i needed to 'wait' till both of them will execute and after that i gather all information which i need.

Issues: Had some issue on production mode the data fetched only from spotify. But it works on development mode

I wrote this application using ES6 syntax.

For run in development mode: pull from https://github.com/LookerClocker/ReactTestTaskCiklum/blob/master/src/SearchAlbums.js
and type in command line npm install and npm start

For run in production mode pull from https://github.com/LookerClocker/ReactTestTaskCiklum/blob/master/src/SearchAlbums.js
and type in command line npm install and npm run build. It will builds to `build` folder.