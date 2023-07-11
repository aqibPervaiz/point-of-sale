import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props{
  categories:string[];
  selectedCategory: string | null;
  onSelectCategory: (category:string | null)=>void;
onSearch:(searchTerm:string)=>void;
}

 const Navbar: React.FC<Props>=({categories, selectedCategory, onSelectCategory,onSearch})=>{
// handeling search state
const [searchTerm, setSearchTerm]=useState('');
// handeling search function
const handleSearchChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
setSearchTerm(event.target.value);
}
const handleSearchSubmit=(event: React.ChangeEvent<HTMLFormElement>)=>{
  console.log("Form is submitted");
event.preventDefault();
onSearch(searchTerm);
}


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Point Of Sale</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          
            <li className="nav-item">
              <Link className={`nav-link${!selectedCategory ? ' active' : ''}`} to="/" onClick={() => onSelectCategory(null)}>Home</Link>
            </li>
          {/* Select Category toggle start from here 
          all the categories are sent from app component
          */}
          <div className='dropdown'>
            <button className='btn btn-outline  dropdown-toggle'
            type='button'
            id='categoryDropdown'
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >Category</button>
            <ul className='dropdown-menu'  aria-labelledby="categoryDropdown">

            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <Link
                  className={`nav-link${selectedCategory === category ? ' active' : ''}`}
                  to="/"
                  onClick={() => onSelectCategory(category)}
                >
                  {category}
                </Link>
              </li>
                ))
            }
            </ul>
          </div>


          <li className="nav-item">
          <Link className="nav-link" to="/addproduct">Add Product</Link>
        </li>
          </ul>

          {/* select category toggle end here */}
        
       
       {/* search form started here */}
        
        
        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
          <input className="form-control me-2" 
          type="search" placeholder="Search" 
          aria-label="Search" 
          value={searchTerm}
          onChange={handleSearchChange}
          
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  );
}
export default Navbar;
                              
