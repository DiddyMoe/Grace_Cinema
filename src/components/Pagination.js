import React from "react";
import "./Pagination.css";

// The Pagination component displays a list of page numbers for navigating through paginated content
const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalPosts / postPerPage);

  // Create an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {/* Map over the pages and display a button for each page */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
