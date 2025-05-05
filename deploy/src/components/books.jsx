import React, { useState } from 'react';

const BookLibrary = () => {
  // Sample initial book data
  const [books, setBooks] = useState([
    { 
      id: 1, 
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald', 
      year: 1925,
      genre: 'Classic',
      pages: 218,
      isRead: false,
      rating: 4
    },
    { 
      id: 2, 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee', 
      year: 1960,
      genre: 'Fiction',
      pages: 281,
      isRead: true,
      rating: 5
    },
    { 
      id: 3, 
      title: '1984', 
      author: 'George Orwell', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    }
  ]);

  // Form state
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    pages: '',
    isRead: false,
    rating: 3
  });

  // Filter/sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterReadStatus, setFilterReadStatus] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [editBookId, setEditBookId] = useState(null);

  // Available genres
  const genres = ['all', 'Classic', 'Fiction', 'Dystopian', 'Fantasy', 'Sci-Fi', 'Mystery', 'Biography'];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add a new book
  const addBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author) {
      setBooks(prev => [...prev, {
        id: Date.now(),
        title: newBook.title,
        author: newBook.author,
        year: newBook.year || 'Unknown',
        genre: newBook.genre || 'Uncategorized',
        pages: newBook.pages || 'Unknown',
        isRead: newBook.isRead,
        rating: newBook.rating || 3
      }]);
      resetForm();
    }
  };

  // Update an existing book
  const updateBook = (e) => {
    e.preventDefault();
    setBooks(books.map(book => 
      book.id === editBookId ? { ...newBook, id: editBookId } : book
    ));
    setEditBookId(null);
    resetForm();
  };

  // Reset the form
  const resetForm = () => {
    setNewBook({ 
      title: '', 
      author: '', 
      year: '', 
      genre: '', 
      pages: '', 
      isRead: false,
      rating: 3
    });
  };

  // Remove a book
  const removeBook = (id) => {
    if (window.confirm('Are you sure you want to remove this book?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
  };

  // Start editing a book
  const startEdit = (book) => {
    setEditBookId(book.id);
    setNewBook({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre,
      pages: book.pages,
      isRead: book.isRead,
      rating: book.rating
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditBookId(null);
    resetForm();
  };

  // Toggle read status
  const toggleReadStatus = (id) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, isRead: !book.isRead } : book
    ));
  };

  // Filter and sort books
  const filteredBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(book => 
      filterGenre === 'all' || book.genre === filterGenre
    )
    .filter(book => 
      filterReadStatus === 'all' || 
      (filterReadStatus === 'read' && book.isRead) || 
      (filterReadStatus === 'unread' && !book.isRead)
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'year') return (a.year || 0) - (b.year || 0);
      if (sortBy === 'pages') return (a.pages || 0) - (b.pages || 0);
      return 0;
    });

  // Library statistics
  const totalBooks = books.length;
  const readBooks = books.filter(book => book.isRead).length;
  const totalPages = books.reduce((sum, book) => sum + (parseInt(book.pages) || 0), 0);
  const averageRating = books.length > 0 
    ? (books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length).toFixed(1)
    : 0;

  // Star rating display
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>📚 Book Library</h1>
      </header>

      {/* Main content area */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '300px 1fr', 
        gap: '20px' 
      }}>
        {/* Sidebar */}
        <aside style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          {/* Stats */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              borderBottom: '2px solid #ddd', 
              paddingBottom: '10px',
              marginTop: 0
            }}>Library Stats</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '10px',
              marginBottom: '15px'
            }}>
              <div style={{ 
                backgroundColor: '#e3f2fd', 
                padding: '10px', 
                borderRadius: '4px'
              }}>
                <div style={{ fontWeight: 'bold' }}>Total Books</div>
                <div style={{ fontSize: '24px' }}>{totalBooks}</div>
              </div>
              <div style={{ 
                backgroundColor: '#e8f5e9', 
                padding: '10px', 
                borderRadius: '4px'
              }}>
                <div style={{ fontWeight: 'bold' }}>Books Read</div>
                <div style={{ fontSize: '24px' }}>{readBooks}</div>
              </div>
            </div>
            <div style={{ 
              backgroundColor: '#fff8e1', 
              padding: '10px', 
              borderRadius: '4px',
              marginBottom: '15px'
            }}>
              <div style={{ fontWeight: 'bold' }}>Total Pages</div>
              <div style={{ fontSize: '24px' }}>{totalPages}</div>
            </div>
            <div style={{ 
              backgroundColor: '#f3e5f5', 
              padding: '10px', 
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold' }}>Avg Rating</div>
              <div style={{ fontSize: '24px' }}>{averageRating}/5</div>
            </div>
          </div>

          {/* Search and filters */}
          <div>
            <h2 style={{ 
              borderBottom: '2px solid #ddd', 
              paddingBottom: '10px'
            }}>Search & Filter</h2>
            <div style={{ marginBottom: '15px' }}>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search books..."
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Genre:</label>
              <select 
                value={filterGenre} 
                onChange={(e) => setFilterGenre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Read Status:</label>
              <select 
                value={filterReadStatus} 
                onChange={(e) => setFilterReadStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="all">All Books</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="year">Year</option>
                <option value="pages">Pages</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main>
          {/* Add/Edit Book Form */}
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2 style={{ 
              borderBottom: '2px solid #ddd', 
              paddingBottom: '10px',
              marginTop: 0
            }}>
              {editBookId ? '✏️ Edit Book' : '➕ Add New Book'}
            </h2>
            <form onSubmit={editBookId ? updateBook : addBook}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Title *</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={newBook.title} 
                    onChange={handleInputChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Author *</label>
                  <input 
                    type="text" 
                    name="author" 
                    value={newBook.author} 
                    onChange={handleInputChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr', 
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Year</label>
                  <input 
                    type="number" 
                    name="year" 
                    value={newBook.year} 
                    onChange={handleInputChange} 
                    placeholder="Publication year"
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Genre</label>
                  <select 
                    name="genre" 
                    value={newBook.genre} 
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  >
                    <option value="">Select genre</option>
                    {genres.filter(g => g !== 'all').map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Pages</label>
                  <input 
                    type="number" 
                    name="pages" 
                    value={newBook.pages} 
                    onChange={handleInputChange} 
                    placeholder="Page count"
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Rating</label>
                  <select 
                    name="rating" 
                    value={newBook.rating} 
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'star' : 'stars'}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="checkbox" 
                      name="isRead" 
                      checked={newBook.isRead} 
                      onChange={handleInputChange}
                      style={{ marginRight: '8px' }}
                    />
                    I've read this book
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit"
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {editBookId ? 'Update Book' : 'Add Book'}
                </button>
                {editBookId && (
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Book List */}
          <div>
            <h2 style={{ 
              borderBottom: '2px solid #ddd', 
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>📖 Book List ({filteredBooks.length})</span>
            </h2>
            {filteredBooks.length === 0 ? (
              <div style={{ 
                backgroundColor: '#f9f9f9', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p>No books found matching your criteria.</p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '20px' 
              }}>
                {filteredBooks.map(book => (
                  <div 
                    key={book.id}
                    style={{
                      backgroundColor: book.isRead ? '#e8f5e9' : '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      position: 'relative'
                    }}
                  >
                    {book.isRead && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        Read
                      </div>
                    )}
                    <h3 style={{ 
                      marginTop: 0, 
                      marginBottom: '10px',
                      color: '#333'
                    }}>
                      {book.title}
                    </h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Published:</strong> {book.year}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Genre:</strong> {book.genre}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Pages:</strong> {book.pages}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Rating:</strong> 
                      <span style={{ color: '#ff9800', marginLeft: '5px' }}>
                        {renderRating(book.rating)}
                      </span>
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      gap: '10px',
                      marginTop: '15px'
                    }}>
                      <button 
                        onClick={() => toggleReadStatus(book.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: book.isRead ? '#ff9800' : '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {book.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button 
                        onClick={() => startEdit(book)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#2196f3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => removeBook(book.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookLibrary;