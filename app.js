// Monhegan Island Water Conservation Calculator

// Water usage data from application requirements
const WATER_USAGE_DATA = {
    toilet_flushing: {
        standard_per_person_daily: 18.5,
        conservation_savings_percent: 40,
        conservation_method: "If it's yellow, let it mellow"
    },
    showering: {
        standard_per_person_daily: 17.2,
        conservation_savings_percent: 30,
        conservation_method: "5-minute showers + turn off while soaping"
    },
    dishwashing: {
        standard_gallons_per_load: 22,
        conservation_gallons_per_load: 6,
        loads_per_day_base: 3,
        loads_per_additional_person: 0.3,
        conservation_savings_percent: 73,
        conservation_method: "Fill sink basin, do not let tap run; dump leftover water in yard"
    },
    bathroom_sinks: {
        standard_per_person_daily: 4.0,
        conservation_per_person_daily: 0.5,
        conservation_savings_percent: 87,
        conservation_method: "Turn off tap while brushing/soaping"
    }
};

const CONSERVATION_STRATEGIES = [
    {
        activity: "Toilets",
        strategy: "If it's yellow, let it mellow",
        description: "Skip flushing for liquid waste—safest way to cut toilet water in half",
        savings_percent: 40
    },
    {
        activity: "Showers", 
        strategy: "5 minutes max",
        description: "Consider skipping some days. Turn water off to soap/shampoo",
        savings_percent: 30
    },
    {
        activity: "Dishwashing",
        strategy: "Fill the sink",
        description: "Don't let water run. Dump remaining water in back yard, never down the drain",
        savings_percent: 73
    },
    {
        activity: "Bathroom sinks",
        strategy: "Turn off tap",
        description: "Turn off tap while brushing teeth or shaving. Just wet, brush/shave, then quick rinse",
        savings_percent: 87
    },
    {
        activity: "Laundry",
        strategy: "Washer not available",
        description: "See guide for island laundry options",
        savings_percent: 100
    },
    {
        activity: "Leaks",
        strategy: "Report immediately",
        description: "Report any running toilets, dripping faucets, or plumbing issues immediately",
        savings_percent: "Up to 200 gal/day"
    }
];

// Initialize the application
function init() {
    // Get DOM elements
    const guestSlider = document.getElementById('guestSlider');
    const daysSlider = document.getElementById('daysSlider');
    
    // Populate strategies grid
    populateStrategiesGrid();
    
    // Add multiple event listeners for better slider responsiveness
    if (guestSlider) {
        guestSlider.addEventListener('input', updateCalculations);
        guestSlider.addEventListener('change', updateCalculations);
        guestSlider.addEventListener('mouseup', updateCalculations);
        guestSlider.addEventListener('touchend', updateCalculations);
    }
    
    if (daysSlider) {
        daysSlider.addEventListener('input', updateCalculations);
        daysSlider.addEventListener('change', updateCalculations);
        daysSlider.addEventListener('mouseup', updateCalculations);
        daysSlider.addEventListener('touchend', updateCalculations);
    }
    
    // Initial calculation
    updateCalculations();
}

function updateCalculations() {
    const guestSlider = document.getElementById('guestSlider');
    const daysSlider = document.getElementById('daysSlider');
    
    if (!guestSlider || !daysSlider) return;
    
    const guests = parseInt(guestSlider.value);
    const days = parseInt(daysSlider.value);
    
    // Update slider value displays
    const guestValue = document.getElementById('guestValue');
    const daysValue = document.getElementById('daysValue');
    
    if (guestValue) guestValue.textContent = guests;
    if (daysValue) daysValue.textContent = days;
    
    // Calculate water usage for each activity
    const activities = calculateWaterUsage(guests, days);
    
    // Update the main table
    updateUsageTable(activities);
    
    // Update overview section
    updateOverview(activities, days);
}

function calculateWaterUsage(guests, days) {
    const activities = [];
    
    // Toilet flushing
    const toiletStandard = WATER_USAGE_DATA.toilet_flushing.standard_per_person_daily * guests;
    const toiletConservation = toiletStandard * (1 - WATER_USAGE_DATA.toilet_flushing.conservation_savings_percent / 100);
    activities.push({
        name: "Toilet flushing",
        standard: toiletStandard,
        conservation: toiletConservation,
        savings: toiletStandard - toiletConservation,
        method: WATER_USAGE_DATA.toilet_flushing.conservation_method
    });
    
    // Showering
    const showerStandard = WATER_USAGE_DATA.showering.standard_per_person_daily * guests;
    const showerConservation = showerStandard * (1 - WATER_USAGE_DATA.showering.conservation_savings_percent / 100);
    activities.push({
        name: "Showering",
        standard: showerStandard,
        conservation: showerConservation,
        savings: showerStandard - showerConservation,
        method: WATER_USAGE_DATA.showering.conservation_method
    });
    
    // Dishwashing
    const loads = WATER_USAGE_DATA.dishwashing.loads_per_day_base + 
                 (guests > 1 ? (guests - 1) * WATER_USAGE_DATA.dishwashing.loads_per_additional_person : 0);
    const dishStandard = loads * WATER_USAGE_DATA.dishwashing.standard_gallons_per_load;
    const dishConservation = loads * WATER_USAGE_DATA.dishwashing.conservation_gallons_per_load;
    activities.push({
        name: "Dishwashing",
        standard: dishStandard,
        conservation: dishConservation,
        savings: dishStandard - dishConservation,
        method: WATER_USAGE_DATA.dishwashing.conservation_method
    });
    
    // Bathroom sinks
    const sinkStandard = WATER_USAGE_DATA.bathroom_sinks.standard_per_person_daily * guests;
    const sinkConservation = WATER_USAGE_DATA.bathroom_sinks.conservation_per_person_daily * guests;
    activities.push({
        name: "Bathroom sinks",
        standard: sinkStandard,
        conservation: sinkConservation,
        savings: sinkStandard - sinkConservation,
        method: WATER_USAGE_DATA.bathroom_sinks.conservation_method
    });
    
    // Leftover water disposal
    activities.push({
        name: "Leftover water disposal",
        standard: 0,
        conservation: 0,
        savings: 0,
        method: "Dump leftover water (e.g., cooking water) in back yard, not down the drain"
    });
    
    return activities;
}

function updateUsageTable(activities) {
    const tableBody = document.getElementById('usageTableBody');
    const daysSlider = document.getElementById('daysSlider');
    
    if (!tableBody || !daysSlider) return;
    
    const days = parseInt(daysSlider.value);
    
    let standardTotal = 0;
    let conservationTotal = 0;
    let savingsTotal = 0;
    
    tableBody.innerHTML = '';
    
    activities.forEach(activity => {
        standardTotal += activity.standard;
        conservationTotal += activity.conservation;
        savingsTotal += activity.savings;
        
        const row = document.createElement('tr');
        
        // Determine usage level class for conservation column
        let usageClass = '';
        if (activity.conservation > 20) {
            usageClass = 'usage-high';
        } else if (activity.conservation > 10) {
            usageClass = 'usage-moderate';
        } else {
            usageClass = 'usage-low';
        }
        
        row.innerHTML = `
            <td>
                <div class="activity-name">${activity.name}</div>
            </td>
            <td>${activity.standard.toFixed(1)}</td>
            <td class="${usageClass}">${activity.conservation.toFixed(1)}</td>
            <td class="usage-low">${activity.savings.toFixed(1)}</td>
            <td>${(activity.conservation * days).toFixed(0)}</td>
            <td>
                <div class="conservation-method">${activity.method}</div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update totals
    const standardTotalEl = document.getElementById('standardTotal');
    const conservationTotalEl = document.getElementById('conservationTotal');
    const savingsTotalEl = document.getElementById('savingsTotal');
    const stayTotalEl = document.getElementById('stayTotal');
    
    if (standardTotalEl) standardTotalEl.textContent = standardTotal.toFixed(1);
    if (conservationTotalEl) conservationTotalEl.textContent = conservationTotal.toFixed(1);
    if (savingsTotalEl) savingsTotalEl.textContent = savingsTotal.toFixed(1);
    if (stayTotalEl) stayTotalEl.textContent = (conservationTotal * days).toFixed(0);
}

function updateOverview(activities, days) {
    let standardTotal = 0;
    let conservationTotal = 0;
    
    activities.forEach(activity => {
        standardTotal += activity.standard;
        conservationTotal += activity.conservation;
    });
    
    const standardStayTotal = standardTotal * days;
    const conservationStayTotal = conservationTotal * days;
    const totalSavings = standardStayTotal - conservationStayTotal;
    const savingsPercent = standardStayTotal > 0 ? ((totalSavings / standardStayTotal) * 100) : 0;
    
    // Update overview displays
    const standardUsageTotalEl = document.getElementById('standardUsageTotal');
    const conservationUsageTotalEl = document.getElementById('conservationUsageTotal');
    const totalSavingsPercentEl = document.getElementById('totalSavingsPercent');
    const totalSavingsGallonsEl = document.getElementById('totalSavingsGallons');
    
    if (standardUsageTotalEl) {
        standardUsageTotalEl.textContent = `${Math.round(standardStayTotal).toLocaleString()} gal`;
    }
    if (conservationUsageTotalEl) {
        conservationUsageTotalEl.textContent = `${Math.round(conservationStayTotal).toLocaleString()} gal`;
    }
    if (totalSavingsPercentEl) {
        totalSavingsPercentEl.textContent = `${Math.round(savingsPercent)}%`;
    }
    if (totalSavingsGallonsEl) {
        totalSavingsGallonsEl.textContent = `${Math.round(totalSavings).toLocaleString()} gallons saved`;
    }
}

function populateStrategiesGrid() {
    const strategiesGrid = document.getElementById('strategiesGrid');
    
    if (!strategiesGrid) return;
    
    CONSERVATION_STRATEGIES.forEach(strategy => {
        const card = document.createElement('div');
        card.className = 'strategy-card';
        
        const savingsDisplay = typeof strategy.savings_percent === 'number' 
            ? `${strategy.savings_percent}% savings`
            : strategy.savings_percent;
        
        card.innerHTML = `
            <h3>${strategy.activity}: ${strategy.strategy}</h3>
            <p>${strategy.description}</p>
            <div class="savings-badge">${savingsDisplay}</div>
        `;
        
        strategiesGrid.appendChild(card);
    });
}

// Sharing functions - Fixed implementations
function shareByEmail() {
    try {
        const guestSlider = document.getElementById('guestSlider');
        const daysSlider = document.getElementById('daysSlider');
        
        const guests = guestSlider ? parseInt(guestSlider.value) : 6;
        const days = daysSlider ? parseInt(daysSlider.value) : 7;
        
        const subject = encodeURIComponent('Monhegan Island Water Conservation Guide');
        const body = encodeURIComponent(`I'm sharing the Monhegan Island Water Conservation Calculator with you.

For ${guests} guests staying ${days} days, we can save significant water by following simple conservation practices.

Check out the full calculator: ${window.location.href}

Let's work together to protect Monhegan Island's precious water resources!`);
        
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
        
        // Create a temporary link and click it
        const tempLink = document.createElement('a');
        tempLink.href = mailtoLink;
        tempLink.target = '_blank';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
        // Show user feedback
        showNotification('Email client opened! If nothing happened, please copy the URL manually.');
        
    } catch (error) {
        console.error('Error sharing by email:', error);
        showNotification('Unable to open email client. Please copy the URL manually from your browser address bar.');
    }
}

function copyToClipboard() {
    const url = window.location.href;
    
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(url);
        });
    } else {
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showNotification('Link copied to clipboard!');
        } else {
            showNotification('Unable to copy link automatically. Please copy the URL from your browser address bar.');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showNotification('Unable to copy link. Please copy the URL manually from your browser address bar.');
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: var(--color-btn-primary-text);
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

// Enhanced print function
function printPage() {
    try {
        window.print();
    } catch (error) {
        console.error('Print error:', error);
        showNotification('Print function not available. Please use your browser\'s print option (Ctrl+P or Cmd+P).');
    }
}

// Global functions for button onclick events
window.shareByEmail = shareByEmail;
window.copyToClipboard = copyToClipboard;
window.printPage = printPage;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}