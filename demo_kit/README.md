# 🎬 Demo Kit Rekaman Layar: @nalardigital (Topik 01 - Autonomous Agent Harness)

Kit ini dirancang khusus untuk direkam selama 25-30 detik sebagai segmen praktik nyata di Babak 3 video @nalardigital.

## 📁 Struktur Berkas
- `AGENTS.md` ➔ File SOP & aturan Karpathy yang membatasi tindakan AI.
- `src/checkout.js` ➔ Fungsi bisnis pembayaran e-commerce (ada bug diskon kupon).
- `test/checkout.test.js` ➔ Unit test otomatis bawaan Node.js.

## 🎥 Skenario Rekaman Layar (Durasi Rekam: ~30 Detik)
1. **Detik 01-05**: Buka VS Code. Tampilkan file `AGENTS.md` (highlight 3 aturan emas).
2. **Detik 06-12**: Buka terminal terintegrasi (`Ctrl + ~`), ketik:
   ```bash
   node --test
   ```
   *Layar memperlihatkan 1 tes merah GAGAL (AssertionError: Diskon bocor melebihi Rp 50.000).*
3. **Detik 13-22**: Jalankan Agent CLI atau minta AI memperbaiki:
   "Perbaiki bug diskon di src/checkout.js sesuai aturan AGENTS.md dan pastikan test lolos."
   *Perlihatkan file `src/checkout.js` terupdate menjadi: `discount = Math.min(subtotal * 0.5, 50000);`*
4. **Detik 23-30**: Terminal menjalankan ulang `node --test`:
   *Layar memperlihatkan seluruh 4 tes HIJAU LULUS (✔ pass 4, fail 0).*
