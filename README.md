# uet-dictionary
Bài tập lớn môn *"Lập trình hướng đối tượng"*: *Làm ứng dụng từ điển*.

Tuy bài tập yêu cầu sử dụng **Java**, song vì quen với và thích **C#** hơn nên mình làm bằng **C#**. Hai phiên bản của từ điển bao gồm: *dòng lệnh* và *web*. Trong đó, phiên bản dòng lệnh là bài tập bắt buộc, còn phiên bản web thực ra phải là giao diện đồ họa (nhưng không bắt buộc) nên mình làm để cho vui, để học cách sử dụng **ASP.NET core**.

## Yêu cầu của ứng dụng
* **.NET core**.
* **nodejs**, **npm**.

## Cài đặt, mô tả, chức năng

### Hai phiên bản

**Nhớ đọc đúng thứ tự !**

* [Cơ sở dữ liệu](./docs/database.md)

* [Từ điển phiên bản dòng lệnh](./docs/cli/index.md)

* [Từ điển trên nền web](./docs/web/index.md)

## Những lỗi có thể xảy ra khi sử dụng
* `Duplicate 'System.Reflection.AssemblyCompanyAttribute' attribute`...
  * Khi gặp lỗi này, thử xóa hai thư mục `bin/` và `obj/` rồi chạy lại lệnh `dotnet build`.
  * Nếu vẫn lỗi mà bạn lại dùng *Visual Studio* hoặc *Visual Studio Code*, hãy thử khởi động lại IDE.
  * Ngược lại, hãy tham khảo tại [dotnet cli issues on github](https://github.com/dotnet/cli/issues/4710).
