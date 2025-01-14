import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'; // Ensure the Card component is correctly set up
import blogData from '../../../public/blogData'; // Correct path to your blogData file

const Blogs = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const blogContainerRef = useRef(null);

  // Filter blogs based on search term
  const filteredBlogs = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowSuggestions(false);
      setShouldScroll(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll && filteredBlogs.length > 0 && blogContainerRef.current) {
      blogContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScroll(false);
    }
  }, [filteredBlogs, shouldScroll]);

  // Suggestions for search terms
  const suggestions = blogData
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        searchTerm.trim() !== ''
    )
    .map((blog) => blog.title);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  {/* Header Section */}
  <div className="flex flex-col items-center mb-8 space-y-4 text-center">
    <h1 className="text-4xl font-bold text-gray-800">Explore UTS Company Blogs</h1>
   
  </div>
  
  {/* Video and Search Bar Section */}
  <div className="relative w-full h-64 md:h-80 lg:h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
    <video
      className="w-full h-full object-cover"
      src="https://videos.pexels.com/video-files/28767017/12472317_2560_1440_30fps.mp4"
      autoPlay
      loop
      muted
    />
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative w-3/4 md:w-1/2">
        <input
          type="text"
          placeholder="Search for blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className="w-full p-3 text-gray-800 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {showSuggestions && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No suggestions found</p>
            )}
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Blog Cards Section */}
  <h2 className="text-3xl font-semibold text-center mb-8">Technical Blogs</h2>
  <div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
    id="blog-container"
    ref={blogContainerRef}
  >
    {filteredBlogs.length > 0 ? (
      filteredBlogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/blog/${blog.id}`}
          state={blog}
          className="block transform hover:scale-105 transition-transform"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
              <p className="text-gray-600">{blog.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                <span>{blog.time}</span> · <span>{blog.comments} comments</span>
              </div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        No blogs found for "{searchTerm}"
      </p>
    )}
  </div>
</div>

  );
};

export default Blogs;
