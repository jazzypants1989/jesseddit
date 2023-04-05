export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function ProductComponent(product: Product) {
  return `
            <div class="product">
              <a href=/product/${product.id} class="Link">
              <img src="${product.images[0]}" alt="${product.title}" loading="lazy"/>
              <h2>${product.title}</h2>
              </a>
              <p>${product.description}</p>
              <p>$${product.price}</p>
              <button class="add-to-cart" id="${product.id}">Add to cart</button>
            </div>
            `
}
