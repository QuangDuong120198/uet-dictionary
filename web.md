# Web

## Cài đặt

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

## Mô tả

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
  <InsertModal />
  <EditModal />
</App>
```
* `state` được quản lý bởi `class App`, "đổ xuống" các component con thông qua `props`. Cấu trúc của `state`:
```js
// value của các key trong object sau là mặc định
this.state = {
  data: [],
  searchInput: "",
  currentWord: {
    ID: 0,
    InEnglish: "",
    Pronunciation: "",
    Content: ""
  },
  insertModal: {
    show: false,
    data: {
      id: 0,
      inEnglish: { value: "", message: "" },
      pronunciation: { value: "", message: "" },
      content: [
        {
          type: { value: "", message: "" },
          meaningsAndExamples: [
            {
              meaning: { value: "", message: "" },
              examples: [ {
                inEnglish: { value: "", message: "" },
                inVietnamese: { value: "", message: "" }
              } ]
            }
          ]
        }
      ]
    }
  },
  editModal: {
    show: false,
    data: {
      id: 0,
      inEnglish: { value: "", message: "" },
      pronunciation: { value: "", message: "" },
      content: [
        {
          type: { value: "", message: "" },
          meaningsAndExamples: [
            {
              meaning: { value: "", message: "" },
              examples: [ {
                inEnglish: { value: "", message: "" },
                inVietnamese: { value: "", message: "" }
              } ]
            }
          ]
        }
      ]
    }
  }
};
```
* Khi nào thì những `state` này thay đổi (sắp xếp từ ít đến nhiều, đơn giản đến phức tạp):
    * `searchInput`: Đây là nội dung mà người dùng nhập vào thanh tìm kiếm, thay đổi dựa trên sự kiện `onchange` của thanh tìm kiếm.
    * `wordId`: Mã của từ trong cơ sở dữ liệu. Thay đổi khi chọn từ trong từ điển. Khi `wordId` thay đổi thì nội dung hiển thị (nghĩa, loại từ, ví dụ) cũng thay đổi theo.
    * `data`: Chứa toàn bộ nội dung của từ điển. Thay đổi khi sửa hoặc thêm từ mới. Cập nhật bằng `AJAX`, thông qua package `axios`.
    * `input`: Chứa dữ liệu nhập vào khi thêm hoặc sửa, thay đổi theo sự kiện `onchange`. Đặc biệt lưu ý `wordId` trong `input`, key này có giá trị bằng 0 khi tác vụ là *thêm*, giá trị lớn hơn 0 khi sửa (là khóa chính của từ được chọn).
    * `currentWord`: Lưu nội dung của từ được chọn. Thay đổi khi chọn từ mới.

## Chức năng:

