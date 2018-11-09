# CLI

## Cài đặt
* Compile
```shell
# di chuyển đến thư mục cli
cd /path/to/repo/cli
# compile ra bin/ và obj/
dotnet build
```
* Chạy ứng dụng
```shell
# tại thư mục chứa project, chạy bằng lệnh
dotnet run
```

## Mô tả
* Ứng dụng này sử dụng template `console`.
* Tất cả các lớp mà mình định nghĩa trong ứng dụng này đều không nhất thiết phải tạo `instance` nên mình để tất cả đều là `static class`, chỉ chứa các thành phần `static`.
* Bên cạnh cơ sở dữ liệu được đặt trong file `dictionary.db`, các phần còn lại được tổ chức như sau:
  * `uet/`: Đây là chỗ mà mình tạo ra các lớp để project có thể phục vụ mục đích làm từ điển.
    * `uet/theme`: 
      * `uet/theme/MessageType.cs`: Đây là file chứa `enum`, quy định kiểu của Message, tương tự như bootstrap có *danger*, *warning*, *success*, *info*, *default*. Mỗi kiểu tương ứng với một màu sắc khác nhau. Thực sự phần này chỉ để làm màu mè cho vui.
      * `uet/theme/Message.cs`: Đây là file chứa `static class` mà ta chỉ cần quan tâm đến phương thức tên là `Log`. Phương thức này này nhận 2 tham số: Tham số đầu tiên là chuỗi mà ta muốn in ra, còn tham số thứ hai là `MessageType`, quy định màu sắc khi in chuỗi đó ra; Trong nội dung, `Message.Log` sẽ gọi đến phương thức `Console.WriteLine`.
    * `uet/Dictionary.cs`:
      * Đây là file chứa một `static class`, lớp này tương tác trực tiếp với Model, chứa các phương thức cho phép *lấy dữ liệu*, *tìm kiếm*, *thêm*, *sửa*, *xóa* từ cơ sở dữ liệu.
      * Các phương thức trong lớp này đều sử dụng `LINQ` dạng phương thức.
    * `uet/DictionaryManager.cs`: 
      * Đây cũng là file chứa `static class`, có các phương thức để gọi đến từ phương thức `Main` trong file `Program.cs`.
      * Lớp trong file này sẽ gọi đến các phương thức trong `Dictionary.cs` và `uet/theme/Message.cs`, sau đó sẽ hiển thị các kết quả ra `Console`.

## Chức năng
* Từ điển phiên bản CLI gồm các chức năng:
  1. Liệt kê toàn bộ
  2. Tìm kiếm (chuỗi tìm kiếm phải khớp với đoạn đầu của từ)
  3. Thêm từ mới
  4. Sửa
  5. Xóa
  6. Xuất ra file trong thư mục $HOME
