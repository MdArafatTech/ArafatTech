import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const Billing = () => {
  const [darkMode] = useState(false);
  const [customer, setCustomer] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [vatRate, setVatRate] = useState(5);
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0, discount: 0 }]);
  const [showBill, setShowBill] = useState(false);
  const [warranty, setWarranty] = useState(false);

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "qty") newItems[index][field] = Math.max(0, parseInt(value) || 0);
    else if (field === "discount")
      newItems[index][field] = Math.min(100, Math.max(0, parseFloat(value) || 0));
    else if (field === "price") newItems[index][field] = parseFloat(value) || 0;
    else newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { name: "", qty: 1, price: 0, discount: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const getTotal = () =>
    items
      .reduce((sum, item) => {
        const subtotal = item.qty * item.price;
        const discount = (item.discount / 100) * subtotal || 0;
        return sum + (subtotal - discount);
      }, 0)
      .toFixed(2);

  const getVAT = () => ((parseFloat(getTotal()) * vatRate) / 100).toFixed(2);
  const getGrandTotal = () => (parseFloat(getTotal()) + parseFloat(getVAT())).toFixed(2);

  const downloadReceipt = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const centerX = pageWidth / 2;

    pdf.setFontSize(18);
    pdf.setTextColor("#ea580c");
    pdf.text("Company Name", centerX, 20, { align: "center" });
    pdf.setFontSize(11);
    pdf.setTextColor("#000");
    pdf.text("www.arafat-tech.LTD.com", centerX, 27, { align: "center" });
    pdf.setDrawColor(200);
    pdf.line(margin, 32, pageWidth - margin, 32);

    pdf.setFontSize(12);
    pdf.text(`Customer: ${customer || "-"}`, margin, 42);
    pdf.text(`Phone: ${customerPhone || "-"}`, margin, 50);
    pdf.text(`Invoice No: ${invoiceNo}`, pageWidth - 70, 42);
    pdf.text(`Date: ${date}`, pageWidth - 70, 50);

    const colX = { name: margin, qty: pageWidth * 0.55, price: pageWidth * 0.65, discount: pageWidth * 0.78, total: pageWidth - margin };
    pdf.setFontSize(12);
    pdf.text("Item", colX.name, 65);
    pdf.text("Qty", colX.qty, 65);
    pdf.text("Price", colX.price, 65);
    pdf.text("Discount %", colX.discount, 65);
    pdf.text("Total", colX.total, 65, { align: "right" });

    let y = 72;
    const lineHeight = 6;

    items.forEach((item) => {
      const subtotal = item.qty * item.price;
      const discount = (item.discount / 100) * subtotal || 0;
      const total = (subtotal - discount).toFixed(2);
      pdf.setFontSize(11);
      const splitName = pdf.splitTextToSize(item.name || "-", colX.qty - colX.name - 2);

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
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 12;

    pdf.setFontSize(12);
    pdf.text(`Subtotal: ${getTotal()} Tk`, pageWidth - margin, y, { align: "right" });
    y += 8;
    pdf.text(`VAT (${vatRate}%): ${getVAT()} Tk`, pageWidth - margin, y, { align: "right" });
    y += 8;
    pdf.setFontSize(14);
    pdf.setTextColor("#ea580c");
    pdf.text(`Grand Total: ${getGrandTotal()} Tk`, pageWidth - margin, y, { align: "right" });

    if (warranty) {
      y += 20;
      pdf.setFontSize(12);
      pdf.setTextColor("#92400e");
      pdf.setFillColor(255, 249, 195);
      pdf.rect(margin, y, pageWidth - margin * 2, 38, "F");

      pdf.setTextColor("#000");
      pdf.setFontSize(11);
      const warrantyLines = [
        "Warranty Claim Instructions:",
        "1. Please retain this invoice as proof of purchase for warranty service.",
        "2. The warranty is valid for 6 months from the purchase date.",
        "3. It covers only manufacturer defects and not physical or water damage.",
        "4. Any tampering or unauthorized repairs will void the warranty.",
        "5. To claim warranty, visit our service center with this receipt and the original product.",
      ];
      warrantyLines.forEach((line, i) => pdf.text(line, margin + 2, y + 6 + i * 6));
      y += warrantyLines.length * 6 + 4;
    }

    y += 20;
    pdf.setFontSize(12);
    pdf.setTextColor("#000");
    pdf.text("Customer Signature", 20, y);
    pdf.text("Authorized Signature", pageWidth - 80, y);
    pdf.line(20, y + 2, 70, y + 2);
    pdf.line(pageWidth - 80, y + 2, pageWidth - 20, y + 2);

    pdf.setFontSize(10);
    pdf.setTextColor("#666");
    pdf.setFont(undefined, "italic");
    pdf.text("Powered by Arafat-Tech", pageWidth / 2, pageHeight - 10, { align: "center" });

    pdf.save(`${invoiceNo}_receipt.pdf`);

    setCustomer("");
    setCustomerPhone("");
    setVatRate(5);
    setItems([{ name: "", qty: 1, price: 0, discount: 0 }]);
    setInvoiceNo("INV-" + Math.floor(1000 + Math.random() * 9000));
    setDate(new Date().toISOString().slice(0, 10));
    setShowBill(false);
  };

  const buttonStyle = { backgroundColor: "#ea580c", color: "#fff", cursor: "pointer", padding: "12px 24px", borderRadius: 12, fontWeight: "bold", width: "100%", marginBottom: 20, border: "none" };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: darkMode ? "#111827" : "#fff", color: darkMode ? "#fff" : "#000", display: "flex", justifyContent: "center", alignItems: "center", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div style={{ borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", padding: 24, maxWidth: 700, width: "100%", border: "1px solid #ccc", backgroundColor: darkMode ? "#1f2937" : "#fff", marginTop: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 28, color: "#ea580c", margin: 0 }}>Billing System ARAFAT-LTD</h2>
        </div>

        <input type="text" placeholder="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 16, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />
        <input type="number" placeholder="Customer Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 16, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 10, marginBottom: 16 }}>
          <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="Invoice No" style={{ padding: 12, borderRadius: 12, border: "1px solid #ccc", backgroundColor: "#f3f4f6", fontSize: 16 }} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: 12, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />
        </div>

        {items.map((item, index) => (
          <div key={index} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input type="text" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} style={{ flex: "1 1 40%", padding: 10, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />
            <input type="number" placeholder="Qty" value={item.qty === 0 ? "" : item.qty} onChange={(e) => handleItemChange(index, "qty", e.target.value)} style={{ flex: "1 1 15%", padding: 10, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />
            <input type="number" placeholder="Price" value={item.price === 0 ? "" : item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} style={{ flex: "1 1 20%", padding: 10, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />
            <input type="number" placeholder="Discount %" value={item.discount === 0 ? "" : item.discount} onChange={(e) => handleItemChange(index, "discount", e.target.value)} style={{ flex: "1 1 20%", padding: 10, borderRadius: 12, border: "1px solid #ccc", fontSize: 16 }} />
            <button onClick={() => removeItem(index)} style={{ fontSize: 24, color: "red", background: "transparent", border: "none", cursor: "pointer" }}>&times;</button>
          </div>
        ))}

        <button onClick={addItem} style={buttonStyle}>+ Add Item</button>

        <input type="number" placeholder="VAT (%)" value={vatRate} onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ccc", fontSize: 16, marginBottom: 15 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 10, marginBottom: 16 }}>
          <button onClick={() => setShowBill(true)} style={buttonStyle}>Generate Bill</button>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: 12, padding: "12px 16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={warranty} onChange={(e) => setWarranty(e.target.checked)} /> Include Warranty Claim Instructions
            </label>
          </div>
        </div>

        {showBill && (
          <div style={{ backgroundColor: darkMode ? "#111827" : "#fff", color: darkMode ? "#fff" : "#000", border: "1px solid #ccc", borderRadius: 16, padding: 24, width: "100%", maxWidth: 600, marginTop: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ea580c", margin: 0 }}>Company Name</h3>
              <p style={{ fontSize: 12, color: "#666", margin: 0 }}>www.arafat-tech.LTD.com</p>
              <hr style={{ margin: "16px 0", borderColor: "#ccc" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <div><strong>Customer:</strong> {customer || "-"}</div>
              <div><strong>Phone:</strong> {customerPhone || "-"}</div>
              <div><strong>Invoice:</strong> {invoiceNo}</div>
              <div><strong>Date:</strong> {date}</div>
            </div>

            <ul style={{ paddingLeft: 0, listStyle: "none", fontSize: 14 }}>
              {items.map((item, index) => {
                const subtotal = item.qty * item.price;
                const discount = (item.discount / 100) * subtotal || 0;
                const total = (subtotal - discount).toFixed(2);
                return (
                  <li key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>{item.name || "-"} x {item.qty} <br /><small>Price: {item.price} Tk, Discount: {item.discount}%</small></span>
                    <span>{total} Tk</span>
                  </li>
                );
              })}
            </ul>

            <hr style={{ margin: "16px 0", borderColor: "#ccc" }} />
            <p style={{ textAlign: "right" }}>Subtotal: {getTotal()} Tk</p>
            <p style={{ textAlign: "right" }}>VAT ({vatRate}%): {getVAT()} Tk</p>
            <p style={{ textAlign: "right", fontWeight: "bold" }}>Grand Total: {getGrandTotal()} Tk</p>

            {warranty && (
              <div style={{ marginTop: 24, padding: "12px", backgroundColor: "#fef9c3", borderRadius: 8, fontSize: 13, color: "#92400e", border: "1px solid #fde68a" }}>
                <strong>Warranty Claim Instructions:</strong>
                <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                  <li>1. Please retain this invoice as proof of purchase for warranty service.</li>
                  <li>2. The warranty is valid for 6 months from the purchase date.</li>
                  <li>3. It covers only manufacturer defects and not physical or water damage.</li>
                  <li>4. Any tampering or unauthorized repairs will void the warranty.</li>
                  <li>5. To claim warranty, visit our service center with this receipt and the original product.</li>
                </ul>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, fontSize: 12, color: "#444", flexWrap: "wrap", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderBottom: "1px solid #aaa", width: 140, margin: "0 auto 4px" }}></div>
                <span>Customer Signature</span>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderBottom: "1px solid #aaa", width: 140, margin: "0 auto 4px" }}></div>
                <span>Authorized Signature</span>
              </div>
            </div>

            <button onClick={downloadReceipt} style={{ marginTop: 24, padding: "12px 24px", backgroundColor: "#2563eb", color: "white", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: "bold", width: "100%" }}>Download PDF</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
