import React, { useState } from 'react';
import { Product } from '../interfaces/interface';
import '../CSS/Products.css';

interface Props {
  products: Product[];
  deleteProduct:(productId:number)=>void
  selectedCategory:string | null;
  editProduct:(updatedProduct:Product)=>void
}
const product={
  id:-1,
  title:'',
  image:'',
  description:'',
  price:0,
  category:'',

}
const AllProducts: React.FC<Props> = ({ products, deleteProduct,  selectedCategory, editProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Edit Product states
  const [editedProduct,setEditedProduct]=useState<Product>(product);
  const [isEditModalOpen,setIsEditModalOPen]=useState(false);
// ----------------
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (selectedProductId:number) => {
    setIsModalOpen(false);
    deleteProduct(selectedProductId);
    
  };
  const filteredProducts=selectedCategory
  ?products.filter((product)=>product.category===selectedCategory): products;
  // edit functionalities
  const handleModalClose = () => {
    setIsEditModalOPen(false);
    setIsModalOpen(false);
  };

  const handleEdit=(product:Product)=>{
    setEditedProduct(product);
    setIsEditModalOPen(true);
    setIsModalOpen(false);
  }

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      [name]: value
    }));
  };
  

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(editedProduct);
    editProduct(editedProduct); // Assumes editedProduct will always have a value
    setIsEditModalOPen(false);
  };

  return (
    <>
      <h1 className="text-center pt-3">Welcome to Point of Sale</h1>
      <h2 className="text-center">All Products</h2>
      <p className="text-center">Below is the list of all the products in our store.</p>
      <div className="product-grid container">
        {filteredProducts.map((product: Product,index: number) => (
          <div
            key={index}
            className="card"
            style={{ width: '18rem' }}
            onClick={() => handleCardClick(product)}
          >
            <img src={product.image} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p>{product.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className={`modal${isModalOpen ? ' show' : ''}`} tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.title}</h5>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedProduct.image} className="card-img-top" alt={selectedProduct.title} />
                <p>{selectedProduct.description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">PRICE: {selectedProduct.price}$</li>
                  <li className="list-group-item">Category: {selectedProduct.category}</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={()=>handleDelete(selectedProduct.id)}>
                  Delete
                </button>
                
                <button type="button" className="btn btn-dark" onClick={()=>handleEdit(selectedProduct)}>
                  Edit
                </button>
                <button type="button" className="btn btn-dark" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


{editedProduct && (
        <div className={`modal${isEditModalOpen ? ' show' : ''}`} tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
    <label htmlFor="title" className="form-label">Title:</label>
    <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      value={editedProduct.title}
      onChange={handleEditInputChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="category" className="form-label">Category:</label>
    <select
      className="form-control"
      id="category"
      name="category"
      value={editedProduct.category}
      onChange={handleEditInputChange}
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
      value={editedProduct.price}
      onChange={handleEditInputChange}
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
      value={editedProduct.image}
      onChange={handleEditInputChange}
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
    value={editedProduct.description}
    onChange={handleEditInputChange}
  ></textarea>
</div>

      <button type="submit" className="btn btn-primary">Add</button>
              </form>
              <button type="button" className="btn btn-dark" onClick={handleModalClose}>
                  Close
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
