# RONA — local scroll experience

Jalankan `node server.cjs` dari folder ini, lalu buka http://127.0.0.1:4178.
Atau buka index.html langsung. Tidak perlu instalasi dependency.

Revisi: empat section one-page dengan potret fixed di tengah layar tanpa background. Pose menutupi wajah → tangan di rahang → tangan di bawah dagu → kedua tangan menopang dagu dan tersenyum. Transisi crossfade mengikuti scroll dua arah. Navigasi dapat diklik; mendukung mobile dan reduced motion.

Aset pose-01.png hingga pose-04.png dibuat dengan built-in imagegen lalu background dihapus menggunakan cutout.py atas izin pengguna. Sumber dan aset lama tetap disimpan. Versi HTML/CSS/JS sebelumnya disimpan di previous-version.

Semua file proyek ada di folder ini; proyek induk tidak diubah. Font Google bersifat opsional dengan fallback lokal.

Foto before.jpg adalah foto yang diberikan pengguna. clear.png dan after.png dibuat menggunakan built-in imagegen. Transformasi adalah ilustrasi visual, bukan hasil perawatan. Prompt lengkap ada di image-prompts.txt.

## Animasi video (revisi terbaru)
Sumber: assets/motion-source.mp4 dari video pengguna, 10 detik, 24 fps.
Seluruh 240 frame diekstrak menjadi WebP transparan 480x854 di assets/motion (sekitar 8,8 MB). Background putih yang tersambung ke tepi dihapus secara lokal atas izin pengguna.
Canvas menggambar frame asli video sesuai scroll, dengan smoothing 110 ms dan cache maksimal 32 bitmap. Tidak memakai crossfade empat foto. Posisi potret tetap fixed. Scroll balik memundurkan gerakan. Audio video tidak digunakan.
Jalankan melalui server lokal; membuka index.html langsung tidak mendukung fetch frame.
prepare-motion.py mereproduksi aset menggunakan Pillow, NumPy, dan imageio-ffmpeg dalam .tools. Dependency alat tidak diperlukan untuk menjalankan website.

## Surface Skin Habit
Brand diperbarui menggunakan logo lampiran, background putih dan UI hitam-putih. Seluruh frame video ditampilkan dengan object-fit:contain dan tanpa mask memudar. Sisi lengan masih terpotong dalam sumber MP4, sehingga hasil waist-up lengkap memerlukan video pengganti; brief tersedia di video-framing-brief.md.
