import React, { useState } from 'react'
import { Product } from '../interfaces/interface';

const product={
    id:-1,
    title:'',
    image:'',
    description:'',
    price:0,
    category:'',

}
interface Props{
    addNewProduct:(newProduct:Product)=>void;
}
const AddProduct: React.FC<Props> = ({addNewProduct}) => {
const [newProduct, setNewProduct]=useState<Product>(product);
 

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>| React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value}=event.target;
    setNewProduct((prevNewProduct) => ({
      ...prevNewProduct,
      [name]: value
    }));
  };

const handleSubmit=(event: React.FormEvent)=>{
    event.preventDefault();

    if (newProduct.price<1 ) {
        alert('Please Enter the valid Price. \n Price must be greater than 0');
        return;
      }
    addNewProduct(newProduct);
    alert("Product Added");
    setNewProduct(product);
    


}
    return (
    <div className='container'>
    <h2>Add Product</h2>
    <form className="mt-3" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title:</label>
    <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      value={newProduct.title}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="category" className="form-label">Category:</label>
    <select
      className="form-control"
      id="category"
      name="category"
      value={newProduct.category}
      onChange={handleInputChange}
      required
    >
      <option value="">Select a category</option>
      <option value="men's clothing">Men's clothing</option>
      <option value="women's clothing">Women's clothing</option>
      <option value="jewelery">Jewelery</option>
      <option value="electronics">Electronics</option>
    </select>
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">Price:</label>
    <input
      type="text"
      className="form-control"
      id="price"
      name="price"
      value={newProduct.price}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="image" className="form-label">Image URL:</label>
    <input
      type="text"
      className="form-control"
      id="image"
      name="image"
      value={newProduct.image}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Description:</label>
  <textarea
    className="form-control"
    id="description"
    name="description"
    rows={6}
    value={newProduct.description}
    onChange={handleInputChange}
  ></textarea>
</div>

  <button type="submit" className="btn btn-primary">Add</button>
</form>

  </div>
  )
}

export default AddProduct