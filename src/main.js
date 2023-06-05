import './style.css'

// import { setupCounter } from './counter.js'

import { makeCanvas } from './popup';

export function labelbakerBanner(config){

  const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
 const stageID = makeId(4);
 const canvasID = makeId(4);
  const bannerHTML = `
  <div id="${stageID}">
    <div id="${canvasID}">
    </div>
  </div>
  `
  document.querySelector('#' + config.container).insertAdjacentHTML('beforeend', bannerHTML)
  document.getElementById(config.container).style.maxWidth = config.width;
  let url = config.url
  fetch(url).then(res => res.json()).then(templateData => {

    makeCanvas(canvasID, stageID, templateData).then(e => {
      

      console.log('loaded')

    })
  }).catch(err => console.log(err));
}

export function labelbakerPopup(config) {

  const popupHTML = `
<div>
  <button id="show">show</button>
  <div class="labelbaker-popup-container">
  <div id="labelbaker-popup" class="labelbaker-popup-content">
  <button class="labelbaker-close-button">&times;</button>
  <div id="stageID">
  <div id="canvasID">
  </div>
  </div>
  </div>
  </div>
</div>`;

  document.querySelector('body').insertAdjacentHTML('beforeend', popupHTML)

  const closeButton = document.querySelector('.labelbaker-close-button');
  const popupContainer = document.querySelector('.labelbaker-popup-container');

  let lp = sessionStorage.getItem('labelbaker-popup');
  if (lp) {
    popupContainer.style.display = 'none';
    return;
  } else {
    sessionStorage.setItem('labelbaker-popup', true)
  }

  document.getElementById('labelbaker-popup').style.maxWidth = config.width;
  let url = config.url
  fetch(url).then(res => res.json()).then(templateData => {

    makeCanvas('canvasID', 'stageID', templateData).then(e => {
      popupContainer.style.display = 'flex';
      popupContainer.style.visibility = 'visible'
      closeButton.style.display = 'block';

      console.log('loaded')

    })
  }).catch(err => console.log(err));




  closeButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
  });

  popupContainer.addEventListener('click', (e) => {
    if (e.target.className === 'labelbaker-popup-container') {
      popupContainer.style.display = 'none';
    }
  })

  document.getElementById('show').addEventListener('click', function () {
    popupContainer.style.display = 'flex';
  })

}

const conf = {
  url: "https://sample-file.com/i/53616c7465645f5f275a3d6ba7fdf6c1805a9be85219b78991c5dfa33b169f731572abbe72be885362db23c7ef73fe99/53616c7465645f5f4a18012b7dbc8a71c06b55eb518a71d33770db255d112afe",
  width: "500px",
};

const bannerConfig = {
  url: "https://sample-file.com/i/53616c7465645f5f275a3d6ba7fdf6c1805a9be85219b78991c5dfa33b169f731572abbe72be885362db23c7ef73fe99/53616c7465645f5f4a18012b7dbc8a71c06b55eb518a71d33770db255d112afe",
  width: "500px",
  container:'banner'
}

labelbakerBanner(bannerConfig)

labelbakerPopup(conf);





// setupCounter(document.querySelector('#counter'))
