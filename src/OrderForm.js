import React, { useState } from 'react';

const OrderForm = () => {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  const [step, setStep] = useState(1);

  //метод для перехода на следующий шаг
  const handleNextStep = () => {
    if (validateInputs()) {
        setStep(step + 1);
      }
  };
//метод для возвращения на предыдующий шаг
  const handlePrevStep = () => {
    setStep(step - 1);
  };
//метод для сохранения введенных данных в базу данных
  const sendOrderToAPI = async () => {
    //валидации на введенные данные
    if (validateInputs()) {
        try {
            const response = await fetch('http://localhost:8080/api/v1/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                productName,
                productQuantity,
                amountPaid,
              }),
            });
      
          
            if (response.ok) {
              console.log('Order successfully submitted to the API!');
              setStep(3);
            } else {
              console.error('Failed to submit order to the API');
            }
          } catch (error) {
            console.error('An error occurred while sending the order to the API:', error);
          }
    }
    
  };
  //метод логиги валидации
  const validateInputs = () => {
    //имя продукта не должно быть пустым
    if (!productName.trim()) {
      alert('Please enter a product name');
      return false;
    }
    //значения количество продукта не должно быть негативным числом или 0
    if (productQuantity <= 0 || isNaN(productQuantity)) {
      alert('Please enter a valid product quantity. It must be positive number and more than 0!');
      return false;
    }
    //значения оплаченная сумма не должно быть негативным числом или 0
    if (amountPaid <= 0 || isNaN(amountPaid)) {
      alert('Please enter a valid amount paid. It must be positive number and more than 0!');
      return false;
    }

    return true;
  };
  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Page 1: Entering order details</h2>
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Product Quantity:
            <input
              type="text"
              value={productQuantity}
              onChange={(e) => setProductQuantity(parseInt(e.target.value) || 0)}
            />
          </label>
          <br />
          <label>
            Amount paid:
            <input
              type="text"
              value={amountPaid}
              onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
            />
          </label>
          <br />
          <button onClick={handleNextStep}>Create an order</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Page 2: Control of the entered details and confirmation</h2>
          <p>Product Name: {productName}</p>
          <p>Product Quantity: {productQuantity}</p>
          <p>Amount paid: {amountPaid}</p>
          <button onClick={handlePrevStep}>Edit details</button>
          <button onClick={sendOrderToAPI}>Order confirmation</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Page 3: View the details of the registered order</h2>
          <p>Product Name: {productName}</p>
          <p>Product Quantity: {productQuantity}</p>
          <p>Amount paid: {amountPaid}</p>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
