# uet-dictionary
Bài tập lớn môn "Lập trình hướng đối tượng bằng Java": Làm ứng dụng từ điển bằng

### Yêu cầu
* .NET core 2.1

### Hướng dẫn sử dụng
* Clone repo bằng lệnh:
```shell
git clone https://github.com/QuangDuong120198/uet-dictionary.git
```
* Repo bao gồm hai phần: từ điển trên CLI và từ điển trên WEB.
* Đối với CLI:
    * Mở Command Prompt/Terminal, gõ các lệnh sau
    ```shell
    # di chuyển đến thư mục cli
    cd /path/to/repo/cli
    # compile ra bin/ và obj/
    dotnet build
    # chạy ứng dụng
    dotnet run
    ```
    * Ứng dụng phiên bản CLI có 5 tính năng:
        1. Thêm từ mới
        2. Liệt kê toàn bộ
        3. Tìm kiếm (chuỗi tìm kiếm phải khớp với đoạn đầu của từ)
        4. Xuất ra file trong thư mục $HOME
        5. Nhập từ mới từ một file đúng định dạng json
* Đối với web:
    * Mở Command Prompt/Terminal, gõ các lệnh sau
    ```shell
    # di chuyển đến thư mục web
    cd /path/to/repo/web
    # compile ra bin/ và obj/
    dotnet build
    # chạy ứng dụng
    dotnet run
    ```

### Những lỗi có thể xảy ra khi sử dụng
