# uet-dictionary
Bài tập lớn môn *"Lập trình hướng đối tượng bằng Java"*: *Làm ứng dụng từ điển*.
## Yêu cầu của ứng dụng
* **.NET core 2.1**.
* **nodejs**, **npm** phiên bản mới nhất.

## Hướng dẫn sử dụng
* Clone repo bằng lệnh:
```shell
git clone https://github.com/QuangDuong120198/uet-dictionary.git
```
* Repo bao gồm hai phần: từ điển trên CLI và từ điển trên WEB.
### Đối với CLI:
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
* Ứng dụng phiên bản CLI có 5 tính năng:
    1. Liệt kê toàn bộ
    2. Tìm kiếm (chuỗi tìm kiếm phải khớp với đoạn đầu của từ)
    3. Thêm từ mới
    4. Sửa
    5. Xóa
    6. Xuất ra file trong thư mục $HOME
### Đối với web:
* Compile
```shell
# di chuyển đến thư mục web
cd /path/to/repo/web
# compile ra bin/ và obj/
dotnet build
```
* Cài đặt các package
```shell
# di chuyển đến thư mục wwwroot
cd project/web/wwwroot
# chạy lệnh cài đặt các npm package
npm i
# bower
bower install bootstrap-css-only font-awesome snackbar
```
* Chạy
```shell
# di chuyển đến thư mục chứa project
dotnet run
```
Sau đó mở trình duyệt, gõ đường dẫn như thông báo trong terminal, mà mặc định là [http://localhost:5000](http://localhost:5000)

## Mô tả, chức năng

### Cơ sở dữ liệu và Models

* Mình sử dụng hệ quản trị cơ sở dữ liệu `SQLite`. Lý do là vì nó nhẹ, đa nền tảng, dễ sử dụng và có thể dùng một cách *locally* - nó không khác so với việc dùng file `.txt` để lưu dữ liệu ngoài việc extension của file là `.db` mà tận dụng được cú pháp truy vấn của `SQL` - như thế sẽ tiện hơn việc đọc ghi file `.txt` truyền thống.
* Để thuận tiện cho việc truy vấn, mình sử dụng *Entity Framework Core*. Đây là một công cụ được cung cấp với **.NET core**, cho phép tạo cơ sở dữ liệu từ các `class` đã khai báo, mỗi `class` tương ứng với một bảng, mỗi trường của `class` lại tương ứng với một cột của bảng, các `class` này tụ họp tại một `class` đặc biệt thừa kế từ `class Microsoft.EntityFrameworkCore.DbContext` (cơ chế này được gọi là Code First, tức là tạo `class` rồi mới sinh ra cơ sở dữ liệu, nhưng cơ sở dữ liệu được tạo bởi **EF core** chứ không phải làm thủ công).

### Cli
* Ứng dụng này sử dụng template `console`.
* Tất cả các lớp mà mình định nghĩa trong ứng dụng này đều không nhất thiết phải tạo `instance` nên mình để tất cả đều là `static class`, chỉ chứa các thành phần `static`.
* Bên cạnh cơ sở dữ liệu được đặt trong file `dictionary.db`, các phần còn lại được tổ chức như sau:
    * `uet/`: Đây là chỗ mà mình tạo ra các lớp để project có thể phục vụ mục đích làm từ điển.
        * `uet/theme`: 
            * `uet/theme/MessageType.cs`: Đây là file chứa `enum`, quy định kiểu của Message, tương tự như bootstrap có *danger*, *warning*, *success*, *info*, *default*. Mỗi kiểu tương ứng với một màu sắc khác nhau
            * `uet/theme/Message.cs`: Đây là file chứa `static class` mà ta chỉ cần quan tâm đến phương thức tên là `Log`. Phương thức này này nhận 2 tham số: Tham số đầu tiên là chuỗi mà ta muốn in ra, còn tham số thứ hai là `MessageType`, quy định màu sắc khi in chuỗi đó ra; Trong nội dung, `Message.Log` sẽ gọi đến phương thức `Console.WriteLine`.
        * `uet/Dictionary.cs`:
            * Đây là file chứa một `static class`, lớp này tương tác trực tiếp với Model, chứa các phương thức cho phép *lấy dữ liệu*, *tìm kiếm*, *thêm*, *sửa*, *xóa* từ cơ sở dữ liệu.
            * Các phương thức trong lớp này đều sử dụng `LINQ` dạng phương thức.
        * `uet/DictionaryManager.cs`: 
            * Đây cũng là file chứa `static class`, có các phương thức để gọi đến từ phương thức `Main` trong file `Program.cs`.
            * Lớp trong file này sẽ gọi đến các phương thức trong `Dictionary.cs` và `uet/theme/Message.cs`, sau đó sẽ hiển thị các kết quả ra `Console`.
* Ứng dụng này cung cấp các chức năng:
    * Liệt kê các từ trong từ điển.
    * Tìm kiếm từ trong từ điển (lọc ra những từ bắt đầu bằng từ khóa nhập vào).
    * Thêm từ mới.
    * Sửa.
    * Xóa.
    * Export ra file `.txt`.
### Web
* Ứng dụng này chạy trên web, sử dụng template `mvc` và kết hợp với **Reactjs** (nhưng không phải template `react`). Bởi vì template `react` mà **.NET core** cung cấp mất quá nhiều thời gian để khởi động.
* Phần Model của ứng dụng web tương tự như phần Model của ứng dụng trên Console nên mình sẽ chỉ mô tả phần Controller và View.
* Phần Controller chỉ chứa controller duy nhất là `HomeController` và các phương thức tương tác với Model.
* Phần View sử dụng **Reactjs**, bởi mình muốn làm một *single page application*. Views được chia làm các component, phần cấp như sau:
```xml
<App>
    <Layout>
        <Menu />
        <Content />
    </Layout>
</App>
```
* `state` được quản lý bởi `class App`, "đổ xuống" các component con thông qua `props`. Cấu trúc của `state`:
```js
// value của các key trong object sau là mặc định
this.state = {
    data: [],
    searchInput: "",
    currentWord: {
        wordId: 0,
        wordName: "",
        wordPronunciation: "",
        wordDetails: [
            {
                type: "",
                meaningsAndExamples: [
                    {
                        meaning: "",
                        examples: [
                            {
                                inEnglish: "",
                                inVietnamese: ""
                            }
                        ]
                    }
                ]
            }
        ]
    },
    input: {
        wordId: 0,
        wordName: {
            value: "",
            message: ""
        },
        wordPronunciation: {
            value: "",
            message: ""
        },
        wordDetails: [
            {
                type: {
                    value: "",
                    message: ""
                },
                meaningsAndExamples: [
                    {
                        meaning: {
                            value: "",
                            message: ""
                        },
                        examples: [
                            {
                                inEnglish: {
                                    value: "",
                                    message: ""
                                },
                                inVietnamese: {
                                    value: "",
                                    message: ""
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
```
* Khi nào thì những `state` này thay đổi (sắp xếp từ ít đến nhiều, đơn giản đến phức tạp):
    * `searchInput`: Đây là nội dung mà người dùng nhập vào thanh tìm kiếm, thay đổi dựa trên sự kiện `onchange` của thanh tìm kiếm.
    * `wordId`: Mã của từ trong cơ sở dữ liệu. Thay đổi khi chọn từ trong từ điển. Khi `wordId` thay đổi thì nội dung hiển thị (nghĩa, loại từ, ví dụ) cũng thay đổi theo.
    * `data`: Chứa toàn bộ nội dung của từ điển. Thay đổi khi sửa hoặc thêm từ mới. Cập nhật bằng `AJAX`, thông qua package `axios`.
    * `input`: Chứa dữ liệu nhập vào khi thêm hoặc sửa, thay đổi theo sự kiện `onchange`. Đặc biệt lưu ý `wordId` trong `input`, key này có giá trị bằng 0 khi tác vụ là *thêm*, giá trị lớn hơn 0 khi sửa (là khóa chính của từ được chọn).
    * `currentWord`: Lưu nội dung của từ được chọn. Thay đổi khi chọn từ mới.

## Những lỗi có thể xảy ra khi sử dụng
* `Duplicate 'System.Reflection.AssemblyCompanyAttribute' attribute`.
    * Khi gặp lỗi này, thử xóa hai thư mục `bin/` và `obj/` rồi chạy lại lệnh `dotnet build`.
    * Nếu vẫn lỗi mà bạn lại dùng *Visual Studio* hoặc *Visual Studio Code*, hãy thử đóng rồi mở lại.
    * Ngược lại, hãy tham khảo tại [dotnet cli issues on github](https://github.com/dotnet/cli/issues/4710).
