import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AllProducts from './components/AllProducts';
import { Product } from './interfaces/interface';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';



const App: React.FC= ()=> {
  // states to get products, to get products by category, to show search item
  const [products,setProducts]=useState<Product[]>([]);
  const [categories,setCategories]=useState<string[]>([]);
  const [selectedCategory,setSelectedCategory]=useState<string| null>(null)
  const [searchTerm, setSearchTerm]=useState('');

  // fetch data using api
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then((json: Product[])=>setProducts(json));
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  },[])
// to handle delete of product------------
  const clickDeleteHandle=(productId:number)=>{
    // we are not using a delete method because the database is fake and not accessible to us
    // fetch('https://fakestoreapi.com/products/1',{
    //         method:"DELETE"
    //     })
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

  }
  // -------ending of delete method

  // ------------To handle category change---------
const handleCategoryChange=(category:string | null)=>{
setSelectedCategory(category);
  }

  // handle search---------------------------
  const handleSearch=(searchTerm:string)=>{
    setSearchTerm(searchTerm);
  }

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

// ---------------------------------------adding a new product
const addNewProduct=(newProduct:Product)=>{
  setProducts((prevProducts)=>[...prevProducts,newProduct])


}
  return (
    <>
    <Router>
    <Navbar categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          onSearch={handleSearch}
   ></Navbar>
    <Routes>
      <Route path="/" element={<AllProducts products={filteredProducts} deleteProduct={clickDeleteHandle} selectedCategory={selectedCategory}/> } /> 
      <Route path="/addproduct" element={<AddProduct addNewProduct={addNewProduct}/> } /> 
    </Routes>
    </Router>
     
      
       <Footer></Footer>
    </>
  )
}

export default App