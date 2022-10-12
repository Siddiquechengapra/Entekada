import data from "./data";

function App() {
  return (
    <div>
      <header>
        <a href="/">Entekada</a>
      </header>
      <h1 className="main">Featured Products</h1>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.slug}>
            <a href={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </a>
            <div className="prodinfo">
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>

              <p><strong>${product.price}</strong></p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
