




























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
  const [items, setItems] = useState([
    { name: "", price: 0, qty: 0, discount: 0 },
  ]);
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

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-1 md:p-2 lg:p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`rounded-2xl shadow-xl p-3 md:p-5 lg:p-7 max-w-4xl w-full border ${
          darkMode ? "bg-gray-800/90 backdrop-blur-sm border-gray-700" : "bg-white/90 backdrop-blur-sm border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Billing System ARAFAT-LTD
          </h2>
        </div>

        {/* Customer Name */}
        <div className="mb-6">
          <label className="block font-bold text-lg mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
            Customer Name
          </label>
          <input
            type="text"
            placeholder="Enter customer full name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl border-0 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 text-lg font-medium shadow-lg hover:shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 backdrop-blur-sm ${
              darkMode
                ? "text-white placeholder-gray-400"
                : "text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        {/* Customer Phone */}
        <div className="mb-6">
          <label className="block font-bold text-lg mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
            Customer Phone Number
          </label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl border-0 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 text-lg font-medium shadow-lg hover:shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 backdrop-blur-sm ${
              darkMode
                ? "text-white placeholder-gray-400"
                : "text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        {/* Invoice No & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-bold text-lg mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
              Invoice No
            </label>
            <input
              type="text"
              placeholder="INV-2025-001"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-0 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 text-lg font-medium shadow-lg hover:shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 backdrop-blur-sm ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          <div>
            <label className="block font-bold text-lg mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-0 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 text-lg font-medium shadow-lg hover:shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 backdrop-blur-sm ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Items Input */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white tracking-wide">Items List</h3>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 p-6 bg-gradient-to-br from-orange-50/70 to-yellow-50/50 dark:from-gray-800/70 dark:to-gray-900/50 rounded-3xl shadow-xl hover:shadow-2xl border border-orange-200/50 dark:border-orange-800/30 backdrop-blur-sm">
              <div className="flex-1 min-w-[160px]">
                <label className="block font-bold text-sm mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Product/Service name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className={`w-full px-5 py-3 rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 text-base font-medium shadow-md hover:shadow-lg focus:shadow-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-400/30 transition-all duration-200 backdrop-blur-sm ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-[100px]">
                <label className="block font-bold text-sm mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
                  Qty
                </label>
                <input
                  type="number"
                  placeholder="1"
                  value={item.qty === 0 ? "" : item.qty}
                  onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                  className={`w-full px-5 py-3 rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 text-base font-medium shadow-md hover:shadow-lg focus:shadow-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-400/30 transition-all duration-200 backdrop-blur-sm ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-[100px]">
                <label className="block font-bold text-sm mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
                  Price (Tk)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={item.price === 0 ? "" : item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className={`w-full px-5 py-3 rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 text-base font-medium shadow-md hover:shadow-lg focus:shadow-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-400/30 transition-all duration-200 backdrop-blur-sm ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-[110px]">
                <label className="block font-bold text-sm mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
                  Discount %
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={item.discount === 0 ? "" : item.discount}
                  onChange={(e) =>
                    handleItemChange(index, "discount", e.target.value)
                  }
                  className={`w-full px-5 py-3 rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 text-base font-medium shadow-md hover:shadow-lg focus:shadow-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-400/30 transition-all duration-200 backdrop-blur-sm ${
                    darkMode
                      ? "text-white placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="col-span-1 md:col-span-4 lg:col-span-1">
                <button
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="w-full text-sm h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-200 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {items.length === 1 ? "Required" : "Remove Item"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-2xl mb-8 w-full font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-0 active:scale-95"
        >
          ➕ Add New Item
        </button>

        {/* VAT Input */}
        <div className="mb-8">
          <label className="block font-bold text-lg mb-3 text-gray-700 dark:text-gray-200 tracking-wide">
            VAT Rate (%)
          </label>
          <input
            type="number"
            placeholder="vat%"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl border-0 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 text-lg font-medium shadow-lg hover:shadow-xl focus:shadow-2xl focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 backdrop-blur-sm ${
              darkMode
                ? "text-white placeholder-gray-400"
                : "text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        {/* Generate Bill Button & Warranty Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setShowBill(true)}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-5 rounded-2xl w-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-0 active:scale-95 h-20 flex items-center justify-center"
          >
            🎫 Generate Bill
          </button>
          <label className="flex items-center h-20 p-5 border-2 border-dashed border-orange-300 dark:border-orange-600 rounded-2xl bg-gradient-to-r from-orange-50/50 to-yellow-50/30 dark:from-orange-900/30 dark:to-yellow-900/20 backdrop-blur-sm cursor-pointer hover:border-orange-400 hover:shadow-xl transition-all duration-200 group">
            <input
              type="checkbox"
              checked={warranty}
              onChange={(e) => setWarranty(e.target.checked)}
              className="h-6 w-6 text-orange-500 border-2 border-orange-400 rounded-xl focus:ring-orange-500 focus:ring-2 shadow-lg mr-4 transition-all duration-200 group-hover:scale-110"
            />
            <span className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
              Include Warranty
            </span>
          </label>
        </div>

        {/* Bill Preview - UNCHANGED */}
        {showBill && (
          <div
            className={`rounded-2xl p-8 border-2 ${
              darkMode
                ? "bg-gray-800 border-gray-700 shadow-2xl"
                : "bg-white border-gray-200 shadow-2xl"
            }`}
          >
            <div className="flex justify-center mb-6">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-16 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold text-orange-500 text-center mb-1">
              Company Name
            </h3>
            <p className="text-center text-gray-500 mb-8">www.arafat-tech.LTD.com</p>
            <hr className="my-6 border-gray-300" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
              <div>
                <strong className="text-gray-900 dark:text-white">Customer:</strong> {customer || "-"}
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">Phone:</strong> {customerPhone || "-"}
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">Invoice:</strong> {invoiceNo}
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">Date:</strong> {date}
              </div>
            </div>

            <ul className="list-none mb-8">
              {items.map((item, index) => {
                const subtotal = item.qty * item.price;
                const discount = (item.discount / 100) * subtotal || 0;
                const total = (subtotal - discount).toFixed(2);
                return (
                  <li
                    key={index}
                    className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-4 transition-all duration-200"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.name || "-"} × {item.qty}
                      </div>
                      <small className="text-gray-500 dark:text-gray-400">
                        Price: {item.price} Tk, Discount: {item.discount}%
                      </small>
                    </div>
                    <div className="font-bold text-lg text-orange-600 dark:text-orange-400">
                      {total} Tk
                    </div>
                  </li>
                );
              })}
            </ul>

            <hr className="my-6 border-gray-300" />
            <div className="space-y-2 text-right mb-8">
              <p className="text-lg">
                <span className="text-gray-700 dark:text-gray-300">Subtotal:</span> {getTotal()} Tk
              </p>
              <p className="text-lg">
                <span className="text-gray-700 dark:text-gray-300">VAT ({vatRate}%):</span> {getVAT()} Tk
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                Grand Total: {getGrandTotal()} Tk
              </p>
            </div>

            {warranty && (
              <div
                className={`mt-6 p-6 rounded-xl border-2 shadow-lg ${
                  darkMode
                    ? "bg-yellow-900/50 border-yellow-700"
                    : "bg-yellow-50 border-yellow-300"
                }`}
              >
                <strong className="block mb-4 text-lg font-bold text-yellow-900 dark:text-yellow-300">
                  Warranty Claim Instructions:
                </strong>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-800 dark:text-gray-200">
                    Please retain this invoice as proof of purchase for warranty service.
                  </li>
                  <li className="text-gray-800 dark:text-gray-200">
                    The warranty is valid for 6 months from the purchase date.
                  </li>
                  <li className="text-gray-800 dark:text-gray-200">
                    It covers only manufacturer defects and not physical or water damage.
                  </li>
                  <li className="text-gray-800 dark:text-gray-200">
                    Any tampering or unauthorized repairs will void the warranty.
                  </li>
                  <li className="text-gray-800 dark:text-gray-200">
                    To claim warranty, visit our service center with this receipt and the original product.
                  </li>
                </ul>
              </div>
            )}

            <div className="flex mx-auto justify-between mt-8 text-sm">
              <div className="text-center">
                <div className="border-b-2 border-gray-400 w-32 mx-auto mb-2"></div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Customer Signature</span>
              </div>
              <div className="text-center">
                <div className="border-b-2 border-gray-400 w-32 mx-auto mb-2"></div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Authorized Signature</span>
              </div>
            </div>

            <button
              onClick={downloadReceipt}
              className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl w-full font-bold text-lg shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-200 border border-blue-500/30"
            >
              💾 Download PDF Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
