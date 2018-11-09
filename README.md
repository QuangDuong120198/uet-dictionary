# uet-dictionary
Bài tập lớn môn *"Lập trình hướng đối tượng"*: *Làm ứng dụng từ điển*.
## Yêu cầu của ứng dụng
* **.NET core >=2.1**.
* **nodejs**, **npm**.

## Cài đặt, mô tả, chức năng

### Cơ sở dữ liệu và Models

* Mình sử dụng hệ quản trị cơ sở dữ liệu `SQLite`. Lý do là vì nó nhẹ, đa nền tảng, dễ sử dụng và có thể dùng một cách *locally* - nó không khác so với việc dùng file `.txt` để lưu dữ liệu ngoài việc extension của file là `.db` mà tận dụng được cú pháp truy vấn của `SQL` - như thế sẽ tiện hơn việc đọc ghi file `.txt` truyền thống.
* Để thuận tiện cho việc truy vấn, mình sử dụng *Entity Framework Core*. Đây là một công cụ được cung cấp với **.NET core**, cho phép tạo cơ sở dữ liệu từ các `class` đã khai báo, mỗi `class` tương ứng với một bảng, mỗi trường của `class` lại tương ứng với một cột của bảng, các `class` này tụ họp tại một `class` đặc biệt thừa kế từ `Microsoft.EntityFrameworkCore.DbContext` (cơ chế này được gọi là Code First, tức là tạo `class` rồi mới sinh ra cơ sở dữ liệu, nhưng cơ sở dữ liệu được tạo bởi **EF core** chứ không phải làm thủ công).

### Hai phiên bản

[Mô tả từ điển phiên bản dòng lệnh](./cli.md)
[Mô tả từ điển trên nền web](./web.md)

## Những lỗi có thể xảy ra khi sử dụng
* `Duplicate 'System.Reflection.AssemblyCompanyAttribute' attribute`...
  * Khi gặp lỗi này, thử xóa hai thư mục `bin/` và `obj/` rồi chạy lại lệnh `dotnet build`.
  * Nếu vẫn lỗi mà bạn lại dùng *Visual Studio* hoặc *Visual Studio Code*, hãy thử đóng rồi mở lại.
  * Ngược lại, hãy tham khảo tại [dotnet cli issues on github](https://github.com/dotnet/cli/issues/4710).
