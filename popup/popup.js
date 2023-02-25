document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', ()=> {
    popup()
    startButton.style.display = 'none'
  });
});

const popup = () => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "start_button"});
  });
}