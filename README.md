# uet-dictionary
Bài tập lớn môn "Lập trình hướng đối tượng bằng Java": Làm ứng dụng từ điển
### Yêu cầu
* .NET core 2.1
* nodejs, npm

### Hướng dẫn sử dụng
* Clone repo bằng lệnh:
```shell
git clone https://github.com/QuangDuong120198/uet-dictionary.git
```
* Repo bao gồm hai phần: từ điển trên CLI và từ điển trên WEB.
* Đối với CLI:
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
        1. Thêm từ mới
        2. Liệt kê toàn bộ
        3. Tìm kiếm (chuỗi tìm kiếm phải khớp với đoạn đầu của từ)
        4. Xuất ra file trong thư mục $HOME
        5. Nhập từ mới từ một file đúng định dạng json
* Đối với web:
    * Compile
    ```shell
    # di chuyển đến thư mục web
    cd /path/to/repo/web
    # compile ra bin/ và obj/
    dotnet build
    ```
    * Cài đặt các package
    ```shell
    # di chuyển đến thư mục ClientApp
    cd project/web/ClientApp
    # chạy lệnh cài đặt
    npm i
    ```
    * Chạy
    ```shell
    # di chuyển đến thư mục chứa project
    dotnet run
    ```
    Sau đó mở trình duyệt, gõ đường dẫn như thông báo trong terminal, mà mặc định là http://localhost:5000
### Những lỗi có thể xảy ra khi sử dụng
    * "Duplicate 'System.Reflection.AssemblyCompanyAttribute' attribute"
        Khi gặp lỗi này, thử xóa hai thư mục bin/ và obj/ rồi chạy lại lệnh `dotnet build`
        Nếu vẫn lỗi, tham khảo ở [dotnet cli issues on github](https://github.com/dotnet/cli/issues/4710)
