
// Category Buttons Load and Display

const loadCategory= async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories=data.data;
    // console.log(categories);
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
   
    displayCard(cards);
}


const displayCard=(cards)=>{
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML=``;
    cards.forEach(card=>{
        console.log(card);
        const isVerified=card.authors[0].verified;
        const cardBody=document.createElement('div');
        cardBody.innerHTML=`
        <div class="card w-72 h-80 bg-base-100 shadow-xl">
        <figure><img src="${card.thumbnail}" alt="" class="h-52" /></figure>
        <div class="card-body flex flex-row">
            
        <div class="">
        <img  class="w-[40px] h-[40px] rounded-full" src="${card.authors[0].profile_picture}">
        </div>
            <div>
            <h2 class="text-xl">
            ${card.title}
            </h2>
            
            <div id="name-container" class="flex gap-2">
            <h2 class="flex-wrap">${card.authors[0].profile_name}</h2>
            <div id='${card.authors[0].profile_name}' class="w-5 h-5 hidden">
            <img src="./icon/check.png">
            </div>
            </div>
            <h2 class="text-gray-400">${card.others.views} Views</h2>

            </div>
            </div>
            </div>

        `;
         cardContainer.appendChild(cardBody);  
         
         if (isVerified){
           const tick=document.getElementById(card.authors[0].profile_name);
            tick.classList.remove('hidden');
         }
        
    })

}


const filterCard=(id)=>{
    console.log(id);
   loadCard(id);
  
}




loadCategory();