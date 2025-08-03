var pic=document.getElementById("picture");
var picx = picture.getContext("2d");
function delpic(){
    picx.clearRect(0, 0, picture.width, picture.height);
}
function senttest(){
  let base64image = pic.toDataURL("image/png");
  fetch("http://127.0.0.1:5000/AI_main", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64image })
  })
  .then(res => res.json())
  .then(data => alert(data.result))
}
let drawing = false;

pic.addEventListener("mousedown", (e) => {
  drawing = true;
  picx.beginPath();         // 開始新的繪圖路徑
  picx.moveTo(e.offsetX, e.offsetY); // 起點
});

pic.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  picx.lineTo(e.offsetX, e.offsetY); // 畫到目前滑鼠位置
  picx.strokeStyle = "black";
  picx.lineWidth = 2;
  picx.lineJoin = "round";
  picx.lineCap = "round";
  picx.stroke();           // 繪出線條
});

pic.addEventListener("mouseup", () => {
  drawing = false;
});

pic.addEventListener("touchstart", (e) => {
  drawing = true;
  const rect = ic.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  const y = e.touches[0].clientY - rect.top;
  picx.beginPath();         // 開始新的繪圖路徑
  picx.moveTo(x,y); // 起點
});

pic.addEventListener("touchmove", (e) => {
  if (!drawing) return;
  e.preventDefault();
  const rect = ic.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  const y = e.touches[0].clientY - rect.top;

  picx.lineTo(x,y); // 畫到目前滑鼠位置
  picx.strokeStyle = "black";
  picx.lineWidth = 2;
  picx.lineJoin = "round";
  picx.lineCap = "round";
  picx.stroke();           // 繪出線條
},{ passive: false });

pic.addEventListener("touchend", () => {
  drawing = false;
});
