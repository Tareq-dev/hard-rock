const searchField =()=>{
     const searchText = document.getElementById('searchField').value;
     if(searchText ==  ''){
          alert('Search field is empty')
     }
     const url = `https://api.lyrics.ovh/suggest/${searchText}`
     fetch(url)
     .then(res => res.json())
     .then(data => displaySearchResults(data.data))
     document.getElementById('searchField').value = '';
};
searchField();

const displaySearchResults =(musics)=>{
     // console.log(musics)
     const searchResult = document.getElementById('searchResult');
     
     musics.forEach(music => {
          // console.log(music.title)
     const div = document.createElement('div');
     div.innerHTML = `
     <div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9">
               <h3 class="lyrics-name">${music.title}</h3>
               <p class="author lead">Album by <span>${music.album.title}</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center">
               <button class="btn btn-success" onclick="(getBtn('${music.artist.name}','${music.title}'))">Get Lyrics</button>
          </div>
     </div>
     `
     searchResult.appendChild(div);    
     })
}
const getBtn = (artist, title) => {
     console.log('name :',artist ,'title :', title)
     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
     fetch(url)
     .then(res=> res.json())
     .then(data => displayLyrics(data.lyrics))
}
const displayLyrics = (lyric) => {

     const singleLyric = document.getElementById('singleLyric');
     singleLyric.textContent = '';
     const div = document.createElement('div');
     div.innerHTML = `
     <p>${lyric.slice(0,500)}</p>
     `
     singleLyric.appendChild(div);

}