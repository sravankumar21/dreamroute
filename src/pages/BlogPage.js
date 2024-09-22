import React, { useState } from 'react';
import '../styles/BlogPage.css';

// Import multiple images
import industryImg1 from '../images/blog4_files/824694.jpg';
import industryImg2 from '../images/blog2.jpg';
import industryImg3 from '../images/blog4_files/824555.jpg';

// Data for blogs
const blogData = [
  {
    id: 1,
    title: 'Top Trends in AI for 2024',
    image: industryImg1,
    date: 'September 20, 2024, 10:30 AM',
    shortContent: 'Artificial intelligence continues to revolutionize industries,',
    fullContent: ' In 2024, we expect to see AI make significant advancements in natural language processing, automation, and ethical AI systems. These trends will create new opportunities for students and professionals in the field.'
  },
  {
    id: 2,
    title: 'Cloud Computing: What to Expect',
    image: industryImg2,
    date: 'September 18, 2024, 2:00 PM',
    shortContent: 'Cloud computing has become the backbone of modern infrastructure,',
    fullContent: ' With the rise of hybrid cloud solutions and edge computing, the future of cloud computing looks brighter than ever. Understanding these trends is critical for staying competitive in today’s tech world.'
  },
  {
    id: 3,
    title: 'Cybersecurity: Staying Ahead of Threats',
    image: industryImg3,
    date: 'September 15, 2024, 5:45 PM',
    shortContent: 'As digital transformation accelerates, so do the cybersecurity risks,',
    fullContent: ' 2024 will see cybersecurity focus heavily on AI-driven threat detection, zero-trust frameworks, and increased emphasis on data privacy. This opens up massive career opportunities for aspiring security experts.'
  }
];

const BlogPage = () => {
  const [expandedBlog, setExpandedBlog] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  return (
    <div className="blog-page">
      <h1 className="blog-page-heading">Current Industry Trends</h1>
      <div className="blogs-container">
        {blogData.map((blog) => (
          <div key={blog.id} className={`blog-card ${expandedBlog === blog.id ? 'expanded' : ''}`}>
            <div className="image-container">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <span className="blog-date">{blog.date}</span>
            </div>
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">
              {blog.shortContent}
              {expandedBlog === blog.id && <span>{blog.fullContent}</span>}
            </p>
            <button className="expand-button" onClick={() => toggleExpand(blog.id)}>
              {expandedBlog === blog.id ? 'Read Less' : 'Read More'} ▼
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
