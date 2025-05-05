import React, { useEffect, useState } from "react";
import { Tree, Card, Image, Spin, Empty, Button, Tag, Row, Col, message, Typography, Divider, Grid } from "antd";
import { StarFilled, StarOutlined, ReloadOutlined, ShoppingOutlined, DownOutlined, ClockCircleOutlined, UserOutlined, FireOutlined } from "@ant-design/icons";


import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const RecipeTree = () => {






    
    const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButtons(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const screens = useBreakpoint();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites.map(String) : []);
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://dummyjson.com/recipes");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data?.recipes) {
          throw new Error("Invalid data format: recipes not found");
        }

        formatRecipeData(data.recipes);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Format recipe data
  const formatRecipeData = (recipes) => {
    const formattedData = recipes.map(recipe => {
      const isFavorite = favorites.includes(recipe.id.toString());
      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
      
      return {
        title: (
          <Card
            hoverable
            style={{ width: '100%', height: '100%' }}
            cover={
              <Image 
                src={recipe.image} 
                alt={recipe.name}
                height={200}
                style={{ objectFit: 'cover' }}
                fallback="https://via.placeholder.com/320x200?text=No+Image"
                preview={false}
              />
            }
            actions={[
              <Button 
                type="text" 
                icon={isFavorite ? <StarFilled style={{ color: '#ffd700' }} /> : <StarOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id.toString());
                }}
              >
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>,
              <div>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                {totalTime} min
              </div>,
              <div>
                <UserOutlined style={{ marginRight: 4 }} />
                {recipe.servings}
              </div>
            ]}
          >
            <Card.Meta
              title={<Title level={4} style={{ marginBottom: 8 }}>{recipe.name}</Title>}
              description={
                <div>
                  <Tag color={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Tag>
                  <Tag color="geekblue">{recipe.cuisine}</Tag>
                  <Divider style={{ margin: '12px 0' }} />
                  <Row gutter={[8, 8]} align="middle">
                    <Col>
                      <StarFilled style={{ color: '#ffd700', marginRight: 4 }} />
                      <Text strong>{recipe.rating}</Text>
                      <Text type="secondary"> ({recipe.reviewCount} reviews)</Text>
                    </Col>
                    <Col>
                      <FireOutlined style={{ marginRight: 4 }} />
                      <Text>{recipe.caloriesPerServing} cal/serving</Text>
                    </Col>
                  </Row>
                </div>
              }
            />
          </Card>
        ),
        key: recipe.id.toString(),
        isFavorite: isFavorite,
        recipeData: recipe // Store the full recipe data for tree view
      };
    });

    setTreeData(formattedData);
  };

  // Toggle favorite status
  const toggleFavorite = (recipeId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      
      localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
      
      setTreeData(prevTree => 
        prevTree.map(item => ({
          ...item,
          isFavorite: newFavorites.includes(item.key),
          title: React.cloneElement(item.title, {
            props: {
              ...item.title.props,
              actions: [
                <Button 
                  type="text" 
                  icon={newFavorites.includes(item.key) ? 
                    <StarFilled style={{ color: '#ffd700' }} /> : 
                    <StarOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.key);
                  }}
                >
                  {newFavorites.includes(item.key) ? 'Favorited' : 'Favorite'}
                </Button>,
                ...item.title.props.actions.slice(1)
              ]
            }
          })
        }))
      );

      message.success(
        newFavorites.includes(recipeId) ? 'Added to favorites' : 'Removed from favorites'
      );
      return newFavorites;
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'green',
      medium: 'orange',
      hard: 'red'
    };
    return colors[difficulty?.toLowerCase()] || 'blue';
  };

  const filteredTreeData = showFavoritesOnly
    ? treeData.filter(item => favorites.includes(item.key))
    : treeData;

  if (loading && treeData.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" tip="Loading recipes..." />
      </div>
    );
  }

  if (error) {
    return (
      <Empty
        description={
          <>
            <Title level={4}>Failed to load recipes</Title>
            <Text type="danger" style={{ marginBottom: 16 }}>{error}</Text>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => window.location.reload()}
              type="primary"
              size="large"
            >
              Reload Page
            </Button>
          </>
        }
        imageStyle={{ height: 160 }}
      />
    );
  }

  return (

    <>

{showScrollButtons && (
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined />}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            zIndex: 1000,
            width: 50,
            height: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        />
      )}

      {/* Scroll to Bottom Button (fixed position) */}
      {showScrollButtons && (
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowDownOutlined />}
          onClick={scrollToBottom}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            width: 50,
            height: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        />
      )}
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
    <div style={{ position: 'relative', marginBottom: 24 }}>
  {/* Progress Bar */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: 4,
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden'
  }}>
    <div style={{
      height: '100%',
      width: '0%',
      backgroundColor: 'black',
      animation: 'progress 15s ease-out forwards',
      animationDelay: '1.5s' // Starts after title animation
    }}/>
  </div>

  {/* Title and Buttons Container */}
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 8 // Space for progress bar
  }}>
    {/* Animated Title */}
    <div style={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      flex: 1
    }}>
      <Title level={2} style={{
        display: 'inline-block',
        margin: 0,
        animation: 'slideIn 1.5s ease-out forwards',
        transform: 'translateX(-100%)',
        opacity: 0
      }}>
        <span role="img" aria-label="chef">👨‍🍳</span> Recipe Explorer
      </Title>
    </div>

    {/* Buttons */}
    <div>
      <Button 
        type={showFavoritesOnly ? 'primary' : 'default'}
        icon={<StarFilled style={{ color: showFavoritesOnly ? '#ffd700' : undefined }} />}
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        style={{ marginRight: 16 }}
        size="large"
      >
        {showFavoritesOnly ? 'Show All Recipes' : `Show Favorites (${favorites.length})`}
      </Button>
      <Button 
        icon={<ReloadOutlined />} 
        onClick={() => window.location.reload()}
        size="large"
      >
        Refresh
      </Button>
    </div>
  </div>

  {/* Animation CSS */}
  <style>
    {`
      @keyframes slideIn {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes progress {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }
    `}
  </style>
</div>

      {filteredTreeData.length > 0 ? (
        <>
          {/* Grid View for Recipes */}
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            {filteredTreeData.map(item => (
              <Col 
                key={item.key} 
                xs={24} 
                sm={12} 
                md={12} 
                lg={8} 
                xl={6}
              >
                {item.title}
              </Col>
            ))}
          </Row>

          {/* Tree View for Details */}
          <Title level={4} style={{ marginBottom: 16 }}>Recipe Details</Title>
          <Tree
            treeData={filteredTreeData.map(item => ({
              title: item.recipeData.name,
              key: item.key,
              children: [
                {
                  title: (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                      <ShoppingOutlined style={{ marginRight: 8, color: '#1890ff', fontSize: 18 }} />
                      <Text strong style={{ fontSize: 16 }}>Ingredients ({item.recipeData.ingredients?.length || 0})</Text>
                    </div>
                  ),
                  key: `${item.key}-ingredients`,
                  children: item.recipeData.ingredients?.map((ingredient, index) => ({
                    title: (
                      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
                        <span style={{ marginRight: 8 }}>•</span>
                        <Text>{typeof ingredient === 'string' ? ingredient : ingredient.name}</Text>
                        {typeof ingredient === 'object' && ingredient.amount && (
                          <Tag style={{ marginLeft: 8 }}>{ingredient.amount}</Tag>
                        )}
                      </div>
                    ),
                    key: `${item.key}-ingredient-${index}`,
                  })) || [],
                },
                {
                  title: (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                      <Text strong style={{ fontSize: 16 }}>Instructions ({item.recipeData.instructions?.length || 0} steps)</Text>
                    </div>
                  ),
                  key: `${item.key}-instructions`,
                  children: (item.recipeData.instructions || []).map((instruction, index) => ({
                    title: (
                      <div style={{ padding: '8px 0' }}>
                        <Text strong>Step {index + 1}:</Text>
                        <Text style={{ display: 'block', marginTop: 4 }}>{instruction}</Text>
                      </div>
                    ),
                    key: `${item.key}-instruction-${index}`,
                  })),
                },
              ],
            }))}
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            showLine
            blockNode
            switcherIcon={<DownOutlined />}
            style={{ background: '#fff', padding: 16, borderRadius: 8 }}
          />
        </>
      ) : (
        <Empty
          description={
            <Title level={4}>
              {showFavoritesOnly 
                ? "You haven't favorited any recipes yet" 
                : "No recipes found"}
            </Title>
          }
          imageStyle={{ height: 160 }}
        />
      )}
    </div>
    <div style={{ margin: '40px 0 24px' }}>
  {/* Marquee Heading */}
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
      <span role="img" aria-label="video">🎬</span> Cooking Tutorial 
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
  
  {/* Video Container (unchanged) */}
  <div style={{
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.3s ease',
    marginLeft: 'auto',
    width: '80%',
    ':hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  }}>
    <iframe
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
      }}
      src="https://www.youtube.com/embed/mhDJNfV7hjk"
      title="Quick & Easy Recipes With Gordon Ramsay"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen
    />
  </div>
</div>
    
    </>);
};
// GG
export default RecipeTree;



// import React, { useEffect, useState, useRef } from "react";
// import { Tree, Card, Image, Spin, Empty, Button, Tag, Row, Col, message, Typography, Divider, Grid } from "antd";
// import { StarFilled, StarOutlined, ReloadOutlined, ShoppingOutlined, DownOutlined, ClockCircleOutlined, UserOutlined, FireOutlined } from "@ant-design/icons";
// import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

// const { Title, Text } = Typography;
// const { useBreakpoint } = Grid;

// const RecipeTree = () => {
//   const [showScrollButtons, setShowScrollButtons] = useState(false);
//   const [treeData, setTreeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedKeys, setExpandedKeys] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);
//   const intervalRef = useRef(null);
//   const screens = useBreakpoint();

//   // Auto-slide effect
//   useEffect(() => {
//     if (treeData.length > 0) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide(prev => (prev + 1) % Math.min(treeData.length, 4)); // Show max 4 cards at a time
//       }, 3000); // Change slide every 3 seconds

//       return () => clearInterval(intervalRef.current);
//     }
//   }, [treeData.length]);

//   // Handle scroll events for scroll buttons
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollButtons(window.scrollY > 100);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const scrollToBottom = () => {
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   };

//   // Fetch recipes
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch("https://dummyjson.com/recipes");
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch recipes: ${response.status}`);
//         }

//         const data = await response.json();
        
//         if (!data?.recipes) {
//           throw new Error("Invalid data format: recipes not found");
//         }

//         formatRecipeData(data.recipes);
//       } catch (err) {
//         console.error("Error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   // Format recipe data
//   const formatRecipeData = (recipes) => {
//     const formattedData = recipes.map(recipe => {
//       const isFavorite = favorites.includes(recipe.id.toString());
//       const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
      
//       return {
//         title: (
//           <Card
//             hoverable
//             style={{ width: '100%', height: '100%' }}
//             cover={
//               <Image 
//                 src={recipe.image} 
//                 alt={recipe.name}
//                 height={200}
//                 style={{ objectFit: 'cover' }}
//                 fallback="https://via.placeholder.com/320x200?text=No+Image"
//                 preview={false}
//               />
//             }
//             actions={[
//               <Button 
//                 type="text" 
//                 icon={isFavorite ? <StarFilled style={{ color: '#ffd700' }} /> : <StarOutlined />}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFavorite(recipe.id.toString());
//                 }}
//               >
//                 {isFavorite ? 'Favorited' : 'Favorite'}
//               </Button>,
//               <div>
//                 <ClockCircleOutlined style={{ marginRight: 4 }} />
//                 {totalTime} min
//               </div>,
//               <div>
//                 <UserOutlined style={{ marginRight: 4 }} />
//                 {recipe.servings}
//               </div>
//             ]}
//           >
//             <Card.Meta
//               title={<Title level={4} style={{ marginBottom: 8 }}>{recipe.name}</Title>}
//               description={
//                 <div>
//                   <Tag color={getDifficultyColor(recipe.difficulty)}>
//                     {recipe.difficulty}
//                   </Tag>
//                   <Tag color="geekblue">{recipe.cuisine}</Tag>
//                   <Divider style={{ margin: '12px 0' }} />
//                   <Row gutter={[8, 8]} align="middle">
//                     <Col>
//                       <StarFilled style={{ color: '#ffd700', marginRight: 4 }} />
//                       <Text strong>{recipe.rating}</Text>
//                       <Text type="secondary"> ({recipe.reviewCount} reviews)</Text>
//                     </Col>
//                     <Col>
//                       <FireOutlined style={{ marginRight: 4 }} />
//                       <Text>{recipe.caloriesPerServing} cal/serving</Text>
//                     </Col>
//                   </Row>
//                 </div>
//               }
//             />
//           </Card>
//         ),
//         key: recipe.id.toString(),
//         isFavorite: isFavorite,
//         recipeData: recipe
//       };
//     });

//     setTreeData(formattedData);
//   };

//   // Toggle favorite status
//   const toggleFavorite = (recipeId) => {
//     setFavorites(prev => {
//       const newFavorites = prev.includes(recipeId)
//         ? prev.filter(id => id !== recipeId)
//         : [...prev, recipeId];
      
//       localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
      
//       setTreeData(prevTree => 
//         prevTree.map(item => ({
//           ...item,
//           isFavorite: newFavorites.includes(item.key),
//           title: React.cloneElement(item.title, {
//             props: {
//               ...item.title.props,
//               actions: [
//                 <Button 
//                   type="text" 
//                   icon={newFavorites.includes(item.key) ? 
//                     <StarFilled style={{ color: '#ffd700' }} /> : 
//                     <StarOutlined />}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleFavorite(item.key);
//                   }}
//                 >
//                   {newFavorites.includes(item.key) ? 'Favorited' : 'Favorite'}
//                 </Button>,
//                 ...item.title.props.actions.slice(1)
//               ]
//             }
//           })
//         }))
//       );

//       message.success(
//         newFavorites.includes(recipeId) ? 'Added to favorites' : 'Removed from favorites'
//       );
//       return newFavorites;
//     });
//   };

//   const getDifficultyColor = (difficulty) => {
//     const colors = {
//       easy: 'green',
//       medium: 'orange',
//       hard: 'red'
//     };
//     return colors[difficulty?.toLowerCase()] || 'blue';
//   };

//   const filteredTreeData = showFavoritesOnly
//     ? treeData.filter(item => favorites.includes(item.key))
//     : treeData;

//   if (loading && treeData.length === 0) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <Spin size="large" tip="Loading recipes..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Empty
//         description={
//           <>
//             <Title level={4}>Failed to load recipes</Title>
//             <Text type="danger" style={{ marginBottom: 16 }}>{error}</Text>
//             <Button 
//               icon={<ReloadOutlined />} 
//               onClick={() => window.location.reload()}
//               type="primary"
//               size="large"
//             >
//               Reload Page
//             </Button>
//           </>
//         }
//         imageStyle={{ height: 160 }}
//       />
//     );
//   }

//   return (
//     <>
//       {showScrollButtons && (
//         <>
//           <Button
//             type="primary"
//             shape="circle"
//             icon={<ArrowUpOutlined />}
//             onClick={scrollToTop}
//             style={{
//               position: 'fixed',
//               bottom: 80,
//               right: 24,
//               zIndex: 1000,
//               width: 50,
//               height: 50,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//             }}
//           />
//           <Button
//             type="primary"
//             shape="circle"
//             icon={<ArrowDownOutlined />}
//             onClick={scrollToBottom}
//             style={{
//               position: 'fixed',
//               bottom: 24,
//               right: 24,
//               zIndex: 1000,
//               width: 50,
//               height: 50,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//             }}
//           />
//         </>
//       )}

//       <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
//         <div style={{ position: 'relative', marginBottom: 24 }}>
//           {/* Progress Bar */}
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             height: 4,
//             backgroundColor: 'red',
//             width: '100%',
//             borderRadius: 2,
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               height: '100%',
//               width: '0%',
//               backgroundColor: 'black',
//               animation: 'progress 15s ease-out forwards',
//               animationDelay: '1.5s'
//             }}/>
//           </div>

//           {/* Title and Buttons Container */}
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             paddingTop: 8
//           }}>
//             {/* Animated Title */}
//             <div style={{
//               overflow: 'hidden',
//               whiteSpace: 'nowrap',
//               flex: 1
//             }}>
//               <Title level={2} style={{
//                 display: 'inline-block',
//                 margin: 0,
//                 animation: 'slideIn 1.5s ease-out forwards',
//                 transform: 'translateX(-100%)',
//                 opacity: 0
//               }}>
//                 <span role="img" aria-label="chef">👨‍🍳</span> Recipe Explorer
//               </Title>
//             </div>

//             {/* Buttons */}
//             <div>
//               <Button 
//                 type={showFavoritesOnly ? 'primary' : 'default'}
//                 icon={<StarFilled style={{ color: showFavoritesOnly ? '#ffd700' : undefined }} />}
//                 onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
//                 style={{ marginRight: 16 }}
//                 size="large"
//               >
//                 {showFavoritesOnly ? 'Show All Recipes' : `Show Favorites (${favorites.length})`}
//               </Button>
//               <Button 
//                 icon={<ReloadOutlined />} 
//                 onClick={() => window.location.reload()}
//                 size="large"
//               >
//                 Refresh
//               </Button>
//             </div>
//           </div>

//           {/* Animation CSS */}
//           <style>
//             {`
//               @keyframes slideIn {
//                 0% { transform: translateX(-100%); opacity: 0; }
//                 100% { transform: translateX(0); opacity: 1; }
//               }
//               @keyframes progress {
//                 0% { width: 0%; }
//                 100% { width: 100%; }
//               }
//             `}
//           </style>
//         </div>

//         {filteredTreeData.length > 0 ? (
//           <>
//             {/* Auto-sliding Carousel for Recipes */}
//             <div 
//               ref={sliderRef}
//               style={{
//                 position: 'relative',
//                 width: '100%',
//                 overflow: 'hidden',
//                 height: '400px',
//                 marginBottom: '40px'
//               }}
//             >
//               <div style={{
//                 display: 'flex',
//                 width: `${filteredTreeData.length * 100}%`,
//                 transform: `translateX(-${currentSlide * (100 / filteredTreeData.length)}%)`,
//                 transition: 'transform 0.8s ease-in-out',
//                 height: '100%'
//               }}>
//                 {filteredTreeData.map((item, index) => (
//                   <div 
//                     key={item.key} 
//                     style={{
//                       width: `${100 / filteredTreeData.length}%`,
//                       padding: '0 15px',
//                       height: '100%'
//                     }}
//                   >
//                     {item.title}
//                   </div>
//                 ))}
//               </div>

//               {/* Slide Indicators */}
//               <div style={{
//                 position: 'absolute',
//                 bottom: '20px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 display: 'flex',
//                 gap: '8px'
//               }}>
//                 {filteredTreeData.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       clearInterval(intervalRef.current);
//                       setCurrentSlide(index);
//                       intervalRef.current = setInterval(() => {
//                         setCurrentSlide(prev => (prev + 1) % Math.min(filteredTreeData.length, 4));
//                       }, 3000);
//                     }}
//                     style={{
//                       width: '12px',
//                       height: '12px',
//                       borderRadius: '50%',
//                       border: 'none',
//                       backgroundColor: currentSlide === index ? '#1890ff' : '#d9d9d9',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s'
//                     }}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Tree View for Details */}
//             <Title level={4} style={{ marginBottom: 16 }}>Recipe Details</Title>
//             <Tree
//               treeData={filteredTreeData.map(item => ({
//                 title: item.recipeData.name,
//                 key: item.key,
//                 children: [
//                   {
//                     title: (
//                       <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
//                         <ShoppingOutlined style={{ marginRight: 8, color: '#1890ff', fontSize: 18 }} />
//                         <Text strong style={{ fontSize: 16 }}>Ingredients ({item.recipeData.ingredients?.length || 0})</Text>
//                       </div>
//                     ),
//                     key: `${item.key}-ingredients`,
//                     children: item.recipeData.ingredients?.map((ingredient, index) => ({
//                       title: (
//                         <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
//                           <span style={{ marginRight: 8 }}>•</span>
//                           <Text>{typeof ingredient === 'string' ? ingredient : ingredient.name}</Text>
//                           {typeof ingredient === 'object' && ingredient.amount && (
//                             <Tag style={{ marginLeft: 8 }}>{ingredient.amount}</Tag>
//                           )}
//                         </div>
//                       ),
//                       key: `${item.key}-ingredient-${index}`,
//                     })) || [],
//                   },
//                   {
//                     title: (
//                       <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
//                         <Text strong style={{ fontSize: 16 }}>Instructions ({item.recipeData.instructions?.length || 0} steps)</Text>
//                       </div>
//                     ),
//                     key: `${item.key}-instructions`,
//                     children: (item.recipeData.instructions || []).map((instruction, index) => ({
//                       title: (
//                         <div style={{ padding: '8px 0' }}>
//                           <Text strong>Step {index + 1}:</Text>
//                           <Text style={{ display: 'block', marginTop: 4 }}>{instruction}</Text>
//                         </div>
//                       ),
//                       key: `${item.key}-instruction-${index}`,
//                     })),
//                   },
//                 ],
//               }))}
//               expandedKeys={expandedKeys}
//               onExpand={setExpandedKeys}
//               showLine
//               blockNode
//               switcherIcon={<DownOutlined />}
//               style={{ background: '#fff', padding: 16, borderRadius: 8 }}
//             />
//           </>
//         ) : (
//           <Empty
//             description={
//               <Title level={4}>
//                 {showFavoritesOnly 
//                   ? "You haven't favorited any recipes yet" 
//                   : "No recipes found"}
//               </Title>
//             }
//             imageStyle={{ height: 160 }}
//           />
//         )}

//         {/* YouTube Video Section */}
//         <div style={{ margin: '40px 0 24px' }}>
//           <Title level={4} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
//             <span role="img" aria-label="video">🎬</span> Cooking Tutorial
//           </Title>
          
//           <div style={{ 
//             position: 'relative',
//             paddingBottom: '56.25%',
//             height: 0,
//             overflow: 'hidden',
//             borderRadius: 8,
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             transition: 'box-shadow 0.3s ease',
//             marginLeft: 'auto',
//             width: '80%',
//             ':hover': {
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//             }
//           }}>
//             <iframe
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 border: 'none'
//               }}
//               src="https://www.youtube.com/embed/mhDJNfV7hjk"
//               title="Quick & Easy Recipes With Gordon Ramsay"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//               allowFullScreen
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RecipeTree;