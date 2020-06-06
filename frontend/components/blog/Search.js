import { useState, useEffect } from "react";
import Link from "next/link";
import { API } from "../../config";

import { listSearch } from "../../actions/blog";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });
  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data & data.length} blogs found`,
      });
    });
  };
  const handleChange = (e) => {
    //**Todo e.currentTarget   */
    setValues({
      ...values,
      search: e.currentTarget.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const SearchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search Blogs"
            onChange={handleChange}
          ></input>
        </div>
        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <form onSubmit={searchSubmit}>
      <div class="container h-100">
        <div class="d-flex justify-content-center h-100">
          <div class="searchbar">
            <input
              class="search_input"
              type="text"
              name=""
              placeholder="Search..."
              onChange={handleChange}
            />
            <a href="#" class="search_icon">
              <FaSearch onClick={searchSubmit} />
            </a>
          </div>
        </div>
      </div>
      {searched && (
        <div style={{ marginTop: -120, marginBottom: -80 }}>
          {searchedBlogs(results)}
        </div>
      )}
    </form>
  );
};

export default Search;
