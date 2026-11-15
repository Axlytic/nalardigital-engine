/**
 * Menghitung total belanja e-commerce dengan kupon diskon dan saldo wallet.
 * @param {Array<{ name: string, price: number, qty: number }>} items
 * @param {string|null} discountCode
 * @param {number} walletBalance
 */
export function calculateTotal(items, discountCode = null, walletBalance = 0) {
  if (!items || items.length === 0) {
    return { subtotal: 0, discount: 0, finalTotal: 0, walletUsed: 0, remainingPay: 0 };
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;

  // [BUG DI SINI]: Kode diskon HARBOLNAS50 harusnya memotong 50% MAKSIMAL Rp 50.000.
  // Tapi saat ini memotong 50% tanpa batas maksimal sehingga toko rugi besar!
  if (discountCode === "HARBOLNAS50") {
    discount = subtotal * 0.5; // BUG: Belum ada batas Math.min(..., 50000)
  }

  const finalTotal = Math.max(0, subtotal - discount);
  const walletUsed = Math.min(walletBalance, finalTotal);
  const remainingPay = finalTotal - walletUsed;

  return {
    subtotal,
    discount,
    finalTotal,
    walletUsed,
    remainingPay
  };
}
