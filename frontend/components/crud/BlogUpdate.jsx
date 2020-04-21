import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { QuillModules, QuillFormats } from "../../helpers/quill";
const BlogLocal = "blog_CtrlxAltf4";
const cookieToken = "MultiBlogToken_ctrlxAltf4"; //cookie key

const BlogUpdate = () => {
  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          <p>Create Blog Form</p>
          <div className="pt-3">
            show Success and errro message
            {/* {showError()}
          {showSuccess()} */}
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group pb-4">
            <h5>Featured Image</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogUpdate;
