import { useState } from 'react';

/**
 * InteractiveList Component
 * A reusable component that displays a list of items with expandable content,
 * search functionality, and category filtering.
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of items to display, each with title, content, and category
 * @param {string} props.title - The title of the section
 */
function InteractiveList({ items, title }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});

  const categories = ['all', 'technical', 'interpersonal'];

  /**
   * Toggles the expanded state of an item
   * @param {number} index - The index of the item to toggle
   */
  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  /**
   * Filters items based on search term and selected category
   * @returns {Array} Filtered array of items
   */
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Determines if an item's content should be shown
   * Content is shown if the item is expanded or matches the search term
   * @param {Object} item - The item to check
   * @param {number} index - The index of the item
   * @returns {boolean} Whether the content should be shown
   */
  const shouldShowContent = (item, index) => {
    return expandedItems[index] || (searchTerm && item.content.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  /**
   * Splits a comma-separated string into an array of trimmed items
   * @param {string} content - The comma-separated string to split
   * @returns {Array} Array of trimmed items
   */
  const splitContent = (content) => {
    return content.split(',').map(item => item.trim());
  };

  return (
    <div className="interactive-list">
      <h4 className="section-header">{title}</h4>
      
      <div className="search-container mb-3">
        <div className="category-buttons mb-3">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="skills-list">
        {filteredItems.map((item, index) => (
          <li 
            key={index}
            className="skill-item"
          >
            <div className="skill-header" onClick={() => toggleItem(index)}>
              <h5 className="skill-title">{item.title}</h5>
              <i className={`fas fa-chevron-${expandedItems[index] ? 'down' : 'right'} toggle-icon`}></i>
            </div>
            {shouldShowContent(item, index) && (
              <ul className="skill-content-list">
                {splitContent(item.content).map((skill, skillIndex) => (
                  <li key={skillIndex} className="skill-content-item">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InteractiveList;
