// import React, { useState, useEffect } from "react";



// import jsPDF from "jspdf";
// import companyLogo from "../assets/arafattech.png";

// const Billing = () => {
//   const [darkMode] = useState(false);
//   const [customer, setCustomer] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [invoiceNo, setInvoiceNo] = useState("");
//   const [date, setDate] = useState("");
//   const [vatRate, setVatRate] = useState(""); // Initialize as empty string for placeholder
//   const [items, setItems] = useState([{ name: "", price: 0, discount: 0 }]);
//   const [showBill, setShowBill] = useState(false);
//   const [warranty, setWarranty] = useState(false);

//   useEffect(() => {
//     setDate(new Date().toISOString().slice(0, 10));
//   }, []);

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     if (field === "qty")
//       newItems[index][field] = Math.max(0, parseInt(value) || 0);
//     else if (field === "discount")
//       newItems[index][field] = Math.min(
//         100,
//         Math.max(0, parseFloat(value) || 0)
//       );
//     else if (field === "price") newItems[index][field] = parseFloat(value) || 0;
//     else newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const addItem = () =>
//     setItems([...items, { name: "", price: 0, discount: 0 }]);
//   const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

//   const getTotal = () =>
//     items
//       .reduce((sum, item) => {
//         const subtotal = item.qty * item.price;
//         const discount = (item.discount / 100) * subtotal || 0;
//         return sum + (subtotal - discount);
//       }, 0)
//       .toFixed(2);

//   const currentVatRate = parseFloat(vatRate) || 0;

//   const getVAT = () =>
//     ((parseFloat(getTotal()) * currentVatRate) / 100).toFixed(2);
//   const getGrandTotal = () =>
//     (parseFloat(getTotal()) + parseFloat(getVAT())).toFixed(2);

//   const downloadReceipt = () => {
//     const pdf = new jsPDF();
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const margin = 10;
//     const centerX = pageWidth / 2;

//     // Add Logo
//     const imgWidth = 25;
//     const imgHeight = 25;
//     const imgY = 8;
//     const imgX = centerX - imgWidth / 2;
//     pdf.addImage(companyLogo, "PNG", imgX, imgY, imgWidth, imgHeight);

//     // Company Name & Website
//     const titleY = imgY + imgHeight + 4;
//     pdf.setFontSize(16);
//     pdf.setTextColor("#ea580c");
//     pdf.text("Arafat-Tech LTD", centerX, titleY, { align: "center" });

//     pdf.setFontSize(9);
//     pdf.setTextColor("#000");
//     pdf.text("www.arafat-tech.LTD.com", centerX, titleY + 6, {
//       align: "center",
//     });

//     pdf.setDrawColor(200);
//     pdf.line(margin, titleY + 10, pageWidth - margin, titleY + 10);

//     // Customer & Invoice Info
//     let y = titleY + 15;
//     pdf.setFontSize(10);
//     pdf.text(`Customer: ${customer || "-"}`, margin, y);
//     pdf.text(`Phone: ${customerPhone || "-"}`, margin, y + 6);
//     pdf.text(`Invoice No: ${invoiceNo}`, pageWidth - 70, y);
//     pdf.text(`Date: ${date}`, pageWidth - 70, y + 6);

//     // Table Headers
//     y += 15;
//     const colX = {
//       name: margin,
//       qty: pageWidth * 0.55,
//       price: pageWidth * 0.65,
//       discount: pageWidth * 0.78,
//       total: pageWidth - margin,
//     };
//     pdf.setFontSize(10);
//     pdf.text("Item", colX.name, y);
//     pdf.text("Qty", colX.qty, y);
//     pdf.text("Price", colX.price, y);
//     pdf.text("Discount %", colX.discount, y);
//     pdf.text("Total", colX.total, y, { align: "right" });

//     y += 6;
//     const lineHeight = 5;

//     // Table Items
//     items.forEach((item) => {
//       const subtotal = item.qty * item.price;
//       const discount = (item.discount / 100) * subtotal || 0;
//       const total = (subtotal - discount).toFixed(2);

//       const splitName = pdf.splitTextToSize(
//         item.name || "-",
//         colX.qty - colX.name - 2
//       );
//       splitName.forEach((line, i) => {
//         if (y > 270) {
//           pdf.addPage();
//           y = 20;
//         }
//         pdf.text(line, colX.name, y);
//         if (i === 0) {
//           pdf.text(item.qty.toString(), colX.qty, y);
//           pdf.text(item.price.toFixed(2), colX.price, y);
//           pdf.text(item.discount.toString(), colX.discount, y);
//           pdf.text(total.toString(), colX.total, y, { align: "right" });
//         }
//         y += lineHeight;
//       });
//     });

//     pdf.line(margin, y + 2, pageWidth - margin, y + 2);
//     y += 10;

//     // Totals
//     pdf.setFontSize(10);
//     pdf.text(`Subtotal: ${getTotal()} Tk`, pageWidth - margin, y, {
//       align: "right",
//     });
//     y += 6;
//     pdf.text(
//       `VAT (${currentVatRate}%): ${getVAT()} Tk`,
//       pageWidth - margin,
//       y,
//       { align: "right" }
//     );
//     y += 6;
//     pdf.setFontSize(12);
//     pdf.setTextColor("#ea580c");
//     pdf.text(`Grand Total: ${getGrandTotal()} Tk`, pageWidth - margin, y, {
//       align: "right",
//     });

//     // Warranty
//     if (warranty) {
//       y += 15;
//       pdf.setFontSize(10);
//       pdf.setTextColor("#92400e");
//       pdf.setFillColor(255, 249, 195);
//       pdf.rect(margin, y, pageWidth - margin * 2, 38, "F");
//       pdf.setTextColor("#000");
//       pdf.setFontSize(10);
//       const warrantyLines = [
//         "Warranty Claim Instructions:",
//         "1. Please retain this invoice as proof of purchase for warranty service.",
//         "2. The warranty is valid for 6 months from the purchase date.",
//         "3. It covers only manufacturer defects and not physical or water damage.",
//         "4. Any tampering or unauthorized repairs will void the warranty.",
//         "5. To claim warranty, visit our service center with this receipt and the original product.",
//       ];
//       warrantyLines.forEach((line, i) =>
//         pdf.text(line, margin + 2, y + 6 + i * 5)
//       );
//       y += warrantyLines.length * 5 + 4;
//     }

//    // Calculate position for bottom signatures
// const signatureY = pageHeight - 40; // 40 units above the bottom

// // Signatures
// pdf.setFontSize(10);
// pdf.setTextColor("#000");
// pdf.text("Customer Signature", 20, signatureY);
// pdf.text("Authorized Signature", pageWidth - 80, signatureY);
// pdf.line(20, signatureY + 2, 70, signatureY + 2);
// pdf.line(pageWidth - 80, signatureY + 2, pageWidth - 20, signatureY + 2);

//     // Footer
//     pdf.setFontSize(7);
//     pdf.setTextColor("#666");
//     pdf.setFont(undefined, "italic");
//     pdf.text("Powered by Arafat-Tech", centerX, pageHeight - 10, {
//       align: "center",
//     });

//     pdf.save(`${invoiceNo}_receipt.pdf`);
//   };

//   const buttonStyle = {
//     backgroundColor: "#ea580c",
//     color: "#fff",
//     cursor: "pointer",
//     padding: "12px 24px",
//     borderRadius: 12,
//     fontWeight: "bold",
//     width: "100%",
//     marginBottom: 20,
//     border: "none",
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: darkMode ? "#111827" : "#fff",
//         color: darkMode ? "#fff" : "#000",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           borderRadius: 24,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//           padding: 24,
//           maxWidth: 700,
//           width: "100%",
//           border: "1px solid #ccc",
//           backgroundColor: darkMode ? "#1f2937" : "#fff",
//           marginTop: 100,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: 20,
//           }}
//         >
//           <h2 style={{ fontSize: 28, color: "#ea580c", margin: 0 }}>
//             Billing System ARAFAT-LTD
//           </h2>
//         </div>

//         {/* Customer Name */}
//         <div style={{ marginBottom: 16 }}>
//           <label htmlFor="customerName">Customer Name</label>
//           <input
//             id="customerName"
//             type="text"
//             placeholder="Customer Name"
//             value={customer}
//             onChange={(e) => setCustomer(e.target.value)}
//             style={{
//               width: "100%",
//               padding: 12,
//               marginTop: 4,
//               borderRadius: 12,
//               border: "1px solid #ccc",
//               fontSize: 16,
//             }}
//           />
//         </div>

//         {/* Customer Phone */}
//         <div style={{ marginBottom: 16 }}>
//           <label htmlFor="customerPhone">Customer Phone Number</label>
//           <input
//             id="customerPhone"
//             type="number"
//             placeholder="Customer Phone Number"
//             value={customerPhone}
//             onChange={(e) => setCustomerPhone(e.target.value)}
//             style={{
//               width: "100%",
//               padding: 12,
//               marginTop: 4,
//               borderRadius: 12,
//               border: "1px solid #ccc",
//               fontSize: 16,
//             }}
//           />
//         </div>

//         {/* Invoice No & Date */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
//             gap: 10,
//             marginBottom: 16,
//           }}
//         >
//           <div>
//             <label htmlFor="invoiceNo">Invoice No</label>
//             <input
//               id="invoiceNo"
//               type="text"
//               placeholder="Invoice No"
//               value={invoiceNo}
//               onChange={(e) => setInvoiceNo(e.target.value)}
//               style={{
//                 padding: 12,
//                 marginTop: 4,
//                 borderRadius: 12,
//                 border: "1px solid #ccc",
//                 backgroundColor: "#f3f4f6",
//                 fontSize: 16,
//                 width: "100%",
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="invoiceDate">Date</label>
//             <input
//               id="invoiceDate"
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               style={{
//                 padding: 12,
//                 marginTop: 4,
//                 borderRadius: 12,
//                 border: "1px solid #ccc",
//                 fontSize: 16,
//                 width: "100%",
//               }}
//             />
//           </div>
//         </div>

//         {/* Items Input */}
//         {items.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               gap: 12,
//               marginBottom: 12,
//               alignItems: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             <div style={{ flex: "1 1 40%" }}>
//               <label htmlFor={`itemName-${index}`}>Item Name</label>
//               <input
//                 id={`itemName-${index}`}
//                 type="text"
//                 placeholder="Item Name"
//                 value={item.name}
//                 onChange={(e) =>
//                   handleItemChange(index, "name", e.target.value)
//                 }
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   marginTop: 4,
//                   borderRadius: 12,
//                   border: "1px solid #ccc",
//                   fontSize: 16,
//                 }}
//               />
//             </div>
//             <div style={{ flex: "1 1 15%" }}>
//               <label htmlFor={`itemQty-${index}`}>Qty</label>
//               <input
//                 id={`itemQty-${index}`}
//                 type="number"
//                 placeholder="Qty"
//                 value={item.qty === 0 ? "" : item.qty}
//                 onChange={(e) => handleItemChange(index, "qty", e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   marginTop: 4,
//                   borderRadius: 12,
//                   border: "1px solid #ccc",
//                   fontSize: 16,
//                 }}
//               />
//             </div>
//             <div style={{ flex: "1 1 20%" }}>
//               <label htmlFor={`itemPrice-${index}`}>Price</label>
//               <input
//                 id={`itemPrice-${index}`}
//                 type="number"
//                 placeholder="Price"
//                 value={item.price === 0 ? "" : item.price}
//                 onChange={(e) =>
//                   handleItemChange(index, "price", e.target.value)
//                 }
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   marginTop: 4,
//                   borderRadius: 12,
//                   border: "1px solid #ccc",
//                   fontSize: 16,
//                 }}
//               />
//             </div>
//             <div style={{ flex: "1 1 20%" }}>
//               <label htmlFor={`itemDiscount-${index}`}>Discount %</label>
//               <input
//                 id={`itemDiscount-${index}`}
//                 type="number"
//                 placeholder="Discount %"
//                 value={item.discount === 0 ? "" : item.discount}
//                 onChange={(e) =>
//                   handleItemChange(index, "discount", e.target.value)
//                 }
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   marginTop: 4,
//                   borderRadius: 12,
//                   border: "1px solid #ccc",
//                   fontSize: 16,
//                 }}
//               />
//             </div>
//             <button
//               onClick={() => removeItem(index)}
//               style={{
//                 fontSize: 24,
//                 color: "red",
//                 background: "transparent",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//             >
//               &times;
//             </button>
//           </div>
//         ))}

//         {/* Add Item Button */}
//         <button onClick={addItem} style={buttonStyle}>
//           + Add Item
//         </button>

//         {/* VAT Input with placeholder */}
//         <div style={{ marginBottom: 15 }}>
//           <label htmlFor="vatRate">VAT (%)</label>
//           <input
//             id="vatRate"
//             type="number"
//             placeholder="VAT (%)"
//             value={vatRate}
//             onChange={(e) => setVatRate(e.target.value)}
//             style={{
//               width: "100%",
//               padding: 12,
//               marginTop: 4,
//               borderRadius: 12,
//               border: "1px solid #ccc",
//               fontSize: 16,
//             }}
//           />
//         </div>

//         {/* Generate Bill Button & Warranty Checkbox */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
//             gap: 10,
//             marginBottom: 16,
//           }}
//         >
//           <button onClick={() => setShowBill(true)} style={buttonStyle}>
//             Generate Bill
//           </button>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               border: "1px solid #ccc",
//               borderRadius: 12,
//               padding: "12px 16px",
//             }}
//           >
//             <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <input
//                 type="checkbox"
//                 checked={warranty}
//                 onChange={(e) => setWarranty(e.target.checked)}
//               />
//               Include Warranty Claim Instructions
//             </label>
//           </div>
//         </div>

//         {/* Bill Preview / Download */}

//         {showBill && (
//           <div
//             style={{
//               backgroundColor: darkMode ? "#111827" : "#fff",
//               color: darkMode ? "#fff" : "#000",
//               border: "1px solid #ccc",
//               borderRadius: 16,
//               padding: 24,
//               width: "100%",
//               maxWidth: 600,
//               marginTop: 24,
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: darkMode ? "#111827" : "#fff",
//                 color: darkMode ? "#fff" : "#000",
//                 border: "1px solid #ccc",
//                 borderRadius: 16,
//                 padding: 24,
//                 width: "100%",
//                 maxWidth: 600,
//                 marginTop: 24,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <div style={{ marginBottom: 12 }}>
//                 <img
//                   src={companyLogo}
//                   alt="Company Logo"
//                   style={{ width: 60, height: 60, objectFit: "contain" }}
//                 />
//               </div>
//               <h3 style={{ fontSize: "1.5rem", color: "#ea580c", margin: 0 }}>
//                 Company Name
//               </h3>
//               <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
//                 www.arafat-tech.LTD.com
//               </p>
//               <hr style={{ margin: "16px 0", borderColor: "#ccc" }} />
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontSize: 12,
//                 marginBottom: 16,
//                 flexWrap: "wrap",
//                 gap: 12,
//               }}
//             >
//               <div>
//                 <strong>Customer:</strong> {customer || "-"}
//               </div>
//               <div>
//                 <strong>Phone:</strong> {customerPhone || "-"}
//               </div>
//               <div>
//                 <strong>Invoice:</strong> {invoiceNo}
//               </div>
//               <div>
//                 <strong>Date:</strong> {date}
//               </div>
//             </div>

//             <ul style={{ paddingLeft: 0, listStyle: "none", fontSize: 14 }}>
//               {items.map((item, index) => {
//                 const subtotal = item.qty * item.price;
//                 const discount = (item.discount / 100) * subtotal || 0;
//                 const total = (subtotal - discount).toFixed(2);
//                 return (
//                   <li
//                     key={index}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: 8,
//                     }}
//                   >
//                     <span>
//                       {item.name || "-"} x {item.qty} <br />
//                       <small>
//                         Price: {item.price} Tk, Discount: {item.discount}%
//                       </small>
//                     </span>
//                     <span>{total} Tk</span>
//                   </li>
//                 );
//               })}
//             </ul>

//             <hr style={{ margin: "16px 0", borderColor: "#ccc" }} />
//             <p style={{ textAlign: "right" }}>Subtotal: {getTotal()} Tk</p>
//             <p style={{ textAlign: "right" }}>
//               VAT ({vatRate}%): {getVAT()} Tk
//             </p>
//             <p style={{ textAlign: "right", fontWeight: "bold" }}>
//               Grand Total: {getGrandTotal()} Tk
//             </p>

//             {warranty && (
//               <div
//                 style={{
//                   marginTop: 24,
//                   padding: "12px",
//                   backgroundColor: "#fef9c3",
//                   borderRadius: 8,
//                   fontSize: 13,
//                   color: "#92400e",
//                   border: "1px solid #fde68a",
//                 }}
//               >
//                 <strong>Warranty Claim Instructions:</strong>
//                 <ul style={{ paddingLeft: 20, marginTop: 8 }}>
//                   <li>
//                     1. Please retain this invoice as proof of purchase for
//                     warranty service.
//                   </li>
//                   <li>
//                     2. The warranty is valid for 6 months from the purchase
//                     date.
//                   </li>
//                   <li>
//                     3. It covers only manufacturer defects and not physical or
//                     water damage.
//                   </li>
//                   <li>
//                     4. Any tampering or unauthorized repairs will void the
//                     warranty.
//                   </li>
//                   <li>
//                     5. To claim warranty, visit our service center with this
//                     receipt and the original product.
//                   </li>
//                 </ul>
//               </div>
//             )}

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: 40,
//                 fontSize: 12,
//                 color: "#444",
//                 flexWrap: "wrap",
//                 gap: 20,
//               }}
//             >
//               <div style={{ textAlign: "center" }}>
//                 <div
//                   style={{
//                     borderBottom: "1px solid #aaa",
//                     width: 140,
//                     margin: "0 auto 4px",
//                   }}
//                 ></div>
//                 <span>Customer Signature</span>
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 <div
//                   style={{
//                     borderBottom: "1px solid #aaa",
//                     width: 140,
//                     margin: "0 auto 4px",
//                   }}
//                 ></div>
//                 <span>Authorized Signature</span>
//               </div>
//             </div>

//             <button
//               onClick={downloadReceipt}
//               style={{
//                 marginTop: 24,
//                 padding: "12px 24px",
//                 backgroundColor: "#2563eb",
//                 color: "white",
//                 borderRadius: 12,
//                 border: "none",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 width: "100%",
//               }}
//             >
//               Download PDF
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Billing;





import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import companyLogo from "../assets/arafattech.png";

const Billing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [customer, setCustomer] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [vatRate, setVatRate] = useState("");
  const [items, setItems] = useState([{ name: "", price: 0, qty: 0, discount: 0 }]);
  const [showBill, setShowBill] = useState(false);
  const [warranty, setWarranty] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
      document.documentElement.classList.toggle("dark", e.matches);
    };

    setDarkMode(mediaQuery.matches);
    document.documentElement.classList.toggle("dark", mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "qty")
      newItems[index][field] = Math.max(0, parseInt(value) || 0);
    else if (field === "discount")
      newItems[index][field] = Math.min(
        100,
        Math.max(0, parseFloat(value) || 0)
      );
    else if (field === "price") newItems[index][field] = parseFloat(value) || 0;
    else newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () =>
    setItems([...items, { name: "", price: 0, qty: 0, discount: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const getTotal = () =>
    items
      .reduce((sum, item) => {
        const subtotal = item.qty * item.price;
        const discount = (item.discount / 100) * subtotal || 0;
        return sum + (subtotal - discount);
      }, 0)
      .toFixed(2);

  const currentVatRate = parseFloat(vatRate) || 0;

  const getVAT = () =>
    ((parseFloat(getTotal()) * currentVatRate) / 100).toFixed(2);
  const getGrandTotal = () =>
    (parseFloat(getTotal()) + parseFloat(getVAT())).toFixed(2);

  const downloadReceipt = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const centerX = pageWidth / 2;

    // Add Logo
    const imgWidth = 25;
    const imgHeight = 25;
    const imgY = 8;
    const imgX = centerX - imgWidth / 2;
    pdf.addImage(companyLogo, "PNG", imgX, imgY, imgWidth, imgHeight);

    // Company Name & Website
    const titleY = imgY + imgHeight + 4;
    pdf.setFontSize(16);
    pdf.setTextColor("#ea580c");
    pdf.text("Arafat-Tech LTD", centerX, titleY, { align: "center" });

    pdf.setFontSize(9);
    pdf.setTextColor("#000");
    pdf.text("www.arafat-tech.LTD.com", centerX, titleY + 6, {
      align: "center",
    });

    pdf.setDrawColor(200);
    pdf.line(margin, titleY + 10, pageWidth - margin, titleY + 10);

    // Customer & Invoice Info
    let y = titleY + 15;
    pdf.setFontSize(10);
    pdf.text(`Customer: ${customer || "-"}`, margin, y);
    pdf.text(`Phone: ${customerPhone || "-"}`, margin, y + 6);
    pdf.text(`Invoice No: ${invoiceNo}`, pageWidth - 70, y);
    pdf.text(`Date: ${date}`, pageWidth - 70, y + 6);

    // Table Headers
    y += 15;
    const colX = {
      name: margin,
      qty: pageWidth * 0.55,
      price: pageWidth * 0.65,
      discount: pageWidth * 0.78,
      total: pageWidth - margin,
    };
    pdf.setFontSize(10);
    pdf.text("Item", colX.name, y);
    pdf.text("Qty", colX.qty, y);
    pdf.text("Price", colX.price, y);
    pdf.text("Discount %", colX.discount, y);
    pdf.text("Total", colX.total, y, { align: "right" });

    y += 6;
    const lineHeight = 5;

    // Table Items
    items.forEach((item) => {
      const subtotal = item.qty * item.price;
      const discount = (item.discount / 100) * subtotal || 0;
      const total = (subtotal - discount).toFixed(2);

      const splitName = pdf.splitTextToSize(
        item.name || "-",
        colX.qty - colX.name - 2
      );
      splitName.forEach((line, i) => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, colX.name, y);
        if (i === 0) {
          pdf.text(item.qty.toString(), colX.qty, y);
          pdf.text(item.price.toFixed(2), colX.price, y);
          pdf.text(item.discount.toString(), colX.discount, y);
          pdf.text(total.toString(), colX.total, y, { align: "right" });
        }
        y += lineHeight;
      });
    });

    pdf.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 10;

    // Totals
    pdf.setFontSize(10);
    pdf.text(`Subtotal: ${getTotal()} Tk`, pageWidth - margin, y, {
      align: "right",
    });
    y += 6;
    pdf.text(
      `VAT (${currentVatRate}%): ${getVAT()} Tk`,
      pageWidth - margin,
      y,
      { align: "right" }
    );
    y += 6;
    pdf.setFontSize(12);
    pdf.setTextColor("#ea580c");
    pdf.text(`Grand Total: ${getGrandTotal()} Tk`, pageWidth - margin, y, {
      align: "right",
    });

    // Warranty
    if (warranty) {
      y += 15;
      pdf.setFontSize(10);
      pdf.setTextColor("#92400e");
      pdf.setFillColor(255, 249, 195);
      pdf.rect(margin, y, pageWidth - margin * 2, 38, "F");
      pdf.setTextColor("#000");
      pdf.setFontSize(10);
      const warrantyLines = [
        "Warranty Claim Instructions:",
        "1. Please retain this invoice as proof of purchase for warranty service.",
        "2. The warranty is valid for 6 months from the purchase date.",
        "3. It covers only manufacturer defects and not physical or water damage.",
        "4. Any tampering or unauthorized repairs will void the warranty.",
        "5. To claim warranty, visit our service center with this receipt and the original product.",
      ];
      warrantyLines.forEach((line, i) =>
        pdf.text(line, margin + 2, y + 6 + i * 5)
      );
      y += warrantyLines.length * 5 + 4;
    }

    // Signatures
    const signatureY = pageHeight - 40;
    pdf.setFontSize(10);
    pdf.setTextColor("#000");
    pdf.text("Customer Signature", 20, signatureY);
    pdf.text("Authorized Signature", pageWidth - 80, signatureY);
    pdf.line(20, signatureY + 2, 70, signatureY + 2);
    pdf.line(pageWidth - 80, signatureY + 2, pageWidth - 20, signatureY + 2);

    // Footer
    pdf.setFontSize(7);
    pdf.setTextColor("#666");
    pdf.setFont(undefined, "italic");
    pdf.text("Powered by Arafat-Tech", centerX, pageHeight - 10, {
      align: "center",
    });

    pdf.save(`${invoiceNo}_receipt.pdf`);
  };

  const buttonStyle = {
    backgroundColor: "#ea580c",
    color: "#fff",
    cursor: "pointer",
    padding: "12px 24px",
    borderRadius: 12,
    fontWeight: "bold",
    width: "100%",
    marginBottom: 20,
    border: "none",
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`rounded-2xl shadow-lg p-6 max-w-3xl w-full border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-500">Billing System ARAFAT-LTD</h2>
        </div>

        {/* Customer Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Customer Name</label>
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        {/* Customer Phone */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Customer Phone Number</label>
          <input
            type="number"
            placeholder="Customer Phone Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        {/* Invoice No & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Invoice No</label>
            <input
              type="text"
              placeholder="Invoice No"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>
        </div>

        {/* Items Input */}
        {items.map((item, index) => (
          <div key={index} className="flex flex-wrap gap-2 mb-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Item Name</label>
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Qty</label>
              <input
                type="number"
                placeholder="Qty"
                value={item.qty === 0 ? "" : item.qty}
                onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={item.price === 0 ? "" : item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Discount %</label>
              <input
                type="number"
                placeholder="Discount %"
                value={item.discount === 0 ? "" : item.discount}
                onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 font-bold text-xl"
            >
              &times;
            </button>
          </div>
        ))}

        <button onClick={addItem} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg mb-4 w-full">
          + Add Item
        </button>

        {/* VAT Input */}
        <div className="mb-4">
          <label className="block font-medium mb-1">VAT (%)</label>
          <input
            type="number"
            placeholder="VAT (%)"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        {/* Generate Bill Button & Warranty Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setShowBill(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Generate Bill
          </button>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={warranty}
                onChange={(e) => setWarranty(e.target.checked)}
                className="h-4 w-4"
              />
              Include Warranty Claim Instructions
            </label>
          </div>
        </div>

        {/* Bill Preview */}
        {showBill && (
          <div className={`rounded-xl p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <div className="flex justify-center mb-4">
              <img src={companyLogo} alt="Company Logo" className="h-16 w-auto" />
            </div>
            <h3 className="text-xl font-bold text-orange-500 text-center">Company Name</h3>
            <p className="text-center text-gray-500">www.arafat-tech.LTD.com</p>
            <hr className="my-4 border-gray-300" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
              <div><strong>Customer:</strong> {customer || "-"}</div>
              <div><strong>Phone:</strong> {customerPhone || "-"}</div>
              <div><strong>Invoice:</strong> {invoiceNo}</div>
              <div><strong>Date:</strong> {date}</div>
            </div>

            <ul className="list-none mb-4">
              {items.map((item, index) => {
                const subtotal = item.qty * item.price;
                const discount = (item.discount / 100) * subtotal || 0;
                const total = (subtotal - discount).toFixed(2);
                return (
                  <li key={index} className="flex justify-between py-1 border-b border-gray-200">
                    <div>
                      {item.name || "-"} x {item.qty} <br />
                      <small>Price: {item.price} Tk, Discount: {item.discount}%</small>
                    </div>
                    <div>{total} Tk</div>
                  </li>
                );
              })}
            </ul>

            <hr className="my-4 border-gray-300" />
            <p className="text-right">Subtotal: {getTotal()} Tk</p>
            <p className="text-right">VAT ({vatRate}%): {getVAT()} Tk</p>
            <p className="text-right font-bold">Grand Total: {getGrandTotal()} Tk</p>

       {warranty && (
  <div className={`mt-4 p-4 rounded-md border ${darkMode ? "bg-yellow-900 border-yellow-700" : "bg-yellow-100 border-yellow-300"}`}>
    <strong className="block mb-2">Warranty Claim Instructions:</strong>
    <ul className="list-disc pl-5 mt-1 space-y-1">
      <li>Please retain this invoice as proof of purchase for warranty service.</li>
      <li>The warranty is valid for 6 months from the purchase date.</li>
      <li>It covers only manufacturer defects and not physical or water damage.</li>
      <li>Any tampering or unauthorized repairs will void the warranty.</li>
      <li>To claim warranty, visit our service center with this receipt and the original product.</li>
    </ul>
  </div>
)}

            <div className="flex justify-between mt-6 text-sm">
              <div className="text-center">
                <div className="border-b border-gray-400 w-36 mx-auto"></div>
                <span>Customer Signature</span>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 w-36 mx-auto"></div>
                <span>Authorized Signature</span>
              </div>
            </div>

            <button
              onClick={downloadReceipt}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
