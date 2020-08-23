//fetch needed country data
    //country name
    //currency
    //timezone
    //population
    //flag
    let nav_flag = document.getElementById('flag_list');
    let selectedLang = [];

function langDataFetch(id){
 if (nav_flag.hasChildNodes()) {
   nav_flag.innerHTML=''
  } 
 
  queryFetch(`
    query {
	Language{
    iso639_1
    iso639_2
    name
    nativeName
    countries {
      name
      currencies{
    		name
   		 symbol
  		}
      population
      flag{
        svgFile
      }
	}
    }
  
}

  `)
	.then((res) => {
    //organise data by language spoken
    //anglophone
    //hispanophone
    //francophone
      selectedLang = res.data.Language[id]
      //populate flags depending on chosen language
      for(let i= 0; i<= selectedLang.countries.length; i++ ){
        let name = selectedLang.countries[i].name
        let flag = selectedLang.countries[i].flag.svgFile
        let currency = () =>{
          let curCurrency = selectedLang.countries[i].currencies[0].name;
          if(curCurrency == "null"){
            curCurrency = "No Official Currency"
          }
          return curCurrency
        }
        let population = selectedLang.countries[i].population
        flag_pop(name, flag, currency, population);
      }


  });

} 
  
function queryFetch(query){
  return fetch('https://countries-274616.ew.r.appspot.com', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: query,
		}),
	}).then((res) => res.json());
}
    





function flag_pop (name, flag, currency, population){
  
  let img_flag = document.createElement("img");
  img_flag.setAttribute("src", flag);
  img_flag.setAttribute("alt", "⁨⁩Flag of " + name);
  img_flag.setAttribute('width', '300%');
  // enable dropdown chart on cursor hover:
    //country name
    //currency
    //timezone
  img_flag.title = `${name}: population: ${population} currency: ${currency()}`;
  img_flag.style.border= '3px solid black';
  img_flag.style.borderRadius = '10%';
  
  nav_flag.appendChild(img_flag);
};
//flag search/filter 
search = () => {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("flag_search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("flag_list");
  li = ul.getElementsByTagName("img");

  // Loop through all list items, and hide those who don't match the search query
  //Limitaion: does not identify n letter entered to n letter in country name
  for (i = 0; i < li.length; i++) {
    a = li[i].title;
    txtValue = a;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};

