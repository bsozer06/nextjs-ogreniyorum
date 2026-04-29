// SQLite bağlantısı — uygulama boyunca tek bir DB instance kullanılır
// process.cwd() → proje kök dizini (mesajlar.db burada oluşturulur)

import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "mesajlar.db"));

// Tablo yoksa oluştur
db.exec(`
  CREATE TABLE IF NOT EXISTS mesajlar (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    metin TEXT    NOT NULL,
    tarih TEXT    NOT NULL
  )
`);

export default db;
