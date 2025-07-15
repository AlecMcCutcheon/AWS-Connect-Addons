// Regex to Match the AWS Softphone Page
const SoftPhoneRegex = /^https:\/\/.*\.my\.connect\.aws\/ccp-v2.*$/;
// Regex to Match the AWS Real Time Metrics Page
const RTMetricsRegex = /^https:\/\/.*\.my\.connect\.aws\/real-time-metrics.*$/;

// Custom Code for the AWS SoftPhone Page
if (SoftPhoneRegex.test(window.location.href)) {

async function CreateStatusFunctions() {
    let UserMenu = document.querySelector('[aria-label="agent-status-dropdown"]').children;
    for (let i = 0; i < UserMenu.length; i++) {
        async function CreateDynamicFunction(StatusName) {
            return async function() {
                let UserMenu = document.querySelector('[aria-label="agent-status-dropdown"]').children;
                for (let n = 0; n < UserMenu.length; n++) {
                    if (UserMenu[n].innerHTML === StatusName) {
                        UserMenu[n].click();
                        return;
                    };
                }
                return;
            };
          }
        let FunctionName = "SetStatusTo_" + UserMenu[i].innerHTML
        let DynamicFunction = await CreateDynamicFunction(UserMenu[i].innerHTML);
        window[FunctionName] = DynamicFunction;
    }
    return;
}
async function BounceStatusMain() {

if (document.querySelector('#connectionTab-primary-status') === null) {

 async function BounceCurrentStatus() {
    await CreateStatusFunctions();
    const CurrentStatus = document.querySelector('[aria-label="agent-status-dropdown"]').children[0].innerHTML;
    if (CurrentStatus !== 'Offline') {
        await SetStatusTo_Offline();
        while ( document.querySelector('[aria-label="agent-status-dropdown"]').children[0].innerHTML !== "Offline") {
            await new Promise(r => setTimeout(r, 50));
        }
        await window['SetStatusTo_' + CurrentStatus]();
    } else {
        console.log('Current Status is Offline - Skipping Bounce');
    }
    return;
}

await BounceCurrentStatus();
document.querySelector('#BouceStatusAnchor').style.display = 'none';

} else {
    console.log('The Primary Status indicates that the agent is on a call - Skipping Bounce');
}
}

// Find the nav element with the specified class
var navElement = document.querySelector('nav.RightContainer-sc-1j7wx9d-5.iOnfHg');

// Create the anchor element
var anchorElement = document.createElement('a');
anchorElement.setAttribute('class', 'Link-sc-1j7wx9d-4 kambto');
anchorElement.setAttribute('id', 'BouceStatusAnchor');
anchorElement.style.display = 'none';

// Create the div element with the specified class
var divElement = document.createElement('div');
divElement.setAttribute('class', 'FocusWrapper-sc-1j7wx9d-3 hdBgAp');

// Create the button element
var buttonElement = document.createElement('div');
buttonElement.setAttribute('class', 'Link-sc-1j7wx9d-4');
buttonElement.style = "padding: 1px; color: white; font-weight: bold; font-size:25px";
buttonElement.innerHTML = '⌬';

// Add event listener to the button element
buttonElement.addEventListener('click', async () => {await BounceStatusMain();});

// Apply CSS styles to the button element
buttonElement.style.cursor = 'pointer';
buttonElement.style.display = 'flex';

// Append the button element to the div element
divElement.appendChild(buttonElement);

// Append the div element to the anchor element
anchorElement.appendChild(divElement);

// Append the anchor element to the nav element
navElement.prepend(anchorElement);

// Set the initial click count
let clickCount = 0;

// Add click event listener to the document
document.addEventListener('click', (event) => {

if (clickCount === null) { clickCount = 0;}

// Function to reset the click count
const resetClickCount = () => {
  clickCount = 0;
};

  // Get the element by its aria-label attribute
const voiceTabElement = document.querySelector('[aria-label="Voice tab"]');

// Get the element by its ID
const bounceStatusAnchor = document.getElementById('BouceStatusAnchor');

// Function to toggle the visibility of the element
const toggleElementVisibility = () => {
  if (bounceStatusAnchor.style.display === 'none') {
    bounceStatusAnchor.style.display = 'flex';
  } else {
    bounceStatusAnchor.style.display = 'none';
  }
};

// Function to check if an element is the "Voice tab" or a child of "Voice tab"
const isVoiceTabOrChild = (element) => {
  // Check if the element is the "Voice tab"
  if (element === voiceTabElement) {
    return true;
  }

  // Check if the element is a child of the "Voice tab"
  return voiceTabElement.contains(element);
};

  const clickedElement = event.target;

  // Check if the clicked element is the "Voice tab" or a child of the "Voice tab"
  if (isVoiceTabOrChild(clickedElement)) {
    clickCount++;

    if (clickCount === 5) {
      toggleElementVisibility();
      resetClickCount();
      // Perform any additional actions you want here
    }
  } else {
    resetClickCount();
  }
});


// AutoClockOut Start

// Function to check if we are on the settings page
function isSettingsPage() {
  return location.href.includes('/ccp-v2/settings');
}

// Function to check if the auto clock out section exists
function isAutoClockOutSectionExists() {
  return document.getElementById('AutoClockOutSection') !== null;
}

// Function to get the saved checkbox value from localStorage
function getSavedCheckboxValue() {
  var checkboxValue = localStorage.getItem('checkboxValue');
  return checkboxValue ? JSON.parse(checkboxValue) : false;
}

// Function to get the saved time value from localStorage
function getSavedTimeValue() {
  return localStorage.getItem('timeValue') || '19:00';
}

// Function to add the auto clock out section
function addAutoClockOutSection() {
  // Check if the auto clock out section already exists
  if (!document.getElementById('AutoClockOutSection')) {
    // Find the element with the specified class
    var settingsSection = document.querySelector('.SettingsSection-sc-1yq1y7-1.fihPfc');

    // Create the AutoClockOutSection div
    var autoClockOutSectionDiv = document.createElement('div');
    autoClockOutSectionDiv.id = 'AutoClockOutSection';

    // Create the LanguageSettingsWrapper div
    var languageSettingsWrapperDiv = document.createElement('div');
    languageSettingsWrapperDiv.className = 'LanguageSettingsWrapper-sc-wj4w9o-0 fUKAFN';

    // Create the fieldset element
    var fieldset = document.createElement('fieldset');
    fieldset.className = 'LanguageFieldset-sc-wj4w9o-1 bvCSzv';

    // Create the legend element
    var legend = document.createElement('legend');
    legend.className = 'SubTitle-sc-wj4w9o-2 kMgAfX';
    legend.textContent = 'Auto Clockout';

    // Append the legend to the fieldset
    fieldset.appendChild(legend);

    // Create the label element
    var label = document.createElement('label');
    label.className = 'Wrapper-sc-arnm48-1 bYnzaP';

    // Create the checkbox input
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'AutoClockOutCheckbox';
    checkbox.value = 'On/Off';

    // Check saved checkbox value
    checkbox.checked = getSavedCheckboxValue();

    // Add event listener for checkbox change
    checkbox.addEventListener('change', function() {
      localStorage.setItem('checkboxValue', JSON.stringify(checkbox.checked));
    });

    // Create the radio style div
    var radioStyleDiv = document.createElement('div');
    radioStyleDiv.className = 'RadioStyle-sc-arnm48-0 hJCnRk';

    // Append the radio style div to the label
    label.appendChild(checkbox);
    label.appendChild(radioStyleDiv);
    label.appendChild(document.createTextNode('On/Off'));

    // Append the label to the fieldset
    fieldset.appendChild(label);

    // Create the input element
    var input = document.createElement('input');
    input.type = 'time';
    input.id = 'ClockOutTimePicker';
    input.min = '07:00';
    input.max = '19:00';
    input.required = true;

    // Check saved time value
    input.value = getSavedTimeValue();

    // Add event listener for time picker change
    input.addEventListener('change', function() {
      localStorage.setItem('timeValue', input.value);
    });

    // Append the input to the fieldset
    fieldset.appendChild(input);

    // Create the small element
    var small = document.createElement('small');
    small.textContent = 'Office hours are 7am to 7pm';
    small.style.padding = '0 0 0 10px';

    // Append the small element to the fieldset
    fieldset.appendChild(small);

    // Append the fieldset to the LanguageSettingsWrapper div
    languageSettingsWrapperDiv.appendChild(fieldset);

    // Append the LanguageSettingsWrapper div to the AutoClockOutSection div
    autoClockOutSectionDiv.appendChild(languageSettingsWrapperDiv);

    // Append the AutoClockOutSection div to the settingsSection element
    settingsSection.prepend(autoClockOutSectionDiv);
  }
}

//Autoclock out end

// Continuous clock to check and add the auto clock out section if necessary
setInterval(function() {
  if (isSettingsPage() && !isAutoClockOutSectionExists()) {
    addAutoClockOutSection();
  }
}, 50);

// Continuously running clock
setInterval(function() {
  CreateStatusFunctions();
  var savedCheckboxValue = getSavedCheckboxValue();

  if (savedCheckboxValue) {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();

    var clockOutTime = getSavedTimeValue().split(':');
    var clockOutHours = parseInt(clockOutTime[0]);
    var clockOutMinutes = parseInt(clockOutTime[1]);

    if (currentHours >= clockOutHours && currentMinutes >= clockOutMinutes) {
      var agentStatus = document.querySelector('[aria-label="agent-status-dropdown"]').children[0].innerHTML;
      var connectionStatus = document.querySelector('#connectionTab-primary-status');

      if (agentStatus !== 'Offline' && connectionStatus === null) {
        SetStatusTo_Offline();
      }
    }
  }
}, 5000);

}

// Custom Code for the AWS Real Time Metrics Page
if (RTMetricsRegex.test(window.location.href)) {


 // check if metrics-theme is null and if so, set it to whatever the os prefers
  if (localStorage.getItem('Metrics-Theme') === null || localStorage.getItem('Metrics-Theme') === '' || localStorage.getItem('Metrics-Theme') === 'undefined') {
    localStorage.setItem('Metrics-Theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function waitForMainElement(callback) {
    // Select the target node
    const targetNode = document.querySelector('[role="main"]');
  
    // Check if the target node already exists
    if (targetNode) {
      callback(targetNode); // Call the callback function immediately
      return; // Exit the function
    }
  
    // Create a new mutation observer instance
    const observer = new MutationObserver((mutationsList) => {
      // Check if the target node has been added to the DOM
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0].querySelector('[role="main"]');
          if (addedNode) {
            observer.disconnect(); // Stop observing mutations
            callback(addedNode); // Call the callback function
            break;
          }
        }
      }
    });
  
    // Start observing mutations on the document body
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function toggleDarkMode() {
    var darkModeCSS = `
      /* Background color */
      body,
      .styles_metrics-page__3uZSD,
      .connect-layout-container,
      .styles_card-header__2jU2w,
      .styles_table-pagination__QIqmt,
      .styles_data-grid__container__DBYM0,
      .styles_input__input-wrapper__ly8Jd {
        background-color: #292a2d !important;
      }

      /* Text color */
      p,
      span,
      td,
      .styles_metrics-page__report-title__2BHe-,
      .styles_reload-controls-ui__report-last-update__2qso-,
      .styles_button__9Zhlj,
      .styles_button--primary__2YmLM {
        color: #f1f3f4 !important;
        background-color: #35363a !important;
      }

      thead tr {
        background-color: #26303b !important;
      }

      tbody tr {
        background-color: #35363a !important;
      }
      
      p[class="styles_table-note__3LCMV"], h1[class="styles_metrics-page__report-title__2BHe-"], div[class="styles_reload-controls-ui__report-last-update__2qso-"] {
        background-color: transparent !important;
        color: #f1f3f4 !important;
      }

      
      div[data-testid="table-pagination"], div[class="styles_card-header__2jU2w"], div[data-testid="input-inline-edit"], div[data-testid="input-base"] {
        background-color: #35363a !important;
      }

      div[class="styles_data-grid__no-data-container__j9QdM"], div[class="styles_alert__VzT21 styles_alert--error__5THM- styles_alert--inline__sxEa6 "] {
        background-color: #35363a !important;
        color: #f1f3f4 !important;
      }


      button[data-loggerid="save-report-metric"],
      button[class="styles_button__9Zhlj styles_button--primary__2YmLM "],
      button[class="styles_button__9Zhlj styles_button--flat__QavPK "] {
        color: #f1f3f4 !important;
        border: 1px solid #077398 !important;
      }
      
      .styles_data-grid-header-cell__wrapper__Od-qS span {
        background-color: transparent !important;
      }
      
      li {
        background-color: #35363a;
        color: #f1f3f4 !important;
        border: 0.1px solid #9A9B9C !important;
      }
      
      li:hover {
        background-color: #35363a !important;
        color: #00abba !important;
        border: 0.1px solid #9A9B9C !important;
      }

      li:active {
        background-color: #35363a !important;
        color: #00abba !important;
        border: 0.1px solid #9A9B9C !important;
      }

      li:link {
        background-color: #35363a !important;
        color: #00abba !important;
        border: 0.1px solid #9A9B9C !important;
      }

      li:visited {
        background-color: #35363a !important;
        color: #00abba !important;
        border: 0.1px solid #9A9B9C !important;
      }
      
      div[data-testid="settings-modal"], div[data-testid="save-report-as-modal"] {
        background-color: #35363a !important;
        border: 0.1px solid #9A9B9C !important;
      }
      
      h5,
      b,
      legend,
      label {
        color: #f1f3f4 !important;
      }
      
      .styles_button__9Zhlj,
      .styles_button--primary__2YmLM {
        color: #00abba;
      }
      
      button {
        background-color: transparent !important;
      }
      
      .styles_button-dropdown__label__-yQGX {
        background-color: transparent !important;
      }
      
      button[class="styles_button__9Zhlj styles_button--secondary__un7Ua "]:hover,
      button[class="styles_button__9Zhlj styles_button--primary__2YmLM "]:hover,
      button[class="styles_button__9Zhlj styles_button--secondary__un7Ua  styles_button-dropdown__button__au1lK"]:hover,
      button[class="styles_button__9Zhlj styles_button--secondary__un7Ua  styles_icon-button__-6jQb styles_icon-button--secondary__W0sAe styles_reload-controls-ui__button__3mdSv "]:hover,
      button[class="styles_button__9Zhlj styles_button--secondary__un7Ua  styles_icon-button__-6jQb styles_icon-button--secondary__W0sAe styles_reload-controls-ui__button__3mdSv"]:hover,
      button[class="styles_button__9Zhlj styles_button--flat__QavPK "]:hover {
        color: #f1f3f4 !important;
        border: 1px solid #f1f3f4 !important;
      }
      
      /* Input fields */
      input[type="text"],
      input[type="password"],
      textarea {
        background-color: #35363a;
        color: #f1f3f4;
        border: 0.1px solid #9A9B9C !important;
      }

      input[class="styles_input__input--notable__XjU8h styles_input__input__zaJWw  styles_input__input--inline-edit__yfROV"] {
        background-color: #35363a;
        color: #f1f3f4 !important;
        border: 0px solid #35363a !important;
      }
      
      /* Links */
      a {
        color: #f1f3f4;
      }
      
      a:hover {
        color: #35363a;
      }
      
      table td,
      th {
       
        border-top-style: 0.1px solid #202124 !important;
        border-bottom-style: 0.1px solid #202124 !important;
        border-left-style: 0.1px solid #35363a !important;
        border-right-style: 0.1px solid #35363a !important;
      }
      
      /* Notifications */
      .notification {
        background-color: #35363a;
        color: #f1f3f4;
        border: 1px solid #f1f3f4;
      }
      
      /* Footer */
      .footer {
        background-color: #35363a;
        color: #f1f3f4;
      }
      
      [role="img"] {
        filter: invert(100%) brightness(150%) !important;
        color: #f1f3f4 !important;
      }
      
      [role="columnheader"] {
        background-color: #26303b;
      }
      
      ::-webkit-scrollbar {
        width: 11px;
        height: 11px;
      }
      
      ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #9A9B9C;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #9A9B9C;
      }
      
      ::-webkit-scrollbar-thumb:active {
        background: #9A9B9C;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 53px;
      }
      
      ::-webkit-scrollbar-track:hover {
        background: transparent;
      }
      
      ::-webkit-scrollbar-track:active {
        background: transparent;
      }
      
      span[aria-label="icon_arrow_drop_up"],
      span[aria-label="icon_arrow_drop_down"] {
        filter: invert(0%) brightness(150%) !important;
        background-color: #ffffff !important;
      }
      
      button.styles_button__9Zhlj.styles_button--flat__QavPK.styles_button--sm__T89Ll.styles_icon-button__-6jQb.styles_icon-button--sm__pSQK3.styles_card-icon-button__V-hDe[aria-label="icon_settings"] {
        background-color: transparent !important;
      }

      /* Table */
      table,
      [role="main"] {
        background-color: #35363a !important;
        color: #f1f3f4 !important;
        scrollbar-color: #35363a !important;
      }

      [scope="colgroup"] {
        border-top: 1px solid #d8d8d8 !important;
      }

      th[class~="styles_table-cell__M4TEe"][class~="styles_table-cell--head__-s6Hw"][class~="styles_table-cell--align-left__1Lglc"][class~="styles_data-grid__fixed-column--head__iaa1c"][class~="styles_data-grid-header-cell__DizYr"][style*="left: 0px"] {
        border-left: 1px solid #d8d8d8 !important;
      }
	  
	  span.styles_icon__Q-srh.styles_icon-button__icon__IC-A-.RTRefresh {
		  color: black !important;
		  font-size: 24px !important;
		  background: none !important;
	  }
      

    `;
    
    var styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'dark-mode-style');
    
    if (document.getElementById('dark-mode-style')) {
      // If the dark mode style already exists, remove it
      document.getElementById('dark-mode-style').remove();
      localStorage.setItem('Metrics-Theme', "light");
      document.querySelector('lily-navigation').shadowRoot.querySelector('[class="lily-navigation picasa-ui"]').style.backgroundColor = '#607794';
    } else {
      // If the dark mode style doesn't exist, add it
      styleElement.innerHTML = darkModeCSS;
      document.head.appendChild(styleElement);
      localStorage.setItem('Metrics-Theme', "dark");
      document.querySelector('lily-navigation').shadowRoot.querySelector('[class="lily-navigation picasa-ui"]').style.backgroundColor = '#26303b';
    }
  }

  function createDarkModeEntry() {
    // Check if the dark mode entry already exists
    var darkModeEntry = document.getElementById('dark-mode-entry');
    if (darkModeEntry) {
      // Update the text based on the dark mode status
      var darkModeEnabled = document.getElementById('dark-mode-style') !== null;
      if (darkModeEnabled) {
        darkModeEntry.textContent = 'Toggle Light Mode';
      } else {
        darkModeEntry.textContent = 'Toggle Dark Mode';
      }
      return; // Exit the function
    }
  
    // Create a new list item for the dark mode entry
    darkModeEntry = document.createElement('li');
    darkModeEntry.setAttribute('role', 'menuitem');
    darkModeEntry.setAttribute('data-testid', 'menu-item');
    darkModeEntry.classList.add('styles_menu-item__item__vx5QV');
    darkModeEntry.value = '';
    darkModeEntry.setAttribute('aria-disabled', 'false');
    darkModeEntry.setAttribute('tabindex', '-1');
    darkModeEntry.setAttribute('id', 'dark-mode-entry');
  
    // Check if dark mode is currently enabled
    var darkModeEnabled = document.getElementById('dark-mode-style') !== null;
  
    // Set the text content based on the dark mode status
    if (darkModeEnabled) {
      darkModeEntry.textContent = 'Toggle Light Mode';
    } else {
      darkModeEntry.textContent = 'Toggle Dark Mode';
    }
  
    // Add a click event listener to toggle dark mode when clicked
    darkModeEntry.addEventListener('click', function() {
      toggleDarkMode();
    });
  
    // Find the dropdown menu element
    var menuElement = document.querySelector('[data-loggerid="actions-menu-metric"]');
    if (menuElement) {
      // Append the dark mode entry to the dropdown menu
      menuElement.querySelector('ul').appendChild(darkModeEntry);
    }
  }
  
  // Check if localStorage has the "Metrics-Theme" key set to "dark"
  var initialTheme = localStorage.getItem('Metrics-Theme');
  if (initialTheme === 'dark') {
    waitForMainElement((mainElement) => {
      toggleDarkMode();
    });
  }

  setInterval(createDarkModeEntry, 125);
  
var RefreshTimer;
var Timer = false;

function SetRTRefreshSpeed() {
  // check if local storage has a value for the refresh speed
  if (localStorage.getItem('RTRefreshSpeedMS') === null || localStorage.getItem('RTRefreshSpeedMS') === undefined || localStorage.getItem('RTRefreshSpeedMS') === '') {
    // if no value is found, set the default value to 250
    localStorage.setItem('RTRefreshSpeedMS', 250);
  }
  // create prompt to set the refresh speed with a placeholder of the current value
  var RTRefreshSpeedMS = prompt('Set RT Refresh Rate In MS [ Default: 250 or 4ps ]', localStorage.getItem('RTRefreshSpeedMS'));
  // check if the prompt was cancelled
  if (RTRefreshSpeedMS === null) {
    return;
  } else if (RTRefreshSpeedMS === '' || RTRefreshSpeedMS === undefined) {
    // check if the prompt was left blank or undefined and set the value to 250
    localStorage.setItem('RTRefreshSpeedMS', 250);
    // click the refresh toggle to turn it off and then back on to reset the timer
    document.getElementById('RT Refresh Toggle Text').parentElement.click()
    document.getElementById('RT Refresh Toggle Text').parentElement.click()
  } else {
    localStorage.setItem('RTRefreshSpeedMS', RTRefreshSpeedMS);
    document.getElementById('RT Refresh Toggle Text').parentElement.click()
    document.getElementById('RT Refresh Toggle Text').parentElement.click()
    return;
  }
}

// append the RT Refresh speed function to the page script
var RTRefreshSpeedFunction = document.createElement('script');
RTRefreshSpeedFunction.innerHTML = SetRTRefreshSpeed;
document.body.appendChild(RTRefreshSpeedFunction);

async function RTRefreshToggleMain() {
    function Start() {
        localStorage.setItem('RTRefreshEnabled', true);
        const toggleTextElement = document.getElementById('RT Refresh Toggle Text');
        toggleTextElement.innerHTML = 'RT Refresh: ON';
        const parentElement = toggleTextElement.parentElement;
        parentElement.classList.remove('styles_button--secondary__un7Ua');
        parentElement.classList.add('styles_button--primary__2YmLM');
        const reloadDataButton = document.querySelector('button[aria-label=\'Reload data\']');
        reloadDataButton.style.display = 'none';
        const reloadControlsPlayButton = document.querySelector('button[data-testid="reload-controls-play-btn"]');
        reloadControlsPlayButton.style.display = 'none';
        if (localStorage.getItem('RTRefreshSpeedMS') === null) {
            localStorage.setItem('RTRefreshSpeedMS', 250);
        }
        RefreshTimer = setInterval(function() {
            reloadDataButton.click();
            try {
                document.getElementById('RTRefreshScript').remove();
            } catch (err) {}
        }, localStorage.getItem('RTRefreshSpeedMS'));
    }

    function Stop() {
        localStorage.setItem('RTRefreshEnabled', false);
        const toggleTextElement = document.getElementById('RT Refresh Toggle Text');
        toggleTextElement.innerHTML = 'RT Refresh: OFF';
        const parentElement = toggleTextElement.parentElement;
        parentElement.classList.remove('styles_button--primary__2YmLM');
        parentElement.classList.add('styles_button--secondary__un7Ua');
        const reloadDataButton = document.querySelector('button[aria-label=\'Reload data\']');
        reloadDataButton.style.display = 'flex';
        const reloadControlsPlayButton = document.querySelector('button[data-testid="reload-controls-play-btn"]');
        reloadControlsPlayButton.style.display = 'flex';
        clearInterval(RefreshTimer);
    }

    var callback = function() {
        if (typeof Timer === 'undefined') {
            Timer = false;
        }

        Timer = !Timer; // Toggle the Timer value

        if (Timer) {
            Start();
        } else {
            Stop();
        }
    };

    callback(); // Calling callback directly as there's no jQuery script to load
}


function waitForElement() {
  var reloadControlsDiv = document.querySelector('[data-testid="reload-controls"]');
  
  if (reloadControlsDiv) {
    // Element found, proceed with the rest of the code
    var newButton = document.createElement('button');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('class', 'styles_button__9Zhlj styles_button--secondary__un7Ua');
    newButton.setAttribute('aria-disabled', 'false');
    newButton.innerHTML = '<span id=\'RT Refresh Toggle Text\'>RT Refresh: OFF</span>';
    var iconbuttonwrapper = document.createElement('button');
    iconbuttonwrapper.setAttribute('type', 'button');
    iconbuttonwrapper.setAttribute('class', 'styles_button__9Zhlj styles_button--flat__QavPK styles_button--sm__T89Ll styles_icon-button__-6jQb styles_icon-button--sm__pSQK3 styles_card-icon-button__V-hDe');
    iconbuttonwrapper.setAttribute('aria-label', 'icon_settings');
    iconbuttonwrapper.setAttribute('data-testid', 'icon');
    iconbuttonwrapper.setAttribute('role', 'img');
    iconbuttonwrapper.setAttribute('aria-hidden', 'true');
    var icon = document.createElement('span');
    icon.setAttribute('class', 'styles_icon__Q-srh styles_icon-button__icon__IC-A- RTRefresh');
	icon.textContent = '⚙'; 
    iconbuttonwrapper.appendChild(icon);
    reloadControlsDiv.appendChild(newButton);
    reloadControlsDiv.appendChild(iconbuttonwrapper);
    iconbuttonwrapper.addEventListener('click', async () => {await SetRTRefreshSpeed();});
	  newButton.addEventListener('click', async () => {await RTRefreshToggleMain();});
    if (localStorage.getItem('RTRefreshEnabled') === null) {localStorage.setItem('RTRefreshEnabled', true);}
    if (localStorage.getItem('RTRefreshEnabled') === 'true') {RTRefreshToggleMain();}
  } else {
    // Element not found, wait and check again after a delay
    setTimeout(waitForElement, 50); // Adjust the delay (in milliseconds) as needed
  }
}

function SetAutoPauseListeners() {
// Get the reload-controls-play-btn button element
var reloadButton = document.querySelector('button[data-testid="reload-controls-play-btn"]');

if (reloadButton) {

// Add event listener for mouseover event on the document
document.addEventListener('mouseover', handleMouse);

// Function to check if an element or its parents match the criteria
function checkElementCriteria(element) {
  // Check if the element has data-testid="button-dropdown-toggle"
  if (element.getAttribute('data-testid') === 'button-dropdown-toggle') {
    return true;
  }

  // Check if the element has class styles_menu__menu__e-oFa or any of its parents have that class
  if (element.closest('.styles_menu__menu__e-oFa') || element.closest('[data-testid="button-dropdown-button"]') || element.closest('[data-testid="settings-modal"]') || element.closest('[data-testid="data-grid-sort-handle"]') || element.closest('button[aria-label="Collapse table"]') || element.closest('button[aria-label="Expand table"]') || element.closest('button[aria-label="Close table"]') || element.closest('button[aria-label="Table Settings"]')) {
    return true;
  }

  return false;
}

// Function to handle mouseover event
function handleMouse(event) {
  if (document.getElementById('RT Refresh Toggle Text').innerHTML === 'RT Refresh: ON') {
  // Get the target element of the mouseover event
  const target = event.target;
  event.preventDefault();
  // Check if the target element or any of its parents match the criteria
  if (checkElementCriteria(target)) {
    // Click the reload-controls-play-btn button if it matches the criteria
    if (reloadButton.getAttribute('aria-label') === 'Pause reload') {
		reloadButton.click();
		return;
    } else {
		return;
	}
  } else {
	// Click the reload-controls-play-btn button if it matches the criteria
    if (reloadButton.getAttribute('aria-label') === 'Start reload') {
		reloadButton.click();
		return;
    }else {
		return;
	}
  }
	}
}

  } else {
    setTimeout(SetAutoPauseListeners, 100); // Adjust the delay (in milliseconds) as needed
  }

}

// create continuous interval to check for data-testid="settings-modal" element and if it exists, add
  waitForElement();
  SetAutoPauseListeners();


}
