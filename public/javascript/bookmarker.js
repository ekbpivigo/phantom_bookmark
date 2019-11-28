let bookmarker = {
  construct: function() {
    this.selectElements();
    this.bindEvents();
    this.scanBookmarkList();
  },


  selectElements: function() {
    this.bookmarkInput = document.getElementById("input-bookmark");
    this.bookmarkList = document.getElementById("bookmarks");
    this.bookmarkListChildren = this.bookmarkList.children;
    this.newBookmark = document.getElementById("newBookmarkDetail");
    this.addButton = document.getElementById("add-bookmark-btn");
    this.errorMessage = document.getElementById("error");
    this.storedBookmarks = localStorage.setItem("bookmarks", "");
  },


  error: function() {
    this.errorMessage.style.opacity = 100;
  },


  validateUrl: function() {
    let parser = document.createElement('a');
    parser.href = this.bookmarkInput.value;
    return (parser.protocol.includes("http") && parser.href.includes("://") && parser.hostname.includes("."));
  },


  buildBookmark: function() {
    let bookmarkListItem, bookmarkValue, bookmarkEditButton, bookmarkEdit, bookmarkTrashButton, bookmarkTrash;

    // bookmark list item
    bookmarkListItem = document.createElement("li");
    bookmarkListItem.setAttribute("class", "bookmark");

    // bookmark value
    bookmarkValue = document.createElement("a");
    bookmarkValue.setAttribute("href", this.bookmarkInput.value);
    bookmarkValue.innerHTML = this.bookmarkInput.value;

    // bookmark trash button
    bookmarkTrashButton = document.createElement("button");
    bookmarkTrashButton.setAttribute("id", "trash");

    // trash icon
    bookmarkTrash = document.createElement("i");
    bookmarkTrash.setAttribute("class", "fa fa-trash");

    // insert trash icon into button
    bookmarkTrashButton.appendChild(bookmarkTrash);

    // bookmark edit button
    bookmarkEditButton = document.createElement("button");

    // create edit icon
    bookmarkEdit = document.createElement("i");
    bookmarkEdit.setAttribute("class", "fa fa-pencil");

    // insert edit icon into button
    bookmarkEditButton.appendChild(bookmarkEdit);

    // append elements to bookmarkList
    bookmarkListItem.appendChild(bookmarkEditButton);
    bookmarkListItem.appendChild(bookmarkValue);
    bookmarkListItem.appendChild(bookmarkTrashButton);

    // add bookmark to bookmarkList
    if (bookmarkValue.innerHTML.length > 1) {
      this.bookmarkList.appendChild(bookmarkListItem);
    }
  },


  // create single bookmark detail
  buildNewBookmarkDetail: function() {
    let newBookmarkItem, bookmarkValue;

    if (this.bookmarkInput.value) {
      // create list item
      newBookmarkItem = document.createElement("div");
      newBookmarkItem.setAttribute("id", "newBookmark");

      // create bookmark text
      newBookmarkValue = document.createElement("p");
      newBookmarkValue.innerText = this.bookmarkInput.value;

      // append text to bookmark div
      newBookmarkItem.appendChild(newBookmarkValue);

      // remove previous new bookmark item
      if (this.newBookmark.children.length > 0) {
        this.newBookmark.removeChild(this.newBookmark.children[0])
      }

      // display newest bookmark
      this.newBookmark.appendChild(newBookmarkItem);
    }
  },


  // add bookmark value to local storage
  addBookmarkToArray: function() {
    let bookmarkValueList;
    if (localStorage.getItem("bookmarks")) {
      bookmarkValueList = localStorage.getItem("bookmarks");
    } else {
      localStorage.setItem("bookmarks", "");
      bookmarkValueList = localStorage.getItem("bookmarks");
    }
    bookmarkValueList = bookmarkValueList.concat(`${this.bookmarkInput.value},`);
    localStorage.setItem("bookmarks", bookmarkValueList);
  },


  addBookmark: function() {
    let bookmarkValue = this.bookmarkInput.value;

    // return boolean for validity of url
    let bookmarkValid = this.validateUrl();

    // initialise error message not to show
    this.errorMessage.style.opacity = 0;

    if(bookmarkValue === "") {
      this.error();
    } else if (bookmarkValid != true) {
      alert("Please enter a valid URL.");
    } else {
      // add bookmark to local storage
      this.addBookmarkToArray();

      // output html for all of bookmarks
      this.scanBookmarkList();

      // switch active element to show bookmark detail view
      this.switchActive();
    }
  },


  generateBookmarksList: function() {
    let allBookmarksList = localStorage.getItem("bookmarks");
    for (i = 0; i < allBookmarksList.split(",").length; i++) {
      if (this.validateUrl(allBookmarksList.split(",")[i]) && allBookmarksList.split(",")[i].length > 1) {
        this.buildBookmark();
        this.buildNewBookmarkDetail();
        this.bookmarkInput.value = "";
      }
    }
  },


  // generates a new list of bookmark html items and updates index of each delete button
  scanBookmarkList: function() {
    let bookmarkListItem, deleteButton;

    this.generateBookmarksList();

    // loop over bookmark list
    for (i = 0; i < this.bookmarkListChildren.length; i++) {
      bookmarkListItem = this.bookmarkListChildren[i];
      // select delete button
      deleteButton = document.getElementById("trash");

      // add click event to delete button
      deleteButton.onclick = this.deleteBookmark.bind(this, i);
    }
  },


  deleteBookmark: function(i) {
    let newList;
    newList = localStorage.getItem("bookmarks").replace(this.bookmarkListChildren[i].innerText, '');
    localStorage.setItem("bookmarks", newList);
    bookmarker.bookmarkList.removeChild(bookmarker.bookmarkList.childNodes[i]);
    this.scanBookmarkList();
  },


  enterKey: function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      this.addBookmark();
    }
  },


  bindEvents: function() {
    // add click event to button
    this.addButton.onclick = this.addBookmark.bind(this);

    // add enter key to bookmark text box
    this.bookmarkInput.onkeypress = this.enterKey.bind(this);
  },


  switchActive: function() {
    let switches = document.getElementsByClassName("switch");
    for (i = 0; i < switches.length; i++) {
        if (switches[i].hidden == true) {
            switches[i].removeAttribute("hidden")
        } else if (switches[i].hidden == false) {
            switches[i].setAttribute("hidden", "")
        }
    }
  }
};
