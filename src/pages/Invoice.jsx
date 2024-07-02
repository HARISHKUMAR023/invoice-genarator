// src/Invoice.js
import  { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import Resizer from 'react-image-file-resizer';
import logodef from '../assets/delfalt-logo.png';

const Invoice = () => {
    // let thislog0=
  const [invoiceData, setInvoiceData] = useState({
    logo: logodef, // Default logo URL
    companyName: 'Your Company Name',
    companyAddress: 'Your Company Address',
    companyCity: 'City, State Zip',
    companyCountry: 'India',
    invoiceNumber: 'INV-12',
    invoiceDate: '2024-07-02',
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientCountry: '',
    items: [{ description: '', quantity: 1, price: 0 }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    items[index][name] = value;
    setInvoiceData({ ...invoiceData, items });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index) => {
    const items = invoiceData.items.filter((item, i) => i !== index);
    setInvoiceData({ ...invoiceData, items });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        'PNG',
        100,
        0,
        (uri) => {
          setInvoiceData({ ...invoiceData, logo: uri });
        },
        'base64'
      );
    }
  };

  const InvoiceDocument = () => (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          {invoiceData.logo && <Image style={styles.logo} src={invoiceData.logo} />}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{invoiceData.companyName}</Text>
            <Text>{invoiceData.companyAddress}</Text>
            <Text>{invoiceData.companyCity}</Text>
            <Text>{invoiceData.companyCountry}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceLabel}>Invoice#</Text>
            <Text>{invoiceData.invoiceNumber}</Text>
            <Text style={styles.invoiceLabel}>Invoice Date</Text>
            <Text>{invoiceData.invoiceDate}</Text>
          </View>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.clientLabel}>Bill To:</Text>
          <Text>{invoiceData.clientName}</Text>
          <Text>{invoiceData.clientAddress}</Text>
          <Text>{invoiceData.clientCity}</Text>
          <Text>{invoiceData.clientCountry}</Text>
        </View>
        <View style={styles.table}>
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.quantity * item.price}</Text>
            </View>
          ))}
        </View>
        <View style={styles.total}>
          <Text>Total: ${calculateTotal()}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white my-3">
      <div className="mb-8 flex justify-between items-center">
        <div>
        <input
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        id="fileInput"
        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
      />
       <label htmlFor="fileInput" className="custom-button bg-gray-500 p-5 text-white">
        Upload Logo
      </label>
      
          {invoiceData.logo && <img src={invoiceData.logo} alt="Company Logo" className="h-16 mt-10"/>}
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={invoiceData.companyName}
            onChange={handleChange}
            className="w-full p-2  rounded mb-2"
          />
          <input
            type="text"
            name="companyAddress"
            placeholder="Company Address"
            value={invoiceData.companyAddress}
            onChange={handleChange}
            className="w-full p-2  rounded mb-2"
          />
          <input
            type="text"
            name="companyCity"
            placeholder="City, State Zip"
            value={invoiceData.companyCity}
            onChange={handleChange}
            className="w-full p-2  rounded mb-2"
          />
          <input
            type="text"
            name="companyCountry"
            placeholder="Country"
            value={invoiceData.companyCountry}
            onChange={handleChange}
            className="w-full p-2  rounded mb-2"
          />
        </div>
        <div className="text-left">
          <p className="font-bold">Invoice#</p>
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
            className="w-full p-2 rounded mb-2"
          />
          <p className="font-bold">Invoice Date</p>
          <input
            type="date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleChange}
            className="w-full p-2  rounded mb-2"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold">Bill To:</h2>
        <input
          type="text"
          name="clientName"
          placeholder="Client's Name"
          value={invoiceData.clientName}
          onChange={handleChange}
          className="w-full p-2  rounded mb-2"
        />
        <input
          type="text"
          name="clientAddress"
          placeholder="Client's Address"
          value={invoiceData.clientAddress}
          onChange={handleChange}
          className="w-full p-2  rounded mb-2"
        />
        <input
          type="text"
          name="clientCity"
          placeholder="City, State Zip"
          value={invoiceData.clientCity}
          onChange={handleChange}
          className="w-full p-2  rounded mb-2"
        />
        <input
          type="text"
          name="clientCountry"
          placeholder="Country"
          value={invoiceData.clientCountry}
          onChange={handleChange}
          className="w-full p-2  rounded mb-2"
        />
      </div>

      <div className="mb-8">
        {invoiceData.items.map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full p-2  rounded mr-2"
            />
            <input
              type="number"
              name="quantity"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="w-24 p-2  rounded mr-2"
            />
            <input
              type="number"
              name="price"
              min="0"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              className="w-24 p-2  rounded mr-2"
            />
            <button
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      <div className="mb-8 text-right">
        <h2 className="text-xl font-bold">Total: ₹{calculateTotal()}</h2>
      </div>
      <div className="mb-8 text-center">
        <h2 className="text-sm font-light">Made By Invoice Genaretor Harish</h2>
      </div>
      <PDFDownloadLink
        document={<InvoiceDocument />}
        fileName={`invoice-${invoiceData.invoiceNumber}.pdf`}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
  },
  companyInfo: {
    textAlign: 'left',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  invoiceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  clientInfo: {
    marginBottom: 20,
  },
  clientLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 5,
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
  total: {
    textAlign: 'right',
  },
});

export default Invoice;
