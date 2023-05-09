let btn = document.getElementById('btn');
let urlInput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
let serverURL = 'http://localhost:4000';

btn.addEventListener('click', () => {
  if (!urlInput.value) {
    alert('Please enter a YouTube URL');
    return;
  }

  if (select.value === 'mp3') {
    downloadMp3(urlInput.value);
  } else if (select.value === 'mp4') {
    downloadMp4(urlInput.value);
  }
});

async function downloadMp3(query) {
  try {
    const res = await fetch(`${serverURL}/downloadmp3?url=${query}`);
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', '');
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (res.status === 400) {
      alert('Invalid URL');
    } else {
      throw new Error(`HTTP error: ${res.status}`);
    }
  } catch (error) {
    console.log(`Fetch error: ${error}`);
    alert('An error occurred. Please try again later.');
  }
}

async function downloadMp4(query) {
  try {
    const res = await fetch(`${serverURL}/downloadmp4?url=${query}`);
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', '');
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (res.status === 400) {
      alert('Invalid URL');
    } else {
      throw new Error(`HTTP error: ${res.status}`);
    }
  } catch (error) {
    console.log(`Fetch error: ${error}`);
    alert('An error occurred. Please try again later.');
  }
}
