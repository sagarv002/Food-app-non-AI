import React, { useState } from 'react';
import { 
  BsLightningFill, BsGraphUp, BsShieldLock, BsThreeDotsVertical,
  BsArrowUpRight, BsFillMoonFill, BsFillSunFill, 
  BsLampFill,
  BsLaptop
} from 'react-icons/bs';

import { Tree, Card, Image, Spin, Empty, Button, Tag, Row, Col, message, Typography, Divider, Grid } from "antd";


const Search = () => {

  const { Title, Text } = Typography;
  // Sample initial book data
  const [books, setBooks] = useState([
    { 
      id: 1, 
      title: 'Test1', 
      author: 'your-Test-name1', 
      year: 1925,
      genre: 'Classic',
      pages: 218,
      isRead: false,
      rating: 4
    },
    { 
      id: 2, 
      title: 'Test2', 
      author: 'your-Test-name2', 
      year: 1960,
      genre: 'Fiction',
      pages: 281,
      isRead: true,
      rating: 5
    },
    { 
      id: 3, 
      title: 'Test33', 
      author: 'your-Test-name3', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 4, 
      title: 'Test4', 
      author: 'your-Test-name4', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 5, 
      title: 'Test-5', 
      author: 'your-Test-name5', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 6, 
      title: 'Test6', 
      author: 'your-Test-name6', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 7, 
      title: 'Test7', 
      author: 'your-Test-name7', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 8, 
      title: 'Test8', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 9, 
      title: 'Test9', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 10, 
      title: 'Test10', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 11, 
      title: 'Test11', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    }
    ,
    { 
      id: 12, 
      title: 'Test12', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 13, 
      title: 'Test13', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 14, 
      title: 'Test14', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 15, 
      title: 'Test15', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 16, 
      title: 'Test16', 
      author: 'George Orwell', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 17, 
      title: 'Test17', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 18, 
      title: 'Test18', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 19, 
      title: 'Test19', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 20, 
      title: 'Test-20', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 21, 
      title: 'Test-21', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 22, 
      title: 'Test-22', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 23, 
      title: 'Test23', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 24, 
      title: 'Test-24', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 25, 
      title: 'Test-25', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 26, 
      title: 'Test-26', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 27, 
      title: 'Test-27', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 28, 
      title: 'Test-28', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 29, 
      title: 'Test-29', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 30, 
      title: 'Test-30', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    }, { 
      id: 31, 
      title: 'Test-31', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 32, 
      title: 'Test-32', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 33, 
      title: 'Test-33', 
      author: 'your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 34, 
      title: 'Test-34', 
      author: 'your-Test-name ', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    }
    ,
    { 
      id: 35, 
      title: 'Test-35', 
      author: ' your-Test-name', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    }
    ,
    { 
      id: 36, 
      title: 'Test-36', 
      author: 'your-Test-name ', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },
    { 
      id: 37, 
      title: 'Test-37', 
      author: 'your-Test-name ', 
      year: 1949,
      genre: 'Dystopian',
      pages: 328,
      isRead: false,
      rating: 4
    },

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
    <>

<div style={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      marginBottom: 16,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <Title level={4} style={{
        display: 'inline-block',
        paddingLeft: '100%',
        animation: 'marquee 15s linear infinite',
        margin: 0
      }}>
        <span role="img" aria-label="video"></span> Avilable Names 
      </Title>
    </div>
  
    {/* CSS for the animation */}
    <style>
      {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}
    </style>


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
        textAlign: 'center',
        color:"red"
      }}>
        <h1 style={{ margin: 0, color: 'red' }}>
          
         <BsLaptop />
          
            Name  Seach ! </h1>
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
         

          {/* Search and filters */}
          <div>
            <h2 style={{ 
              borderBottom: '2px solid #ddd', 
              paddingBottom: '10px'
            }}>
              
              <BsArrowUpRight />
          
              Search </h2>
            <div style={{ marginBottom: '50px' }}>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Find.."
                style={{color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"60px",width:"500px"}}
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
                
              </select>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main>
          
          <div>
            <h2 style={{ 
              borderBottom: '2px solid #ddd', 
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ 
                color: 'green', 
                
              }}>Result ({filteredBooks.length})</span>
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
                    
                    <h3 style={{ 
                      marginTop: 0, 
                      marginBottom: '10px',
                      color: 'pink',
                       backgroundColor:"black"
                    }}>
                      {book.title}
                    </h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Names:</strong> {book.author}
                    </p>
                  
                    
                    
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '10px',
                      marginTop: '15px',
                      backgroundColor:"black"
                    }}>
                     
                     
                     
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    </>);
};

export default Search;