# App brief
Develop a JavaScript web app that maintains a list of bookmarks (links). The user is able to add/edit/delete any link in the list.  The application should only use front-end technologies (ie no backend database!).


## Technical design document
#### Requirements
The goal is to design a system which will allow a user to:
- Add a bookmark
- Edit a bookmark
- Store bookmarks on their browser for later retrieval
- Click through to a saved link
- Delete an individual link
- Access the app via a URL

##### Further requirements:
- App needs to use HTML, CSS and pure JavaScript
- System needs to use source control

#### Technologies used
- Basic layout (HTML/CSS)
- ES6 JavaScript
- Node
- Expressjs

#### Approach
- Basic HTML template importing javascript module
- JavaScript handles validation, adding and deleting of bookmarks
- Instead of using routing, JavaScript controls visibility of components in template.
- Deployed to Heroku using GitHub
- Serve using express

#### Outcome
Specs remaining unfulfilled:
- Editing single bookmark item
- Pagination of bookmarks list

#### Next steps:
- Bookmark deletion is unreliable; likely an issue with index passed to delete function; needs to be fixed
- Add editing function
- Add pagination
- Refactor JavaScript (bookmarker.js) into modules
- Testing


#### Links/Resources Used
- Google HTML/CSS Style Guide
- Mozilla Developer Network docs
- JavaScript Style Guide
- Google Advanced Compilation Guide


## Where does the app live?
App is available at: [http://nameless-forest-49018.herokuapp.com/](http://nameless-forest-49018.herokuapp.com/).
