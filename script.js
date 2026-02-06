document.addEventListener('DOMContentLoaded', function() {
    const pricingBoxes = document.querySelectorAll('.pricing-box');
    const radioInputs = document.querySelectorAll('input[name="pricing"]');
    const totalElement = document.querySelector('.total');
    
    const prices = {
        '1': 195.00,
        '2': 345.00,
        '3': 528.00
    };

    function updateTotal(selectedValue) {
        const price = prices[selectedValue];
        totalElement.textContent = `Total: DKK ${price.toFixed(2)}`;
    }

    function expandBox(box) {
        // Collapse all other boxes
        pricingBoxes.forEach(otherBox => {
            if (otherBox !== box) {
                otherBox.classList.remove('expanded');
            }
        });
        
        // Expand the clicked box
        box.classList.add('expanded');
    }

    function selectOption(box, radioInput) {
        // Remove selected class from all boxes
        pricingBoxes.forEach(otherBox => {
            otherBox.classList.remove('selected');
        });
        
        // Add selected class to current box
        box.classList.add('selected');
        
        // Check the radio input
        radioInput.checked = true;
        
        // Update total
        updateTotal(radioInput.value);
        
        // Expand the box
        expandBox(box);
    }

    // Add click event listeners to pricing boxes
    pricingBoxes.forEach(box => {
        const radioInput = box.querySelector('input[type="radio"]');
        
        box.addEventListener('click', function(e) {
            // Prevent event bubbling from select elements
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
                return;
            }
            
            selectOption(box, radioInput);
        });
        
        // Add change event listener to radio inputs
        radioInput.addEventListener('change', function() {
            if (this.checked) {
                selectOption(box, this);
            }
        });
    });

    // Prevent select dropdowns from triggering box selection
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Set default selection (2 Pair - Most Popular)
    const defaultOption = document.querySelector('input[value="2"]');
    const defaultBox = defaultOption.closest('.pricing-box');
    selectOption(defaultBox, defaultOption);
});