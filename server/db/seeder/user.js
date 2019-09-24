const createBok= ({name, genre, authorId}) =>{
  const book = new Book({
    name: name,
    genre: genre,
    authorId: authorId,
  });
  book.save();
  }
  
  const seed = [{
    name: "Book1",
    genre: "Comic",
    authorId: "dfafdtt3"
  }];
  
  
  seed.forEach(bk => createBok(bk))
  