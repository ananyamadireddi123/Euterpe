document.querySelectorAll('.add-to-playlist').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const pre = this.parentNode;
      const text = pre.textContent.trim();
      const parts = text.split(/\s{2,}/);
      var songname = parts[0];
  
      const hiddenForm = document.getElementById('hiddenForm');
      const titleInput = document.getElementById('titleInput');
      titleInput.value = songname;
  
      hiddenForm.submit();
    });
  }); 
  
  function removeSong(event)
{
    alert(event);
    const removeSongForm = document.getElementById('removeSongForm');
    const titleInput = document.getElementById('titleInput');
    titleInput.value = event;
  
    removeSongForm.submit();
}