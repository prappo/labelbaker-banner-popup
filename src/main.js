import './style.css'
import { makeCanvas } from './popup';

const makeId = (length) => {
  let result = '';
  const characters = 'abcdefghijklmno';
  const charactersLength = characters.length;
  for(let counter = 0; counter < length; counter++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const makeHTML = (stageID, canvasID, isPopup=false) => {
  return isPopup 
  ? `<div>
      <div class="labelbaker-popup-container">
      <div id="labelbaker-popup" class="labelbaker-popup-content">
      <button class="labelbaker-close-button">&times;</button>
      <div id="${stageID}">
      <div id="${canvasID}">
      </div>
      </div>
      </div>
      </div>
    </div>` 
  : `<div id="${stageID}">
      <div id="${canvasID}">
      </div>
    </div>`
}

const fetchTemplateData = async (url, canvasID, stageID) => {
  try {
    let response = await fetch(url);
    let templateData = await response.json();
    await makeCanvas(canvasID, stageID, templateData);
    console.log('Template data loaded successfully');
  } catch (err) {
    console.error('Failed to load template data: ', err);
  }
}

export function labelbakerBanner(config) {
  const stageID = makeId(4);
  const canvasID = makeId(4);
  const bannerHTML = makeHTML(stageID, canvasID);

  document.getElementById(config.container).insertAdjacentHTML('beforeend', bannerHTML)
  document.getElementById(config.container).style.maxWidth = config.width;

  fetchTemplateData(config.url, canvasID, stageID);
}

export function labelbakerPopup(config) {
  const stageID = makeId(4);
  const canvasID = makeId(4);
  const popupHTML = makeHTML(stageID, canvasID, true);

  document.querySelector('body').insertAdjacentHTML('beforeend', popupHTML)

  const closeButton = document.querySelector('.labelbaker-close-button');
  const popupContainer = document.querySelector('.labelbaker-popup-container');
  const popupCanvas = document.getElementById(canvasID);

  popupCanvas.style.borderRadius = '10px';
  popupCanvas.style.boxShadow = '0 2px 8px 0 rgba(63, 69, 81, 0.16)';

  var style = document.createElement('style');
  style.innerHTML = `
  #${canvasID} > .konvajs-content>canvas {
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(63, 69, 81, 0.16);
  }`;
  document.head.appendChild(style);

  if (config.showOnce) {
    let lp = sessionStorage.getItem('labelbaker-popup');
    if (lp) {
      popupContainer.style.display = 'none';
      return;
    } else {
      sessionStorage.setItem('labelbaker-popup', true)
    }
  }

  document.getElementById('labelbaker-popup').style.maxWidth = config.width;

  fetchTemplateData(config.url, canvasID, stageID)
  .then(() => {
    popupContainer.style.display = 'flex';
    closeButton.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
  });

  popupContainer.addEventListener('click', (e) => {
    if (e.target.className === 'labelbaker-popup-container') {
      popupContainer.style.display = 'none';
    }
  });
}

// const conf = {
//   url: "https://sample-file.com/i/53616c7465645f5f275a3d6ba7fdf6c1805a9be85219b78991c5dfa33b169f731572abbe72be885362db23c7ef73fe99/53616c7465645f5f4a18012b7dbc8a71c06b55eb518a71d33770db255d112afe",
//   width: "500px",
//   // showOnce:true,
// };

// const bannerConfig = {
//   url: "https://sample-file.com/i/53616c7465645f5f275a3d6ba7fdf6c1805a9be85219b78991c5dfa33b169f731572abbe72be885362db23c7ef73fe99/53616c7465645f5f4a18012b7dbc8a71c06b55eb518a71d33770db255d112afe",
//   width: "500px",
//   container: 'banner'
// }

// labelbakerBanner(bannerConfig)

// labelbakerPopup(conf);





// setupCounter(document.querySelector('#counter'))
