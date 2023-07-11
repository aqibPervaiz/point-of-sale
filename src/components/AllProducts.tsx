import React, { useState } from 'react';
import { Product } from '../interfaces/interface';
import '../CSS/Products.css';

interface Props {
  products: Product[];
  deleteProduct:(productId:number)=>void
  selectedCategory:string | null;
}

const AllProducts: React.FC<Props> = ({ products, deleteProduct,  selectedCategory }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (selectedProductId:number) => {
    setIsModalOpen(false);
    deleteProduct(selectedProductId);

  };
  const filteredProducts=selectedCategory
  ?products.filter((product)=>product.category===selectedCategory): products;


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
                <button type="button" className="btn btn-dark" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;










