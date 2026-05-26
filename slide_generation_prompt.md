# MASTER PROMPT: KHỞI TẠO SLIDE TRÌNH BÀY DỰ ÁN PATHFINDING VISUALIZER

Hãy đóng vai là một Chuyên gia Thiết kế Trình bày (Presentation Designer) và Kỹ sư AI cấp cao. Sử dụng toàn bộ thông tin chi tiết dưới đây để kiến tạo một cấu trúc Slide thuyết trình đẳng cấp, chuyên nghiệp và đầy tính thuyết phục về dự án **Pathfinding Visualizer for Games & Maps**.

---

## 🎨 HƯỚNG DẪN THIẾT KẾ MỸ THUẬT (VISUAL STYLE GUIDE)
* **Tone màu chủ đạo:** Tối sang trọng (Premium Dark Mode) với màu nền Sleek Charcoal/Matte Black, chữ trắng xám thanh lịch, điểm nhấn màu Vàng kim quý phái (`#D4AF37`) làm điểm sáng nổi bật.
* **Layout nguyên tắc:** Tối giản thông tin trên slide (Less text, more visual). Sử dụng biểu đồ so sánh, sơ đồ khối và danh sách gạch đầu dòng ngắn gọn.
* **Hình thức phân bổ:** 8 Slide trình bày liền mạch, mỗi Slide phân định rõ:
  * **[Tiêu đề Slide]**
  * **[Bố cục trực quan & Thiết kế đồ họa gợi ý]**
  * **[Nội dung Core ngắn gọn hiển thị trên Slide]**
  * **[Lời thoại chi tiết cho người thuyết trình (Speaker Notes)]**

---

## 📽️ CẤU TRÚC 8 SLIDE CHI TIẾT (SLIDE STRUCTURE)

### SLIDE 1: GIỚI THIỆU DỰ ÁN (PROJECT TITLE)
* **Tiêu đề:** KHÁM PHÁ GIẢI THUẬT TÌM ĐƯỜNG TRONG PHÁT TRIỂN GAME & BẢN ĐỒ SỐ
* **Phụ đề:** Dự án mô phỏng thực nghiệm đối kháng và so sánh hiệu năng trực quan hóa giải thuật trên lưới địa hình phức tạp.
* **Gợi ý Visual:** Nền đen nhám sâu thẳm. Biểu tượng bản đồ lưới phát sáng màu Gold với điểm xuất phát (Cờ vàng) và điểm Đích (Bia bắn trắng) tạo cảm giác định vị thông minh.
* **Speaker Notes:** 
  > "Kính thưa quý hội đồng và các bạn. Tìm đường (Pathfinding) là xương sống của mọi trò chơi thế giới mở và các ứng dụng bản đồ số hiện đại. Hôm nay, tôi xin giới thiệu dự án 'Pathfinding Visualizer' - một nền tảng không chỉ giúp trực quan sinh động các thuật toán tìm đường mà còn là phòng thí nghiệm thực tế giúp phân tích đối kháng giải thuật trong môi trường có chướng ngại vật tĩnh và các dải địa hình sình lầy có trọng số phức tạp."

---

### SLIDE 2: TỔNG QUAN & KHÔNG GIAN TƯƠNG TÁC (GRID INTERACTION)
* **Tiêu đề:** LƯỚI TƯƠNG TÁC ĐỊA HÌNH ĐA DẠNG (INTERACTIVE CANVAS)
* **Nội dung Core:**
  * **Lưới ma trận động:** Khổ lớn 20 x 45 (900 nút phẳng).
  * **Tương tác trực quan:** Khả năng kéo thả di dời điểm Đầu & Đích tức thời.
  * **Hệ thống địa hình đa cấp:**
    * *Tường đá (Wall):* Chướng ngại vật tĩnh tuyệt đối.
    * *Sình lầy (Mud - Cost = 5):* Kháng lực trung bình.
    * *Hồ nước sâu (Deep Water - Cost = 10):* Kháng lực cực cao.
* **Gợi ý Visual:** Chia slide làm 2 phần. Bên trái là sơ đồ lưới tương tác phẳng với các màu đặc trưng (Đầm lầy màu nâu, hồ nước màu xanh thẫm, tường xám tối). Bên phải là danh sách tính năng dạng danh sách tối giản.
* **Speaker Notes:**
  > "Trái tim của giao diện ứng dụng là hệ thống lưới phẳng cho phép vẽ địa hình tự do. Thay vì chỉ có tường và đường đi trống như các công cụ thông thường, chúng tôi đưa vào cơ chế trọng số di chuyển thực tế mô phỏng bùn lầy và hồ nước sâu. Người dùng có thể tùy ý vẽ bất kỳ hình thù địa hình nào để thử thách trí thông minh nhân tạo của các thuật toán."

---

### SLIDE 3: 5 THUẬT TOÁN ĐẦU NÃO (CORE ENGINES)
* **Tiêu đề:** 5 THUẬT TOÁN ĐẦU NÃO ĐƯỢC TÍCH HỢP
* **Nội dung Core:**
  * **A\* Search:** Giải thuật tối ưu Heuristic, dẫn đường khôn ngoan bằng hàm $f(n) = g(n) + w \cdot h(n)$.
  * **Greedy Best-First Search:** Tìm kiếm tham lam siêu tốc chỉ dựa vào khoảng cách đích $h(n)$.
  * **Dijkstra's Algorithm:** Tối ưu hóa tuyệt đối trên đồ thị có trọng số phức tạp.
  * **Breadth-First Search (BFS):** Đảm bảo số ô đi ít nhất trên bản đồ phẳng không trọng số.
  * **Depth-First Search (DFS):** Khảo sát dấn sâu tìm đường đi khả thi nhanh nhất.
* **Gợi ý Visual:** Sắp xếp 5 thuật toán thành 5 thẻ Glassmorphism dọc hoặc lưới 2x3. Các thuộc tính kỹ thuật cốt lõi được làm nổi bật bằng chữ màu Gold.
* **Speaker Notes:**
  > "Ứng dụng hỗ trợ từ các giải thuật duyệt đồ thị kinh điển không trọng số như BFS, DFS cho đến các hạt nhân tìm đường phức tạp có trọng số như Dijkstra. Đặc biệt, chúng tôi đưa vào A* - giải thuật thông minh nhất kết hợp cả chi phí đã đi và khoảng cách ước lượng tới đích, cùng với phiên bản tham lam Greedy Best-First Search có khả năng tìm thấy đích đến trong chớp mắt."

---

### SLIDE 4: TÙY CHỌN DI CHUYỂN NÂNG CAO (DIAGONAL & CORNERS)
* **Tiêu đề:** TÙY BIẾN DI CHUYỂN CHÉO & KHOẢNG CÁCH ƯỚC LƯỢNG
* **Nội dung Core:**
  * **4 Loại Heuristic chính:** Manhattan, Euclidean, Octile, Chebyshev.
  * **Di chuyển chéo (Allow Diagonal):** Kích hoạt 8 hướng di chuyển tự do.
  * **Tránh cắt góc tường (Don't Cross Corners):** Khóa đường chéo nếu chạm góc tường chướng ngại vật $\rightarrow$ Ngăn chặn di chuyển xuyên tường phi vật lý.
  * **Trọng số Heuristic động (Weight):** Thay đổi $w$ từ 0 đến 100 để kiểm soát tính tham lam của A*.
* **Gợi ý Visual:** Sơ đồ minh họa chuyển động 8 hướng. Góc phóng to chỉ rõ cơ chế "Cắt góc tường" (Cross corners vs Don't cross corners) để làm rõ điểm đặc sắc kỹ thuật của dự án.
* **Speaker Notes:**
  > "Điểm độc đáo tiếp theo là sự tùy biến chuyển động nâng cao. Chúng tôi không chỉ có di chuyển chéo 8 hướng thông thường mà còn tích hợp tùy chọn 'Don't Cross Corners'. Tùy chọn này ngăn chặn nhân vật trong game di chuyển chéo cắt xuyên qua các góc tường đá sắc nhọn - một lỗi đồ họa rất phổ biến trong các game 2D. Bên cạnh đó, việc cung cấp tới 4 hàm toán học tính toán khoảng cách Heuristic giúp người dùng hiểu sâu sắc tác động hình học của thuật toán."

---

### SLIDE 5: PHÒNG THÍ NGHIỆM ĐỐI KHÁNG - MÀN 1 & 2 (SCENARIO LABS)
* **Tiêu đề:** PHÒNG THÍ NGHIỆM ĐỐI KHÁNG - HIỂU SÂU LÝ THUYẾT
* **Nội dung Core:**
  * **Tình huống 1: "Đường ngắn nhưng chi phí cao" (BFS vs Dijkstra)**
    * *Hiện tượng:* BFS đi thẳng qua hồ nước sâu (Cost = 10) vì ít ô nhất. Dijkstra đi vòng xa hơn nhưng chi phí năng lượng = 1.
    * *Bài học:* BFS không dùng được trên bản đồ có trọng số địa hình.
  * **Tình huống 2: "Cạm bẫy ngõ cụt" (DFS vs BFS)**
    * *Hiện tượng:* DFS chui tọt vào hành lang cụt sâu hoắm ngược hướng đích. BFS tìm thấy đích chỉ sau 3 ô sát vách.
    * *Bài học:* DFS dễ sa lầy vào bẫy đường cụt dài nếu chọn sai nhánh ưu tiên.
* **Gợi ý Visual:** Ảnh chụp màn hình chia đôi minh họa cuộc đối đầu trực diện giữa hai thuật toán trong Lab.
* **Speaker Notes:**
  > "Để minh họa sự khác biệt giải thuật một cách sinh động nhất, chúng tôi xây dựng phòng thí nghiệm Scenario Lab. Trong tình huống 1, chúng ta thấy rõ điểm yếu của BFS khi nó hăm hở lao thẳng vào hồ nước sâu vì đếm số bước ô là ít nhất, trong khi Dijkstra khôn ngoan đi đường vòng phẳng để tiết kiệm thể lực. Ở tình huống 2, DFS hoàn toàn thất bại trước cạm bẫy hành lang cụt sâu hoắm do bản tính ưu tiên vét cạn độ sâu, trong khi BFS phát hiện ra đích sát bên chỉ sau 3 bước."

---

### SLIDE 6: PHÒNG THÍ NGHIỆM ĐỐI KHÁNG - MÀN 3 (DIJKSTRA LURING)
* **Tiêu đề:** ĐIỂM YẾU CHÍ MẠNG CỦA DIJKSTRA - "MỒI NHỬ TRỌNG SỐ"
* **Nội dung Core:**
  * **Bố cục cạm bẫy:** Phía đích đến (bên phải) bị đầm lầy (Cost = 10) chắn ngang. Phía ngược lại (bên trái) hoàn toàn trống phẳng (Cost = 1).
  * **Hiện tượng nghịch lý:**
    * Dijkstra bị mê hoặc bởi vùng cỏ phẳng rộng lớn chi phí rẻ phía sau lưng, duyệt sạch hơn 400 ô vô nghĩa trước khi chấp nhận lội đầm lầy để sang đích.
    * BFS không quan tâm trọng số địa hình, đi thẳng qua đai bùn lầy tiếp cận đích cực nhanh với số ô duyệt tối thiểu.
* **Gợi ý Visual:** Sơ đồ động hoặc hình vẽ biểu thị sự lan tỏa ô duyệt ngập tràn nửa bên trái của Dijkstra đối chọi với đường đi thẳng băng tối giản của BFS.
* **Speaker Notes:**
  > "Đặc biệt nhất là tình huống số 3: 'Mồi nhử trọng số' phơi bày điểm yếu chí mạng của thuật toán Dijkstra. Vì Dijkstra luôn ưu tiên duyệt ô có tổng chi phí rẻ nhất, nó bị cuốn vào việc thám thính toàn bộ khu vực cỏ phẳng rộng lớn đi ngược hướng mục tiêu ở mạn trái, trước khi chịu khó lội qua dải đầm lầy ở mạn phải. Ngược lại, BFS hoàn toàn phớt lờ chi phí, đi thẳng xuyên đầm lầy và tìm thấy đích nhanh hơn hàng chục lần."

---

### SLIDE 7: BẢNG SO SÁNH THỰC NGHIỆM ĐỘNG (REAL-TIME BENCHMARK)
* **Tiêu đề:** BẢNG ĐO LƯỜNG THỰC NGHIỆM ĐA CHIỀU (BENCHMARKING)
* **Nội dung Core:**
  * **Đo lường đa chỉ số:** Thời gian CPU thực tế, Số lượng ô đã duyệt, Chi phí tích lũy, Tính tối ưu tuyệt đối.
  * **Benchmark chuẩn hóa:** Thời gian thực thi lấy trung bình từ **50 lần chạy liên tục** ngầm để đảm bảo độ chính xác thực tế của CPU.
  * **Bảng xếp hạng thời gian thực:** Vinh danh trực tiếp các cúp vàng:
    * 🏆 *FASTEST:* Thuật toán nhanh nhất.
    * 🏆 *NODE VISITED:* Thuật toán thám thính ít ô nhất.
    * 🏆 *COST-OPTIMAL PATH:* Thuật toán tìm đường chi phí tối ưu nhất.
* **Gợi ý Visual:** Thiết kế một bảng xếp hạng giả lập cực kỳ hiện đại với các màu biểu thị cúp vàng, bạc, đồng cho 5 thuật toán.
* **Speaker Notes:**
  > "Để các nghiên cứu có tính định lượng khoa học cao, ứng dụng tích hợp một công cụ Benchmark cực kỳ chuẩn hóa. Mỗi lần so sánh, ứng dụng sẽ chạy ngầm mỗi thuật toán 50 lần liên tục rồi tính trung bình cộng thời gian thực tế CPU. Bảng xếp hạng sẽ trao cúp vàng cho thuật toán nhanh nhất, thuật toán duyệt ít ô nhất và thuật toán có đường đi tối ưu chi phí nhất. Qua đó giúp các nhà lập trình game có dữ liệu khoa học tin cậy để lựa chọn giải thuật phù hợp cho AI của mình."

---

### SLIDE 8: KẾT LUẬN & ĐỊNH HƯỚNG TƯƠNG LAI
* **Tiêu đề:** KẾT LUẬN & HƯỚNG TRIỂN KHAI PHÁT TRIỂN
* **Nội dung Core:**
  * **Giá trị khoa học:** Kết hợp xuất sắc giữa trực quan lý thuyết và đo lường thực nghiệm khoa học máy tính.
  * **Giá trị thực tiễn:** Khả năng ứng dụng trực tiếp thuật toán tối ưu hóa vào các trò chơi 2D/3D thực tế.
  * **Định hướng mở rộng:** Tích hợp thuật toán dò đường phân cấp (Hierarchical Pathfinding), hỗ trợ bản đồ thế giới mở kích thước lớn và hỗ trợ đa mục tiêu (Multi-target pathfinding).
* **Gợi ý Visual:** Thiết kế tối giản, nổi bật biểu tượng mũi tên hướng lên màu Vàng Gold tượng trưng cho sự nâng cấp liên tục.
* **Speaker Notes:**
  > "Tổng kết lại, dự án 'Pathfinding Visualizer for Games & Maps' đã hoàn thành mục tiêu thiết lập một môi trường mô phỏng tìm đường toàn diện, an toàn kiểu dữ liệu và đạt hiệu năng đóng gói cao. Trong tương lai, chúng tôi định hướng nâng cấp hệ thống lên giải thuật dò đường phân cấp (Hierarchical) và mở rộng cho việc tìm đường đa đích đến. Xin chân thành cảm ơn quý hội đồng và các bạn đã lắng nghe bài thuyết trình!"
