document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.getElementById('order-form');
  const drinkSelect = document.getElementById('drink');
  const sizeSelect = document.getElementById('size');
  const quantityInput = document.getElementById('quantity');
  const totalPriceElement = document.getElementById('total-price');
  const orderDetailsElement = document.getElementById('order-details');
  
  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateTotal();
  });
  
  function updateSelectionDetails() {
    if (!drinkSelect.value || !sizeSelect.value) {
      orderDetailsElement.innerHTML = '<p>Select your drink and options to see the details</p>';
      return;
    }
    
    const selectedDrink = drinkSelect.options[drinkSelect.selectedIndex];
    const basePrice = parseFloat(selectedDrink.dataset.price);
    const drinkName = selectedDrink.text.split('(')[0].trim();
    
    const selectedSize = sizeSelect.options[sizeSelect.selectedIndex];
    const sizeFactor = parseFloat(selectedSize.dataset.priceFactor);
    const sizeName = selectedSize.text.split('(')[0].trim();
    
    const extrasNames = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      extrasNames.push(checkbox.nextElementSibling.textContent.split('(')[0].trim());
    });
    
    const quantity = parseInt(quantityInput.value) || 1;
    
    let detailsHTML = `
      <div class="order-selection">
        <p><strong>${quantity}x ${sizeName} ${drinkName}</strong></p>
        <p>Base price: $${(basePrice * sizeFactor).toFixed(2)}</p>
    `;
    
    if (extrasNames.length > 0) {
      detailsHTML += `<p>Extras: ${extrasNames.join(', ')}</p>`;
    }
    
    detailsHTML += `</div>`;
    
    orderDetailsElement.innerHTML = detailsHTML;
    totalPriceElement.textContent = '--.--';
  }
  
  drinkSelect.addEventListener('change', updateSelectionDetails);
  sizeSelect.addEventListener('change', updateSelectionDetails);
  quantityInput.addEventListener('change', updateSelectionDetails);
  quantityInput.addEventListener('input', updateSelectionDetails);
  
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectionDetails);
  });
  
  function calculateTotal() {

    if (!drinkSelect.value || !sizeSelect.value) {
      alert('Please select both a drink and a size');
      return;
    }
    
    const selectedDrink = drinkSelect.options[drinkSelect.selectedIndex];
    const basePrice = parseFloat(selectedDrink.dataset.price);
    const drinkName = selectedDrink.text.split('(')[0].trim();
    
    const selectedSize = sizeSelect.options[sizeSelect.selectedIndex];
    const sizeFactor = parseFloat(selectedSize.dataset.priceFactor);
    const sizeName = selectedSize.text.split('(')[0].trim();
    
    let extrasTotal = 0;
    const extrasNames = [];
    
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      extrasTotal += parseFloat(checkbox.dataset.price);
      extrasNames.push(checkbox.nextElementSibling.textContent.split('(')[0].trim());
    });
    
    const quantity = parseInt(quantityInput.value) || 1;
 
    const priceWithSize = basePrice * sizeFactor;
    const itemTotal = priceWithSize + extrasTotal;
    const orderTotal = itemTotal * quantity;
    
    let detailsHTML = `
      <div class="order-item">
        <p><strong>${quantity}x ${sizeName} ${drinkName}</strong></p>
        <p>Base price: $${priceWithSize.toFixed(2)}</p>
    `;
    
    if (extrasNames.length > 0) {
      detailsHTML += `<p>Extras: ${extrasNames.join(', ')} (+$${extrasTotal.toFixed(2)})</p>`;
    }
    
    detailsHTML += `
        <p>Item total: $${itemTotal.toFixed(2)}</p>
      </div>
    `;
    
    orderDetailsElement.innerHTML = detailsHTML;
    
    totalPriceElement.textContent = `$${orderTotal.toFixed(2)}`;
    
    totalPriceElement.classList.add('price-updated');
    setTimeout(() => {
      totalPriceElement.classList.remove('price-updated');
    }, 500);
  }

  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const headerHeight = document.querySelector('header').offsetHeight;
      
      window.scrollTo({
        top: targetSection.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    });
  });
});
  