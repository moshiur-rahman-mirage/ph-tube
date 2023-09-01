
// Category Buttons Load and Display

const loadCategory= async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories=data.data;
   
    displayCategory(categories);
}

const displayCategory=(categories)=>{
    const categoryContainer=document.getElementById('cat-container');
    categoryContainer.innerHTML='';
    categories.forEach(category => {
        const categoryButton=document.createElement('div');
       categoryButton.classList=`bg-[rgba(37, 37, 37, 0.2)] text-gray-900`;
       categoryButton.innerHTML=`
        <button class="btn" onclick="filterCard(${category.category_id})">${category.category}</button>
       `;
       categoryContainer.appendChild(categoryButton);
     
    });
}


// Load card

const loadCard=async(id=1001)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data= await res.json();
    const cards=data.data;
    const loadedcard=document.getElementById('loaded-id');
    loadedcard.innerHTML=id
    displayCard(cards);
    
}


const displayCard=(cards)=>{
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML=``;
    if (cards.length<1){
        const notfound=document.createElement('div');
        notfound.innerHTML=`
        <div class='text-center flex items-center flex-col'>
            <img src="./icon/icon.png"/>
            <h1 class="text-5xl  font-extrabold mt-5">
                Opps No Data Found!
            </h1>
            </div>
        `
        cardContainer.classList.remove('md:grid', 'lg:grid', 'lg:grid-cols-3', 'xl:grid-cols-4', 'md:grid-cols-2');
        cardContainer.appendChild(notfound);  

    }else{
    cards.forEach(card=>{
        console.log(card)
        // card.sort()
        const second=card.others?.posted_date
        const xtime=time(second);
        const isVerified=card.authors[0].verified;
        const cardBody=document.createElement('div');
        cardBody.innerHTML=`
        <div class="card w-72 h-80 bg-base-100 shadow-xl">
        <figure><img src="${card.thumbnail}" alt="" class="h-52 rounded-b-md" /></figure>
        <div id="${'time'+card.authors[0].profile_name}" class="text-white w-32 mt-[-35px] ml-[150px] text-right bg-black rounded-md hidden">${xtime}</div>
        <div class="card-body flex flex-row lg:w-80 md:w-64">
            
        <div class="">
        <img  class="w-10 h-10 rounded-full" src="${card.authors[0].profile_picture}">
        </div>
            <div class="">
            <h2 class="text-xl">
            ${card.title}
            </h2>
            
            <div id="name-container" class="flex gap-2">
            <h2 class="flex-wrap">${card.authors[0].profile_name}</h2>
            <div id='${card.authors[0].profile_name}' class="w-5 h-5 hidden">
            <img src="./icon/check.png">
            </div>
            </div>
            <h2 class="text-gray-400">${card.others?.views} Views</h2>

            </div>
            </div>
            </div>

        `;
        cardContainer.classList.add('md:grid', 'lg:grid', 'lg:grid-cols-3', 'xl:grid-cols-4', 'md:grid-cols-2');
         cardContainer.appendChild(cardBody);  
         
         if (isVerified){
           const tick=document.getElementById(card.authors[0].profile_name);
            tick.classList.remove('hidden');
         }

         if (second>0){
            console.log('here')
            const timedata=document.getElementById(`${'time'+card.authors[0].profile_name}`)
            timedata.classList.remove('hidden')
         }

        
    })
}

}



const time=(second)=>{
    const xsec=second%60;
    console.log(second);
     const totalmin=(second-xsec)/60;
     const min=totalmin%60;
     const totalhour=(totalmin-min)/60;
     const hour=totalhour%24;
     const day=(totalhour-hour)/24;
     const newday=day%365;
     const year=(day-newday)/365;



     if (totalhour<24){
     return `${totalhour} hrs ${min} min ago`;
     }else if(day<365){
        return `${day}days ${hour} hrs ${min} min ago`;
     }else{
            // const timedata2=document.getElementById(`${'time'+card.authors[0].profile_name}`)
            // timedata2.classList.remove('w-32')
            // timedata2.classList.add('w-60')
            return `${year} years ${newday}days ${hour} hrs ${min} min ago`;
     }
}

const filterCard=(id)=>{
   loadCard(id);
  
}

function sortByView(){
    const currentlyLoaded=document.getElementById('loaded-id').innerHTML;
    
}



loadCategory();
loadCard(1000)