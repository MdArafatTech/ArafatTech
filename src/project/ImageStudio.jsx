import React, { useState, useRef, useEffect } from "react";
import { Download, Scissors, Image as ImageIcon } from "lucide-react";

import imageCompression from "browser-image-compression";

export default function ImageStudio() {
  // State
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImage, setBgImage] = useState(null);
  const [format, setFormat] = useState("png");
  const [customWidth, setCustomWidth] = useState(500);
  const [customHeight, setCustomHeight] = useState(500);
  const [fileSizeLimit, setFileSizeLimit] = useState(0);
  const [fileSizeUnit, setFileSizeUnit] = useState("KB");
  const [removingBg, setRemovingBg] = useState(false);

 const [filters, setFilters] = useState({
  brightness: 1,
  contrast: 1,
  saturation: 1,
  blur: 0,
  clarity: 0,   // NEW
  opacity: 1,
});

  const canvasRef = useRef();
  const fileRef = useRef();
  const REMOVE_BG_API_KEY = "PVG1VX1rSf2aChmQEwiSMnsT";

  // Auto dark/light mode
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const listener = (e) => setDarkMode(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
    return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
  }, []);

  // Upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1000, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    setImage(URL.createObjectURL(compressedFile));
    setBgRemoved(false);
    setBgImage(null);
    setCroppedImage(null);
  };

  // Background remove
  const handleBgRemove = async () => {
    if (!image) return;
    setRemovingBg(true);
    try {
      const fileBlob = await fetch(image).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image_file", fileBlob);
      formData.append("size", "auto");

      const res = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": REMOVE_BG_API_KEY },
        body: formData,
      });
      if (!res.ok) throw new Error("BG removal failed");
      const blob = await res.blob();
      setImage(URL.createObjectURL(blob));
      setBgRemoved(true);
    } catch (err) {
      console.error(err);
      alert("Background removal failed. Check API key or network.");
    } finally {
      setRemovingBg(false);
    }
  };

  // Draw on canvas
  useEffect(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = croppedImage || image;

    img.onload = () => {
      canvas.width = customWidth;
      canvas.height = customHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      if (bgImage) {
        const bg = new Image();
        bg.src = bgImage;
        bg.onload = () => {
          ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
          ctx.filter = getFilterString();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        return;
      } else if (!bgRemoved) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.filter = getFilterString();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image, croppedImage, bgRemoved, bgColor, bgImage, filters, customWidth, customHeight]);

const getFilterString = () =>
  `brightness(${filters.brightness})
   contrast(${filters.contrast + filters.clarity}) 
   saturate(${filters.saturation})
   blur(${filters.blur}px)
   opacity(${filters.opacity})`;

  // Download
  const downloadImage = async (withBg = true) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = customWidth;
    tempCanvas.height = customHeight;
    const ctx = tempCanvas.getContext("2d");

    // Background
    if (withBg) {
      if (bgImage) {
        const bg = new Image();
        bg.src = bgImage;
        await new Promise((res) => (bg.onload = res));
        ctx.drawImage(bg, 0, 0, tempCanvas.width, tempCanvas.height);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      }
    } else {
      ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    }

    const img = new Image();
    img.src = croppedImage || image;
    await new Promise((res) => (img.onload = res));
    ctx.filter = getFilterString();
    ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

    let blob = await fetch(tempCanvas.toDataURL(`image/${format}`)).then((res) => res.blob());

    if (fileSizeLimit > 0) {
      const maxSizeMB = fileSizeUnit === "MB" ? fileSizeLimit : fileSizeLimit / 1024;
      const options = { maxSizeMB, maxWidthOrHeight: 1000, useWebWorker: true };
      blob = await imageCompression(blob, options);
    }

    const link = document.createElement("a");
    link.download = `image.${format}`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className={`p-4 max-w-6xl mt-7 rounded border mb-5 border-gray-600 mx-auto space-y-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <h2 className="text-3xl font-bold text-center mt-5  mb-4">AI Premium Image Studio</h2>

      {/* Upload */}
      <div
        className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:bg-gray-200 ${darkMode ? "border-gray-700 hover:bg-gray-800" : ""}`}
        onClick={() => fileRef.current.click()}
      >
        {image ? "Click to change image" : "Drag & drop or click to upload image"}
        <input type="file" accept="image/*" ref={fileRef} onChange={handleUpload} className="hidden" />
      </div>

   {/* Canvas (Fully Responsive) */}
<div className="w-full flex justify-center mt-4">
  <div className="w-full max-w-[420px] aspect-[3/4]">
    <canvas
      ref={canvasRef}
      className="border rounded shadow-lg w-full h-full"
    />
  </div>
</div>


 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
  {[
    { key: "brightness", min: 0.2, max: 2, step: 0.01 },
    { key: "contrast", min: 0.2, max: 2, step: 0.01 },
    { key: "saturation", min: 0, max: 3, step: 0.01 },
    { key: "blur", min: 0, max: 10, step: 0.1 },
    { key: "clarity", min: 0, max: 1, step: 0.01 },   // NEW
    { key: "opacity", min: 0.1, max: 1, step: 0.01 },
  ].map(({ key, min, max, step }) => (
    <div key={key} className="p-2 border rounded shadow-sm">
      <label className="block capitalize">{key}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={filters[key]}
        onChange={(e) => setFilters({ ...filters, [key]: +e.target.value })}
      />
    </div>
  ))}
</div>


      {/* Background Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 border  rounded-lg shadow-sm">
          <button
            onClick={handleBgRemove}
            disabled={removingBg}
            className={`p-2 cursor-pointer rounded mb-2 ${removingBg ? "bg-yellow-500" : "bg-gray-400"} flex items-center`}
          >
            <Scissors className="mr-1 cursor-pointer "/> {removingBg ? "Removing..." : "Remove Background"}
          </button>

          <label className="block mb-1">Background Color:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-[50%] cursor-pointer h-10 mb-2" /> <br />
          <button onClick={() => setBgColor("#ffffff")} className="text-red-500 btn btn-dash text-sm mb-2">Reset Color</button>

          <label className="block mb-1">Background Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setBgImage(URL.createObjectURL(e.target.files[0]))} className=" btn btn-accent w-[50%] mb-2" /> <br />
          <button onClick={() => setBgImage(null)} className="text-red-500 btn btn-dash text-sm">Remove BG Image</button>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <label className="block mb-1">Custom Width (px):</label>
          <input type="number" value={customWidth} min="1" onChange={(e) => setCustomWidth(+e.target.value)} className="w-full p-1 border rounded mb-2" />
          <label className="block mb-1">Custom Height (px):</label>
          <input type="number" value={customHeight} min="1" onChange={(e) => setCustomHeight(+e.target.value)} className="w-full p-1 border rounded" />
        </div>

        <div className="p-4 border rounded-lg shadow-sm flex flex-col">
          <button onClick={() => downloadImage(true)} className="p-2 bg-green-600 text-white rounded cursor-pointer mb-2 flex items-center">
            <Download className="mr-1" /> Download with BG
          </button>
          <button onClick={() => downloadImage(false)} className="p-2 bg-blue-600 text-white rounded mb-2 flex cursor-pointer items-center">
            <Download className="mr-1" /> Download Transparent
          </button>
          <label className="block mb-1">Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full p-1 border rounded mb-2">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
          <label className="block mb-1">Max File Size:</label>
          <input type="number" value={fileSizeLimit} min="0" onChange={(e) => setFileSizeLimit(+e.target.value)} className="w-full p-1 border rounded mb-1" />
          <select value={fileSizeUnit} onChange={(e) => setFileSizeUnit(e.target.value)} className="w-full p-1 border rounded">
            <option value="KB">KB</option>
            <option value="MB">MB</option>
          </select>
        </div>
      </div>
    </div>
  );
}
