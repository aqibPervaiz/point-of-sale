import React from 'react'
import { Product } from '../interfaces/interface'
interface Props{
    handleEditSubmit:(event: React.FormEvent)=>void;
    editedProduct:Product;
    handleEditInputChange:(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>)=>void;
    handleModalClose:()=>void;

}

const EditProductModal:React.FC<Props> = ({handleEditSubmit, editedProduct,handleEditInputChange,handleModalClose}) => {
  return (
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

  )
}

export default EditProductModal