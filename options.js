// Saves the user's preferences
function savePreferences() {
  const randomTab = document.getElementById('randomTab').checked;
  const showBadge = document.getElementById('showBadge').checked;
  const randomOrder = document.getElementById('randomOrder').checked;
  const deleteTab = document.getElementById('deleteTab').checked;
  chrome.storage.sync.set({randomTab, showBadge, randomOrder, deleteTab}, function() {});

}

// Restores the checkbox states using the preferences stored in chrome.storage
function restoreOptions() {
  chrome.storage.sync.get({
      randomTab: true,
      randomOrder: false,
      deleteTab: false,
      showBadge: true
  }, function(items) {
      document.getElementById('randomTab').checked = items.randomTab;
      document.getElementById('randomOrder').checked = items.randomOrder;
      document.getElementById('deleteTab').checked = items.deleteTab;
      document.getElementById('showBadge').checked = items.showBadge;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input[type=checkbox]').forEach(input => {
  input.addEventListener('change', savePreferences);
});
