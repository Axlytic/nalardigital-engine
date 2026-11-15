import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal } from '../src/checkout.js';

test('1. Normal checkout tanpa kupon', () => {
  const items = [
    { name: 'Kopi Susu', price: 20000, qty: 2 },
    { name: 'Roti Bakar', price: 15000, qty: 1 }
  ];
  const res = calculateTotal(items, null, 0);
  assert.equal(res.subtotal, 55000);
  assert.equal(res.discount, 0);
  assert.equal(res.finalTotal, 55000);
  assert.equal(res.remainingPay, 55000);
});

test('2. Diskon HARBOLNAS50 untuk belanja kecil (di bawah batas maksimal Rp 50.000)', () => {
  const items = [{ name: 'Kaos Polos', price: 80000, qty: 1 }];
  const res = calculateTotal(items, 'HARBOLNAS50', 0);
  // 50% dari 80.000 = 40.000 (masih di bawah 50.000)
  assert.equal(res.discount, 40000);
  assert.equal(res.finalTotal, 40000);
});

test('3. Diskon HARBOLNAS50 untuk belanja besar (WAJIB dibatasi maksimal Rp 50.000)', () => {
  const items = [{ name: 'Sepatu Running', price: 300000, qty: 1 }];
  const res = calculateTotal(items, 'HARBOLNAS50', 0);
  // 50% dari 300.000 adalah 150.000, TAPI aturan bisnis membatasi MAKSIMAL diskon Rp 50.000!
  assert.equal(res.discount, 50000, 'Diskon HARBOLNAS50 bocor melebihi batas maksimal Rp 50.000!');
  assert.equal(res.finalTotal, 250000);
});

test('4. Checkout dengan potongan saldo wallet', () => {
  const items = [{ name: 'Mouse Wireless', price: 100000, qty: 1 }];
  const res = calculateTotal(items, null, 30000); // saldo wallet 30.000
  assert.equal(res.finalTotal, 100000);
  assert.equal(res.walletUsed, 30000);
  assert.equal(res.remainingPay, 70000);
});
