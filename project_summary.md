# Báo cáo Chi tiết Dự án: Pathfinding Visualizer for Games & Maps

Chào mừng đến với báo cáo kỹ thuật toàn diện của dự án **Pathfinding Visualizer for Games & Maps**. Tài liệu này trình bày chi tiết về kiến trúc hệ thống, các thuật toán tích hợp, các tính năng cốt lõi và các tình huống kiểm thử đối kháng thực tế của ứng dụng.

---

## 1. Tổng quan Dự án & Mục tiêu Công nghệ

Dự án **Pathfinding Visualizer for Games & Maps** là một ứng dụng Web tương tác cao (Interactive Web App) được phát triển trên nền tảng **React (TypeScript)**, **Vite** và **Tailwind CSS**. 

Mục tiêu cốt lõi của dự án là:
* **Trực quan hóa sinh động** các thuật toán tìm đường phổ biến nhất trong khoa học máy tính và phát triển trò chơi.
* **Mô phỏng thực tế** các yếu tố địa hình (trọng số di chuyển) như đầm lầy, ao nước sâu bên cạnh chướng ngại vật tĩnh (tường đá).
* **So sánh hiệu năng thực nghiệm** (Benchmarking) dựa trên dữ liệu CPU thực tế, số nút đã duyệt, chi phí đường đi và tính tối ưu.
* **Thử nghiệm đối kháng** (Scenario Labs) nhằm phơi bày ưu/nhược điểm chí mạng của từng thuật toán trong các môi trường đặc thù.

---

## 2. Kiến trúc & Công nghệ Lõi

Hệ thống được thiết kế theo mô hình decoupled gọn gàng, tách biệt giữa giao diện hiển thị, trạng thái ứng dụng và lõi tính toán toán học:

* **Frontend Framework:** React 19 kết hợp TypeScript mang lại sự an toàn kiểu dữ liệu (Type-safe) tuyệt đối.
* **Bundler & Build Tool:** Vite mang lại tốc độ biên dịch HMR (Hot Module Replacement) vượt trội.
* **Styling System:** Tailwind CSS v4 kết hợp hệ thống màu tối sang trọng (Sleek Charcoal, Gold accents `#D4AF37`), tạo hiệu ứng Glassmorphism hiện đại và chuyên nghiệp.
* **Lõi thuật toán (`src/utils/algorithms.ts`):** Được tối ưu hóa cao độ để xử lý ma trận lưới động, hỗ trợ đầy đủ di chuyển chéo 8 hướng, trọng số chi phí và kiểm soát góc chướng ngại vật.
* **Kiến tạo Mê cung (`src/utils/maze.ts`):** Thuật toán chia hồi quy (Recursive Division) và thuật toán nhiễu ngẫu nhiên tạo lập màn chơi tự động.

---

## 3. Các Tính năng Cốt lõi của Ứng dụng

### 3.1. Lưới Tương tác Địa hình Đa dạng (Interactive Grid)
* **Kích thước chuẩn:** 20 dòng × 45 cột (900 nút phẳng).
* **Cọ vẽ địa hình thông minh (Brushes):**
  * **Start/End Node:** Di chuyển tọa độ xuất phát và đích đến bằng cách nhấp thả trực quan.
  * **Tường đá (Wall):** Chướng ngại vật tuyệt đối không thể đi qua.
  * **Đầm lầy (Weight = 5):** Địa hình bùn sình có độ cản trung bình, tốn 5 đơn vị chi phí di chuyển.
  * **Hồ nước sâu (Weight = 10):** Lực cản di chuyển cực cao, tốn 10 đơn vị chi phí.
  * **Cọ tẩy (Eraser):** Trả trạng thái ô về phẳng (Weight = 1).

### 3.2. Hỗ trợ 5 Thuật toán Tìm đường Nâng cao
1. **A\* Search (Thuật toán tối ưu Heuristic):**
   * *Nguyên lý:* Dẫn đường thông minh bằng hàm $f(n) = g(n) + w \cdot h(n)$. Kết hợp chi phí thực tế $g(n)$ và khoảng cách ước lượng $h(n)$.
   * *Ưu điểm:* Luôn tối ưu chi phí thấp nhất tuyệt đối (nếu $h$ hợp lệ), giảm thiểu tối đa các ô duyệt thừa.
2. **Greedy Best-First Search (Duyệt tham lam Heuristic):**
   * *Nguyên lý:* Chỉ mở rộng nút có khoảng cách ước lượng $h(n)$ gần đích nhất, bỏ qua hoàn toàn $g(n)$.
   * *Ưu điểm:* Tốc độ tính toán siêu tốc, lý tưởng trong không gian mở trơn tru.
3. **Dijkstra's Algorithm (Trọng số thực tế):**
   * *Nguyên lý:* Mở rộng liên tục các nút có chi phí tích lũy thấp nhất xuất phát từ điểm nguồn.
   * *Ưu điểm:* Đảm bảo tính tối ưu tuyệt đối trên mọi đồ thị có trọng số phức tạp.
4. **Breadth-First Search (BFS - Duyệt chiều rộng):**
   * *Nguyên lý:* Tỏa tròn đồng tâm kiểm tra bão hòa tất cả lân cận.
   * *Ưu điểm:* Tìm đường ngắn nhất về số bước đi trên đồ thị phẳng không có trọng số.
5. **Depth-First Search (DFS - Duyệt chiều sâu):**
   * *Nguyên lý:* Dấn sâu thăm dò tối đa nhánh trước khi quay lui.
   * *Ưu điểm:* Ít tốn bộ nhớ khi độ sâu lớn.

### 3.3. Các Tùy chọn Di chuyển Nâng cao (Movement Options)
* **4 Loại khoảng cách ước lượng (Heuristic):**
  * *Manhattan:* Phù hợp di chuyển 4 hướng trực giao (lên, xuống, trái, phải).
  * *Euclidean:* Khoảng cách đường thẳng hình học thực tế.
  * *Octile:* Thích hợp di chuyển 8 hướng chéo tự do có tính chi phí chéo đường chéo $\sqrt{2}$.
  * *Chebyshev:* Thích hợp di chuyển 8 hướng chéo tự do đồng chi phí ($cost = 1$).
* **Cho phép di chuyển chéo (Allow Diagonal):** Bật chế độ di chuyển 8 hướng chéo.
* **Không băng góc chéo tường (Don't Cross Corners):** Khi di chuyển chéo, nếu một trong hai ô trực giao kề cạnh chướng ngại vật là tường thì đường chéo đó sẽ bị khóa. Ngăn chặn hiện tượng di chuyển xuyên góc tường phi thực tế trong thiết kế trò chơi.
* **Trọng số Heuristic động (Heuristic Weight):** Cho phép thay đổi trọng số $w$ trong A* để chuyển đổi linh hoạt từ Dijkstra ($w = 0$), A* thông thường ($w = 1$) cho tới tham lam cường độ cao ($w > 1$).

### 3.4. Kiến tạo Bản đồ Tự động (Procedural Generation)
* **Dạng ô hồi quy (Recursive Division):** Tạo lập mê cung tường khép kín cổ điển thử thách khả năng luồn lách.
* **Đất lầy có trọng số (Swamp/River Terrain):** Kiến tạo các dòng sông nước sâu và đầm lầy hữu cơ cắt ngang lưới.
* **Mảng đá rải rác (Random Noise):** Sinh tường đá ngẫu nhiên dựa trên tham số mật độ trượt (10% - 40%).

---

## 4. Phòng Khảo nghiệm Đối kháng (Scenario Lab)

Tính năng Scenario Lab cung cấp 3 tình huống độc đáo được tinh chỉnh kỹ lưỡng nhằm minh họa trực quan sự khác biệt lý thuyết cốt lõi:

* **TÌNH HUỐNG 1: "Đường ngắn nhưng cost cao" (BFS vs Dijkstra)**
  * *Bố cục:* Một dải hồ nước sâu có trọng số cản cực cao (Cost = 10) chắn ngang ở giữa. Đường vòng bên ngoài hoàn toàn phẳng (Cost = 1).
  * *Đối kháng:*
    * **BFS** đi thẳng băng xuyên qua hồ nước vì nó chỉ quan tâm đến tổng số ô (hops) ngắn nhất $\rightarrow$ tốn tổng chi phí năng lượng cực cao.
    * **Dijkstra** khôn ngoan đi đường vòng xa hơn về số ô nhưng tránh hoàn toàn hồ nước $\rightarrow$ đạt chi phí tích lũy thấp nhất.
* **TÌNH HUỐNG 2: "Cạm bẫy ngõ cụt" (DFS vs BFS)**
  * *Bố cục:* Một hành lang cụt sâu hút ở phía trên kề cận điểm xuất phát, trong khi đích đến nằm sát ngay dưới điểm xuất phát chỉ 3 ô.
  * *Đối kháng:*
    * **DFS** ưu tiên đi sâu nhánh bên trên $\rightarrow$ chui tọt sâu vào đáy ngõ cụt, mất hàng trăm bước duyệt thừa thãi và quay lui trước khi tìm thấy đích.
    * **BFS** tỏa tròn đồng tâm lân cận $\rightarrow$ dễ dàng ẵm trọn đích đến chỉ sau 3 bước duyệt gọn gàng.
* **TÌNH HUỐNG 3: "Mồi nhử trọng số" (BFS vs Dijkstra - Điểm yếu Dijkstra)**
  * *Bố cục:* Điểm xuất phát nằm ở giữa. Bên phải là đích đến bị chắn bởi dải đầm lầy (Cost = 10). Bên trái là không gian trơn chi phí cực rẻ (Cost = 1) nhưng đi ngược hướng đích.
  * *Đối kháng:*
    * **Dijkstra** bị mồi dụ bởi các ô phẳng giá rẻ phía sau lưng $\rightarrow$ thám thính sạch bách toàn bộ không gian bên trái (hơn 400 ô vô nghĩa) trước khi chịu lội đầm lầy phía bên phải.
    * **BFS** bỏ qua trọng số $\rightarrow$ duyệt thẳng qua đai bùn lầy tìm thấy đích đến cực nhanh với số ô duyệt tối thiểu.
    * *Kết luận:* Khi cần tìm đường khả thi trong môi trường nhiễu trọng số ngược hướng, Dijkstra tỏ ra kém hiệu quả so với các hướng tiếp cận định hướng.

---

## 5. Bảng Đo lường Thực nghiệm (Performance Benchmark)

Hệ thống tích hợp bảng xếp hạng hiệu năng thời gian thực. Khi người dùng nhấp **"Đối chiếu tất cả" (Run All)**, hệ thống sẽ:
1. Thực hiện chạy ngầm đồng thời cả 5 thuật toán.
2. Để đảm bảo độ chính xác thực tế của CPU, thời gian thực thi được lấy trung bình từ phép đo lặp **50 lần** (Benchmark average).
3. Thống kê trực tiếp và trao cúp vinh danh cho các tiêu chí:
   * 🏆 **FASTEST (Tốc độ cao nhất):** Thường thuộc về Greedy Best-First Search hoặc A*.
   * 🏆 **NODE VISITED (Khảo sát ít ô nhất):** Vinh danh thuật toán định hướng mục tiêu tốt nhất.
   * 🏆 **COST-OPTIMAL PATH (Đường đi tối ưu nhất):** Chỉ ra các thuật toán tìm được chi phí thực tế thấp nhất (Dijkstra, A*).

---

## 6. Kết luận & Điểm nhấn Công nghệ

Dự án **Pathfinding Visualizer for Games & Maps** không chỉ là một công cụ giáo trình lý thuyết đồ thị trực quan, mà còn là một minh chứng thực tế cho việc ứng dụng cấu trúc dữ liệu và giải thuật trong tối ưu hóa trò chơi. Việc xử lý tinh tế các tình huống cắt góc tường phi thực tế (`dontCrossCorners`) cùng khả năng so sánh khoa học thực nghiệm giúp dự án đạt tiêu chuẩn chất lượng cao và có tính ứng dụng thực tiễn lớn.
