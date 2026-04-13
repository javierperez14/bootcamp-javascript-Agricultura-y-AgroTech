// ✅ SOLUCIÓN
export class Product {
  #id; #name; #price; #category; #icon; #stock; #rating;

  constructor({ id, name, price, category, icon, stock, rating }) {
    this.#id = id; this.#name = name; this.#price = price;
    this.#category = category; this.#icon = icon;
    this.#stock = stock; this.#rating = rating;
  }

  get id()       { return this.#id; }
  get name()     { return this.#name; }
  get price()    { return this.#price; }
  get category() { return this.#category; }
  get icon()     { return this.#icon; }
  get stock()    { return this.#stock; }
  get rating()   { return this.#rating; }
  get inStock()  { return this.#stock > 0; }
  get isInStock(){ return this.#stock > 0; }
  get formattedPrice() {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(this.#price);
  }
  get stars() { return '⭐'.repeat(Math.round(this.#rating)); }

  toJSON() {
    return { id: this.#id, name: this.#name, price: this.#price,
             category: this.#category, icon: this.#icon, stock: this.#stock, rating: this.#rating };
  }

  static create(data) { return new Product(data); }
}
