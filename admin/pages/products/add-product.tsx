import ProductForm from "@/components/ProductForm";

function AddProduct() {

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1>Add a new Product</h1>
        <ProductForm />
      </div>
    </>
  );
}

export default AddProduct;
