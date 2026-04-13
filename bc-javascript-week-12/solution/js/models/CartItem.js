// CartItem Model – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

const MAX_QUANTITY = 10;

export class CartItem {
  #product;
  #quantity;

  constructor(product, quantity = 1) {
    if (!product) throw new Error('CartItem requiere un producto');
    if (quantity < 1) throw new Error('La cantidad debe ser al menos 1');
    this.#product  = product;
    this.#quantity = Math.min(quantity, MAX_QUANTITY);
  }

  get product()  { return this.#product; }
  get quantity() { return this.#quantity; }
  get productId() { return String(this.#product.id); }

  get subtotal() { return this.#product.price * this.#quantity; }

  get formattedSubtotal() {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0,
    }).format(this.subtotal);
  }

  increaseQuantity(amount = 1) {
    this.#quantity = Math.min(this.#quantity + amount, MAX_QUANTITY);
  }

  decreaseQuantity(amount = 1) {
    this.#quantity -= amount;
    if (this.#quantity <= 0) { this.#quantity = 0; return false; }
    return true;
  }

  setQuantity(quantity) {
    this.#quantity = quantity < 1 ? 1 : Math.min(quantity, MAX_QUANTITY);
  }

  toJSON() {
    const productData = typeof this.#product.toJSON === 'function'
      ? this.#product.toJSON()
      : this.#product;
    return { product: productData, quantity: this.#quantity };
  }

  static create({ product, quantity }) {
    return new CartItem(product, quantity);
  }
}
