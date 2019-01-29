# Cơ sở dữ liệu

## Dành cho người muốn chạy ứng dụng

Ứng dụng này sử dụng hệ quản trị cơ sở dữ liệu **SQLite**. Do đó hãy chắc chắn rằng bạn đã cài **SQLite** trên máy.

**SQLite** cung cấp cơ sở dữ liệu cục bộ (không cần server, chỉ cần là một file **.db**) và luôn thay đổi nên file này không được commit cùng source code. Tuy nhiên để sử dụng được lại cần có file này, bạn phải thực hiện việc khởi tạo:

```shell
# Lần lượt tại thư mục cli, web, thực hiện lệnh
dotnet ef database update
# Một file dictionary.db sẽ được tạo bởi cơ sở dữ liệu rỗng, bảng rỗng.
```

## Dành cho người muốn code

### Cơ sở dữ liệu có những gì?

Cơ sở dữ liệu của mỗi phiên bản: dòng lệnh và web đều chỉ gồm một bảng duy nhất.
```sql
-- Những lệnh này được thực thi tự động bởi Entity Framework Core khi ta sử dụng lệnh dotnet ef database update
-- Đối với phiên bản dòng lệnh
CREATE TABLE Words (
  ID integer NOT NULL CONSTRAINT 'PK_Words' PRIMARY KEY,
  inEnglish text NOT NULL,
  inVietnamese text NOT NULL
);
-- Đối với phiên bản web
CREATE TABLE Words (
  Id integer NOT NULL CONSTRAINT 'PK_Words' PRIMARY KEY,
  Word text NOT NULL,
  Content text NOT NULL
);
```

Ở phiên bản dòng lệnh, cơ sở dữ liệu còn sơ khai và chỉ nên sơ khai như thế ???

Đối với phiên bản web, yêu cầu phức tạp hơn vì có giao diện đồ họa, một từ tiếng Anh không chỉ có nghĩa tiếng Việt mà có phải có loại từ, nghĩa tương ứng và các ví dụ. Có thể thiết kế một cơ sở dữ liệu gồm nhiều bảng và liên kết lại bẳng `FOREIGN KEY` nhưng rất phức tạp.

Quy ước đối với người làm ứng dụng này: Cột `Content` của bảng `Words` sẽ chứa tất cả thông tin về *loại từ*, *nghĩa* và *ví dụ* - những thông tin này được biểu diễn dưới dạng chuỗi **JSON**. Chuỗi này sẽ luôn có dạng mảng:

```json
[
  {
    "type": "danh từ",
    "meaningsAndExamples": [
      {
        "meaning": "",
        "examples": [
          {
            "inEnglish": "",
            "inVietnamese": ""
          },
        ]
      },
    ]
  },
]
```

Có thể giải thích cấu trúc trên như sau: Một từ có thể thuộc về nhiều loại từ khác nhau, chẳng hạn *book* có thể là danh từ (sách) hoặc động từ (đặt chỗ); Một loại từ có thể có nhiều nghĩa; Mỗi nghĩa ta lại có thể đưa ra một hoặc nhiều ví dụ.

### Lớp thực thể

Để cho tiện trong việc truy vấn, mình sử dụng **Entity Framework Core**. Đây là một công cụ **ORM**, nó ánh xạ các bảng có trong cơ sở dữ liệu thành các lớp, ta có thể thực hiện truy vấn bằng cách sử dụng các thuộc tính và phương thức của lớp đó thay vì viết các câu truy vấn (database first) hoặc bắt đầu từ một lớp kế thừa từ lớp `DbContext` (lớp đặc biệt này có liên kết với các lớp ánh xạ với bảng), **EF core** sẽ tạo ra cơ sở dữ liệu tương ứng (Code First). Mình sử dụng cơ chế **Code First**. Ưu điểm của **Code First** là dù có mang đi đâu thì cũng có cơ sở dữ liệu - vì nó có thể sinh ra cơ sở dữ liệu từ `DbContext` và các lớp **model** đã tạo.

Lấy ví dụ cho dễ hiểu:

* Các lớp thực thể đại diện cho bảng. Các thuộc tính của lớp thực thể chính là các cột của bảng đó. Ngoài ra có thể thêm các chú thích (trong **C#** gọi là `Annotation`) để can thiệp sâu hơn khi đụng tới các vấn đề như định dạng kiểu dữ liệu, độ dài chuỗi,... Đối với các bảng có khóa ngoại thì phức tạp hơn, bạn có thể đọc ví dụ tại [tài liệu hướng dẫn của Microsoft](https://docs.microsoft.com/en-us/ef/core/modeling/alternate-keys).
* Tuy nhiên chỉ có đúng các lớp thực thể là chưa đủ, ta còn phải tạo một lớp đại diện cho toàn bộ cơ sở dữ liệu. Lớp này có thuộc tính là các bảng trong cơ sở dữ liệu, sử dụng generic data type `DbSet<T>`. Quan trọng nhất, lớp này thừa kế từ lớp `DbContext`.

Tại cả hai thư mục `cli/` và `web/`, các lớp thực thể và lớp `context` được đặt trong thư mục `Models/`. Thư mục `Migrations/` chứa các lớp giúp thực hiện khởi tạo cơ sở dữ liệu sau khi đã tạo xong các lớp thực thể.

Các lớp trong thư mục `Migrations` sẽ được sinh ra khi chạy lệnh:
```shell
# Chú ý tên lớp DbContext phải chứa đầy đủ namespace
dotnet ef migrations add <Tên của migration> --context <Tên lớp DbContext> --output-dir <Đường dẫn đến thư mục Migrations>
# Đường dẫn đến thư mục Migrations là không bắt buộc, có thể làm đường dẫn đến thư mục khác
```
Khi đã có các file `Migration` thì ta có thể tạo cơ sở dữ liệu với lệnh:
```shell
dotnet ef database update [--context <Tên lớp DbContext>]
```

Ngược lại, để xóa cơ sở dữ liệu thì:
```shell
dotnet ef database drop [--context <Tên lớp DbContext>]
```
Và chỉ khi cơ sở dữ liệu đã bị xóa, ta mới có thể xóa đi `Migration` đã tạo ra nó:
```shell
dotnet ef migrations remove [--context <Tên lớp DbContext>]
```
